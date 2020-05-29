<template>
  <v-form v-model="isValid">
    <v-container>
      <v-row justify="center">
        <v-col cols="4">
          <v-row>
            <v-select
              v-model="builder.background"
              :items="backgrounds"
              return-object
              item-text="name"
              label="Background"
              :rules="[v => !!v.name || 'Must Select a Background']"
              validate-on-blur
            ></v-select>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="4">
          <h3>Skill Proficiencies</h3>
          <p>
            Select your proficiencies in the table below (will override anything
            else)
          </p>

          <v-row v-for="sk in skills" :key="sk.name">
            <v-col> {{ sk.name }}</v-col>
            <v-col>
              <v-select
                :items="proficiencyOptions"
                v-model="builder.proficiencies.skills[sk.name]"
                dense
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <h3>Other Proficiencies</h3>
          <p>Enter your other proficiencies here</p>
          <div v-for="prof in otherProficiencies" :key="prof">
            <div>
              <h4>{{ capitalizeFirst(prof) }}</h4>
              <prof-list v-model="builder.proficiencies[prof]" />
            </div>
            <v-divider />
          </div>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="4">
          <v-row justify="end">
            <v-btn
              color="primary"
              :disabled="!isValid"
              @click="$emit('nextStep')"
            >
              Continue
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import * as R from "ramda";
import ProfList from "./Background/ProfList";
export default {
  props: {
    builder: Object
  },
  data() {
    return {
      backgrounds: null,
      skills: null,
      loaded: false,
      customBackground: {
        name: ""
      },
      proficiencyOptions: [
        {
          text: "None",
          value: 0
        },
        {
          text: "Half",
          value: 0.5
        },
        {
          text: "Proficient",
          value: 1
        },
        {
          text: "Expertise",
          value: 2
        }
      ],
      otherProficiencies: [
        "tools",
        "armor",
        "weapons",
        "savingThrows",
        "languages",
        "skills"
      ],
      isValid: false,
      console
    };
  },
  async mounted() {
    // const customBackground = {
    //   name: ""
    // };
    this.backgrounds = (await import("@/reference/backgrounds.json")).default;
    this.skills = (await import("@/reference/skills.json")).default;
    this.loaded = true;
  },
  computed: {
    skillsByTwo() {
      return R.splitEvery(2)(this.skills || []);
    }
  },
  components: {
    ProfList
  },
  methods: {
    capitalizeFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
};
</script>

<style></style>
