import { Inventory } from "./inventory";
export class Character {
    name = "Default Name";
    abilityScores = {
        STR: {
            score: 10,
            mod: 0
        },

        DEX: {
            score: 10,
            mod: 0
        },
        CON: {
            score: 10,
            mod: 0
        },
        INT: {
            score: 10,
            mod: 0
        },
        WIS: {
            score: 10,
            mod: 0
        },
        CHA: {
            score: 10,
            mod: 0
        }
    };

    race = "Choose...";
    class = "Choose...";
    inventory = new Inventory();

    magic = {
        spellSlots: [
            {
                max: 0,
                used: 0
            },
            {
                max: 0,
                used: 0
            },
            {
                max: 0,
                used: 0
            },
            {
                max: 0,
                used: 0
            },
            {
                max: 0,
                used: 0
            },
            {
                max: 0,
                used: 0
            },
            {
                max: 0,
                used: 0
            },
            {
                max: 0,
                used: 0
            },
            {
                max: 0,
                used: 0
            },
            {
                max: 0,
                used: 0
            }
        ],
        knownSpells: [],
        preparedSpells: []
    };
}
