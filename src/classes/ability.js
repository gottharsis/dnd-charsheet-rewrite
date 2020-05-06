import { v4 as uuid } from "uuid";
export class Ability {
    constructor(ability = {}) {
        this.name = ability.name || "";
        this.description = ability.description || "";
        this.max = ability.max || 0;
        this.used = ability.used || 0;
        this.id = ability.id || "ability_" + uuid();
    }
}

export class Feature {
    constructor(feature = {}) {
        this.name = feature.name || "";
        this.description = feature.description || "";
        this.source = feature.source || "";
        this.id = feature.id || "feature_" + uuid();
    }
}
