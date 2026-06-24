import { createServer, context, getServerPort } from "@devvit/server";
import { redis } from "@devvit/redis";
import { reddit } from "@devvit/reddit";
import type { IncomingMessage, ServerResponse } from "node:http";

function todayDate(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function playerKey(userId: string) {
  return `player:${userId}`;
}
function statsKey(date: string) {
  return `stats:${date}`;
}
function placementsKey(date: string) {
  return `placements:${date}`;
}

type PlayerData = {
  streak: number;
  lastSolveDate: string | null;
  todaySolved: boolean;
  todayCracks: number;
};

type PuzzleStats = {
  fingerprints: number;
  perfects: number;
};

async function getPlayerData(userId: string): Promise<PlayerData> {
  const json = await redis.get(playerKey(userId));
  if (json) return JSON.parse(json);
  return { streak: 0, lastSolveDate: null, todaySolved: false, todayCracks: 0 };
}

async function getPuzzleStats(date: string): Promise<PuzzleStats> {
  const json = await redis.get(statsKey(date));
  if (json) return JSON.parse(json);
  return { fingerprints: 0, perfects: 0 };
}

async function recordSolve(
  userId: string,
  date: string,
  cracks: number,
  placements: Record<string, string>,
): Promise<PuzzleStats> {
  const stats = await getPuzzleStats(date);
  stats.fingerprints++;
  if (cracks === 0) stats.perfects++;
  await redis.set(statsKey(date), JSON.stringify(stats));

  const player = await getPlayerData(userId);
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0]!;

  if (player.lastSolveDate === yesterdayStr) {
    player.streak++;
  } else if (player.lastSolveDate !== date) {
    player.streak = 1;
  }
  player.lastSolveDate = date;
  player.todaySolved = true;
  player.todayCracks = cracks;
  await redis.set(playerKey(userId), JSON.stringify(player));

  await redis.hSet(placementsKey(date), {
    [userId]: JSON.stringify(placements),
  });

  return stats;
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk: Buffer) => {
      data += chunk.toString();
    });
    req.on("end", () => resolve(data));
  });
}

function sendJson(res: ServerResponse, data: unknown) {
  const body = JSON.stringify(data);
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body).toString(),
  });
  res.end(body);
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");

  try {
    if (req.method === "POST" && url.pathname === "/api/init") {
      const userId = context.userId ?? "anon";
      const date = todayDate();
      const username = context.username ?? "archivist";

      const [stats, player] = await Promise.all([
        getPuzzleStats(date),
        getPlayerData(userId),
      ]);

      sendJson(res, { username, puzzleDate: date, stats, player });
    } else if (req.method === "POST" && url.pathname === "/api/solve") {
      const body = JSON.parse(await readBody(req));
      const userId = context.userId ?? "anon";
      const date = todayDate();

      const updatedStats = await recordSolve(
        userId,
        date,
        body.cracks,
        body.placements,
      );

      sendJson(res, { stats: updatedStats });
    } else if (
      req.method === "POST" &&
      url.pathname === "/internal/create-post"
    ) {
      const subredditName = context.subredditName;
      const post = await reddit.submitCustomPost({
        title: `Glyphed — ${todayDate()}`,
        subredditName,
      });

      sendJson(res, { navigateTo: post });
    } else {
      res.writeHead(404);
      res.end();
    }
  } catch (err) {
    console.error("Server error:", err);
    res.writeHead(500);
    res.end();
  }
});

server.listen(getServerPort());
