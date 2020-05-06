import { Inventory } from "./inventory";
import { AbilityScores } from "./abilityScores";
import { Health } from "./health";
import { Magic } from "./magic";
import { Armor } from "./armor";
import { Ability, Feature } from "./ability";

export class Character {
    constructor(character = {}) {
        character = character || {};
        this.abilityScores = new AbilityScores(character.abilityScores);
        this.health = new Health(character.health);
        this.magic = new Magic(character.magic);
        this.inventory = new Inventory(character.inventory);
        this.armor = new Armor(character.armor);
        this.features = (character.features || []).map(i => new Feature(i));
        this.abilities = (character.abilities || []).map(i => new Ability(i));
        this.skills = character.skills || {};
        this.proficiencyBonus = character.proficiencyBonus || 0;
        this.notes = character.notes || {};
        this.languages = character.languages || [];
    }
}
