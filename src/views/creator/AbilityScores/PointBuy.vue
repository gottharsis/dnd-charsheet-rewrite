<template>
  <v-row justify="center">
    <v-col cols="4">
      <v-row>
        <v-simple-table>
          <tr v-for="(score, i) in scores" :key="i">
            <td>{{ abilityOrder[i] }}</td>
            <td>
              <v-text-field
                v-model.number="scores[i]"
                @change="handleChange"
                required
                :rules="[validateScore]"
              />
            </td>
          </tr>
        </v-simple-table>
      </v-row>
    </v-col>
    <v-col cols="4">
      <v-row>
        <v-spacer />
        <v-text-field
          v-model.number="startingValue"
          label="Base Score (default 8)"
        />
        <v-spacer />
        <v-text-field
          v-model.number="totalPoints"
          label="Total Points (default 27)"
        />
        <v-spacer />
        <v-text-field v-model.number="maximum" label="Maximum Possible" />
      </v-row>

      <v-row justify="center" align="center">
        <v-col align="center">
          <h3 class="text-center">Remaining Points</h3>
          <h1>{{ remainingPoints }}</h1>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import * as R from "ramda";
import { abilityOrder } from "@/classes/abilityScores";
export default {
  name: "AbilityScores_PointBuy",
  props: {
    value: Array,
    validate: Object
  },
  data() {
    return {
      abilityOrder,
      startingValue: 8,
      scores: [8, 8, 8, 8, 8, 8],
      totalPoints: 27,
      maximum: 15
    };
  },
  computed: {
    remainingPoints() {
      return R.pipe(
        R.map(R.subtract(R.__, this.startingValue)),
        R.sum,
        R.subtract(this.totalPoints)
      )(this.scores);
    },
    isValid() {
      return (
        this.remainingPoints == 0 &&
        R.all(
          R.both(R.lte(R.__, this.maximum), R.gte(R.__, this.startingValue)),
          this.scores
        )
      );
    }
  },
  methods: {
    update() {
      this.validate.isValid = this.isValid;
      this.$emit("input", this.scores);
    },
    handleChange() {
      // if valid
      console.log("handlechange");
      this.update();
    },
    validateScore(score) {
      if (score < this.startingValue) return "Score is too low";
      else if (score > this.maximum) return "Score is too high";
      return true;
    }
  },
  mounted() {
    this.update();
  }
};
</script>

<style></style>
