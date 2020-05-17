export class BasicInfo {
  name = "";
  speed = 0;
  playerName = "";

  constructor(basicInfo = {}) {
    for (let key of ["name", "playerName"]) {
      if (basicInfo.hasOwnProperty(key)) {
        this[key] = basicInfo[key];
      }
    }
  }
}
