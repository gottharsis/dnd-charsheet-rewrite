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
export const createProficienciesObject = R.when(
  Array.isArray,
  R.pipe(
    R.map(elem => ({ [elem]: 1 })),
    R.mergeAll
  )
);

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
    const hitDiceRaw = R.map(R.path(["classData", "hitDice"]), this.classes);
    const hitDiceFreq = R.countBy(R.identity, hitDiceRaw);
    const hitDice = R.map(
      ([die, amount]) => ({ die, amount }),
      Object.entries(hitDiceFreq)
    );
    return {
      hp,
      maxHp: hp,
      hitDice
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

    // create a MagicSource from a class
    const createMagicSource = cl => {
      if (!R.has("spellcasting", cl)) return null;
      return {
        name: cl.name,
        ...cl.spellcasting
      };
    };
    const castingClasses = R.map(
      createCastingClass(abilityScores, profBonus),
      R.concat(
        this.magicSources,
        R.pipe(
          R.pluck("classData"),
          R.map(createMagicSource),
          R.reject(R.isNil)
        )(this.classes)
      )
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
    const proficiencyTypes = [
      "armor",
      "weapons",
      "tools",
      "savingThrows",
      "languages",
      "skills"
    ];

    const profTransform = R.pipe(
      R.map(k => ({ [k]: createProficienciesObject })),
      R.mergeAll
    )(proficiencyTypes);

    const combineProficiencies = R.pipe(
      R.map(R.evolve(profTransform)),
      R.mergeAll
    );

    return combineProficiencies([
      this.race.proficiencies,
      this.background.proficiencies,
      this.proficiencies
    ]);
  }

  _race() {
    return this.race.name;
  }

  _classes() {
    return R.pick([]);
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
