<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="4">
        <v-select
          :items="generationMethods"
          v-model="generation"
          label="Generation Method"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <template v-if="generation === 'Roll'">
        <roll v-model="builder.abilityScores" :validate="validate" />
      </template>

      <template v-else-if="generation === 'Point buy'">
        <point-buy v-model="builder.abilityScores" :validate="validate" />
      </template>

      <template v-else>
        <manual v-model="builder.abilityScores" :validate="validate" />
      </template>
    </v-row>
    <v-btn
      color="primary"
      :disabled="!validate.isValid"
      @click="$emit('nextStep')"
      >Continue</v-btn
    >
  </v-container>
</template>

<script>
import { abilityOrder } from "@/classes/abilityScores";
import * as R from "ramda";
import Roll from "./AbilityScores/Roll";
import PointBuy from "./AbilityScores/PointBuy";
import Manual from "./AbilityScores/Manual";

const generationMethods = ["Roll", "Point buy", "Manual"];

export default {
  name: "Creator_AbilityScores",
  props: ["builder"],
  data() {
    return {
      abilityOrder,
      generationMethods,
      diceRoll: "4d6dl1",
      generation: "Roll",
      chosenStats: this.builder.abilityScores,
      validate: {
        isValid: false
      }
    };
  },
  computed: {
    rows() {
      return R.zip(abilityOrder, this.builder.abilityScores);
    }
  },
  methods: {},
  components: {
    Roll,
    PointBuy,
    Manual
  }
};
</script>

<style></style>
