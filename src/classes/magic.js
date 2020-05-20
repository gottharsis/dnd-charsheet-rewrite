import * as R from "ramda";
import { addIfAbsent } from "@/util/util";

export class SpellSlot {
  used = 0;
  total = 0;
}

// const addIfAbsent = R.uncurryN(2, el => R.unless(R.includes(el), R.append(el)));

export class CastingClass {
  name = "";
  ability = "";
  dc = 0;
  attackBonus = 0;
  knownSpells = [];
  preparedSpells = [];
  alwaysPrepared = [];
  numToPrepare = 0;
  known = 0;
  level = 0;
  progression = 1;

  learnSpell(spell) {
    this.knownSpells = addIfAbsent(spell, this.knownSpells);
  }

  prepareSpell(spell) {
    if (
      R.includes(spell, this.knownSpells) &&
      this.preparedSpells.length < this.numToPrepare
    ) {
      this.preparedSpells = addIfAbsent(spell, this.preparedSpells);
    }
  }

  alwaysPrepare(spell) {
    this.learnSpell(spell);
    this.alwaysPrepared = addIfAbsent(spell, this.alwaysPrepared);
  }

  alwaysUnprepare(spell) {
    this.alwaysPRepared = R.reject(R.equals(spell), this.alwaysPrepared);
  }
  forgetSpell(spell) {
    this.knownSpells = R.reject(R.equals(spell), this.knownSpells);
  }

  unprepareSpell(spell) {
    this.preparedSpells = R.reject(R.equals(spell), this.preparedSpells);
  }
}

export class Magic {
  constructor(magic = {}) {
    this.castingClasses = magic.castingClasses
      ? magic.castingClasses.map(i => new CastingClass(i))
      : [];

    this.spellSlots = R.pipe(
      R.propOr(R.range(0, 10), "spellSlots"),
      R.map(i => new SpellSlot(i))
    )(magic);
  }

  resetSpellSlots() {
    for (let s of this.spellSlots) {
      s.used = 0;
    }
  }
}
