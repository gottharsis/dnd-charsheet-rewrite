import R from "ramda";

export class SpellSlot {
    used = 0;
    total = 0;
}

const addIfAbsent = R.uncurryN(2, el => R.unless(R.includes(el), R.append(el)));

export class CastingClass {
    name = "";
    castingClass = "";
    dc = 0;
    attackBonus = 0;
    knownSpells = [];
    preparedSpells = [];
    alwaysPrepared = [];
    numToPrepare = 0;
    level = 0;

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
        learnSpell(spell);
        this.alwaysPrepared = addIfAbsent(spell, this.alwaysPrepared);
    }

    alwaysUnprepare(spell) {
        this.alwaysPRepared = R.reject(R.eq(spell), this.alwaysPrepared);
    }
    forgetSpell(spell) {
        this.knownSpells = R.reject(R.eq(spell), this.knownSpells);
    }

    unprepareSpell(spell) {
        this.preparedSpells = R.reject(R.eq(spell), this.preparedSpells);
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
}