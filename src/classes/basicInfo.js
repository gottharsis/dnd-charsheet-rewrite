import * as R from "ramda";
export class BasicInfo {
  name = "";
  speed = 0;
  playerName = "";

  constructor(basicInfo = {}) {
    for (let key of ["name", "playerName"]) {
      if (R.has(key, basicInfo)) {
        this[key] = basicInfo[key];
      }
    }
  }
}
