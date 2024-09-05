export class Level {
    constructor(levelTitles, musicUrls) {
      this._levelTitles = levelTitles;
      this._musicUrls = musicUrls;
    }
  
    getLevelTitle(level) {
      return this._levelTitles[level];
    }
  
    getMusicUrl(level) {
      return this._musicUrls[level];
    }
  }