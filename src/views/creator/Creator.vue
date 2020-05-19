<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-toolbar-title>Character Creator</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-stepper v-model="stepper" alt-labels>
      <v-stepper-header>
        <v-stepper-step editable :step="1">Basic Info</v-stepper-step>
        <v-divider />
        <v-stepper-step editable :step="2">Race</v-stepper-step>

        <v-divider />
        <v-stepper-step editable :step="3">Ability Scores</v-stepper-step>
      </v-stepper-header>
    </v-stepper>
  </div>
</template>

<script>
import { CharacterBuilder } from "@/classes/characterBuilder";
// class Step {
//   constructor(name) {
//     this.label = name;
//   }
// }
const StateEnum = {
  UNVISITED: 0,
  VISITED: 1,
  COMPLETE: 2,
  NEEDS_ATTENTION: 3
};
Object.freeze(StateEnum);
export default {
  data() {
    return {
      stepper: 0,
      StateEnum,
      steps: [
        {
          label: "Basic Info",
          state: StateEnum.UNVISITED
        },
        {
          label: "Race",
          state: StateEnum.UNVISITED
        },
        {
          label: "Ability Scores",
          state: StateEnum.UNVISITED
        },
        {
          label: "Classes",
          state: StateEnum.UNVISITED
        },
        {
          label: "Background and Proficiencies",
          state: StateEnum.UNVISITED
        },
        {
          label: "Magic",
          state: StateEnum.UNVISITED,
          optional: true
        },
        {
          label: "HP and Armor",
          state: StateEnum.UNVISITED
        },
        {
          label: "Features and Abilities",
          state: StateEnum.UNVISITED
        }
      ],
      builder: null
    };
  },
  mounted() {
    this.builder = new CharacterBuilder();
  }
};
</script>

<style></style>
