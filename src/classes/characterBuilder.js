import { Inventory } from "./inventory";
import { AbilityScores } from "./abilityScores";
import { Health } from "./health";
import { Magic } from "./magic";
import { Armor } from "./armor";
import { Ability, Feature } from "./ability";
import { Proficiencies } from "./proficiencies";
import { BasicInfo } from "./basicInfo";

export class CharacterBuilder {
  basicInfo = new BasicInfo();
  race = null;
  abilityScores = new AbilityScores();
  classes = [];
}
