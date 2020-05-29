<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-toolbar-title>Character Creator</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-stepper v-model="stepper" vertical>
      <div v-for="(step, i) in steps" :key="step.label">
        <v-stepper-step
          :complete="step.state === StateEnum.COMPLETE"
          :step="i + 1"
          editable
          >{{ step.label }}</v-stepper-step
        >

        <v-stepper-content :step="i + 1">
          <component
            :is="step.component"
            :builder="builder"
            @nextStep="nextStep"
          />
        </v-stepper-content>
      </div>
    </v-stepper>
    <!-- <v-stepper v-model="stepper" alt-labels >
      <v-stepper-header dark>
        <v-stepper-step editable :step="1">Basic Info</v-stepper-step>
        <v-divider />
        <v-stepper-step editable :step="2">Race</v-stepper-step>

        <v-divider />
        <v-stepper-step editable :step="3">Ability Scores</v-stepper-step>
      </v-stepper-header>

      <v-stepper-content v-for="(element, i) in steps" :key="element.label" :step="i+1">
        <component :is="element.component" />
      </v-stepper-content>
    </v-stepper>-->
  </div>
</template>

<script>
import { CharacterBuilder } from "@/classes/characterBuilder";
import BasicInfo from "./BasicInfo";
import RaceVue from "./Race.vue";
import AbilityScoresVue from "./AbilityScores.vue";
import ClassesVue from "./Classes.vue";
import BackgroundVue from "./Background.vue";
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
  name: "Creator",
  methods: {
    nextStep() {
      console.log("next step");
      this.stepper++;
    }
  },
  data() {
    return {
      stepper: 2,
      StateEnum,
      steps: [
        // null,
        {
          label: "Basic Info",
          state: StateEnum.UNVISITED,
          component: BasicInfo
        },
        {
          label: "Race",
          state: StateEnum.UNVISITED,
          component: RaceVue
        },
        {
          label: "Ability Scores",
          state: StateEnum.UNVISITED,
          component: AbilityScoresVue
        },
        {
          label: "Classes",
          state: StateEnum.UNVISITED,
          component: ClassesVue
        },
        {
          label: "Background and Proficiencies",
          state: StateEnum.UNVISITED,
          component: BackgroundVue
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
  beforeMount() {
    this.builder = new CharacterBuilder();
  }
};
</script>

<style></style>
