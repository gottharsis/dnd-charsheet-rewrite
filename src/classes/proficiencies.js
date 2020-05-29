import * as R from "ramda";
export class Proficiencies {
  armor = {};
  weapons = {};
  tools = {};
  savingThrows = {};
  skills = {};
  languages = {};

  constructor(proficiencies = {}) {
    if (!proficiencies) return;
    // for (let key of [
    //   "armor",
    //   "weapons",
    //   "tools",
    //   "savingThrows",
    //   "skills",
    //   "languages"
    // ]) {
    //   this[key] = R.concat(this[key], R.propOr({}, key, proficiencies));
    // }

    const defaultObj = R.propOr({}, R.__, proficiencies);
    this.armor = defaultObj("armor");
    this.weapons = defaultObj("weapons");
    this.tools = defaultObj("tools");
    this.savingThrows = defaultObj("savingThrows");
    this.languages = defaultObj("languages");

    this.skills = defaultObj("skills");
  }
}
