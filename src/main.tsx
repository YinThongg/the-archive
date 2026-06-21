import { Devvit } from "@devvit/public-api";

Devvit.addCustomPostType({
  name: "The Archive",
  description: "A daily deduction puzzle game",
  height: "tall",
  render: (context) => {
    const onMessage = (msg: any) => {
      console.log("Received message from web-view:", msg);
    };

    return (
      <vstack width="100%" height="100%" alignment="middle center">
        <webview
          id="game"
          onMessage={onMessage}
          url="index.html"
          width="100%"
          height="100%"
        />
      </vstack>
    );
  },
});

export default Devvit;
