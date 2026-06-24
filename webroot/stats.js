const Stats = {
  fingerprints: 382,
  perfects: 41,
  streakRecord: 12,

  getMock() {
    return {
      fingerprints: this.fingerprints,
      perfects: this.perfects,
      streakRecord: this.streakRecord,
    };
  },

  increment() {
    this.fingerprints++;
  },
};
