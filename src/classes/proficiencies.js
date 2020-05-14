export class Proficiencies {
  armor = [];
  weapons = [];
  tools = [];
  savingThrows = [];
  skills = [];
  languages = [];

  constructor(proficiencies = {}) {
    if (!proficiencies) return;
    if (proficiencies.hasOwnProperty("armor")) {
      this.armor = proficiencies.armor;
    }
    if (proficiencies.hasOwnProperty("weapons")) {
      this.weapons = proficiencies.weapons;
    }
    if (proficiencies.hasOwnProperty("tools")) {
      this.tools = proficiencies.tools;
    }
    if (proficiencies.hasOwnProperty("savingThrows")) {
      this.savingThrows = proficiencies.savingThrows;
    }
    if (proficiencies.hasOwnProperty("skills")) {
      this.skills = proficiencies.skills;
    }
    if (proficiencies.hasOwnProperty("languages")) {
      this.languages = proficiencies.languages;
    }
  }
}
