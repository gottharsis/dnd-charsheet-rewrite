<template>
  <v-row justify="center">
    <v-col cols="4">
      <v-simple-table>
        <tr v-for="(score, i) in scores" :key="i">
          <td>{{ abilityOrder[i] }}</td>
          <td>
            <v-text-field
              v-model.number="scores[i]"
              @change="handleChange"
              required
              :rules="[v => !!v || 'Must enter a score']"
            />
          </td>
        </tr>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script>
import { abilityOrder } from "@/classes/abilityScores";
import * as R from "ramda";
export default {
  props: {
    value: Array,
    validate: Object
  },
  computed: {
    isValid() {
      return R.none(R.either(R.isNil, R.isEmpty), this.scores);
    }
  },
  data() {
    return {
      abilityOrder,
      scores: [8, 8, 8, 8, 8, 8]
    };
  },
  methods: {
    update() {
      this.validate.isValid = this.isValid;
      this.$emit("input", this.scores);
    },
    handleChange() {
      this.update();
    }
  }
};
</script>

<style></style>
