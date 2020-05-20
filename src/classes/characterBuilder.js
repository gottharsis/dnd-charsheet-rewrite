// import { Inventory } from "./inventory";
// import { AbilityScores } from "./abilityScores";
// import { Health } from "./health";
// import { Magic } from "./magic";
// import { Armor } from "./armor";
// import { Ability, Feature } from "./ability";
import { Proficiencies } from "./proficiencies";
import { BasicInfo } from "./basicInfo";
import { Character } from "./character";
import * as R from "ramda";
// import R from "ramda";
// import { Classes } from "./playerClass";
import { spellTable } from "@/reference/spellslots";
import { CastingClass } from "./magic";
import { abilityOrder } from "@/classes/abilityScores";

// const createCastingClass = (abilityScores, magicSource, profBonus) =>
//   new CastingClass({
//     name: magicSource.name,
//     ability: magicSource.ability,
//     dc: 8 + abilityScores[magicSource.ability] + profBonus,
//     attackBonus: abilityScores[magicSource.ability] + profBonus,
//     progression: magicSource.progression
//   });

export class CharacterBuilder {
  constructor() {
    this.basicInfo = new BasicInfo();
    this.race = {};
    this.abilityScores = [8, 8, 8, 8, 8, 8];
    this.classes = [];
    this.background = {};
    this.proficiencies = new Proficiencies();
    this.magicSources = [];
    this.hp = [];
    this.armor = {};
    this.speed = 0;
    this.features = [];
    this.abilities = [];
  }

  _proficiencyBonus() {
    return R.compose(
      level => 2 + Math.floor((level - 1) / 4),
      R.sum,
      R.pluck("level")
    )(this.classes);
  }

  _abilityScores() {
    const ab = Object.fromEntries(R.zip(abilityOrder, this.abilityScores));
    return R.mergeWith(R.add, ab, this.race.ability);
  }
  _health() {
    const hp = R.sum(this.hp);
    return {
      hp,
      maxHp: hp
    };
  }

  _magic(abilityScores, profBonus) {
    const createCastingClass = R.curry(
      (abilityScores, profBonus, magicSource) =>
        new CastingClass({
          name: magicSource.name,
          ability: magicSource.ability,
          dc: 8 + abilityScores[magicSource.ability] + profBonus,
          attackBonus: abilityScores[magicSource.ability] + profBonus,
          progression: magicSource.progression
        })
    );
    const castingClasses = R.map(
      createCastingClass(abilityScores, profBonus),
      this.magicSources
    );

    const spellLevel = R.pipe(
      R.map(({ level, progression }) => level * progression),
      R.reduce(R.sum),
      Math.floor
    )(castingClasses);

    const spellSlots = spellTable[spellLevel];

    return {
      castingClasses,
      spellSlots
    };
  }

  // TODO: add inventory stuff

  _proficiencies() {
    const combineProficiencies = R.reduce(R.mergeWith(R.concat), {});
    return combineProficiencies([
      this.proficiencies,
      this.race.proficiencies,
      this.background.proficiencies
    ]);
  }

  _race() {
    return this.race.name;
  }
  build() {
    const proficiencyBonus = this._proficiencyBonus();
    const abilityScores = this._abilityScores();
    const magic = this._magic(abilityScores, proficiencyBonus);
    const health = this._health();
    const race = this._race();
    const proficiencies = this._proficiencies();

    return new Character({
      speed: this.speed,
      basicInfo: this.basicInfo,
      abilityScores,
      health,
      magic,
      armor: this.armor,
      features: this.features,
      proficiencyBonus,
      proficiencies,
      classes: this.classes,
      race
    });
  }
}
