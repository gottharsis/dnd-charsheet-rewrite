import { calculateModifier } from "../util/util";
export class AbilityScore {
    score = 8;
    get modifier() {
        return calculateModifier(this.score);
    }
}

const abilityOrder = ["str", "dex", "con", "int", "wis", "cha"];
export class AbilityScores {
    str = new AbilityScore();
    dex = new AbilityScore();
    con = new AbilityScore();
    int = new AbilityScore();
    wis = new AbilityScore();
    cha = new AbilityScore();

    constructor(abilityScores = {}) {
        for (let key of abilityOrder) {
            if (abilityScores.hasOwnProperty(key)) {
                this[key] = new AbilityScore(abilityScores[key]);
            }
        }
    }
}
