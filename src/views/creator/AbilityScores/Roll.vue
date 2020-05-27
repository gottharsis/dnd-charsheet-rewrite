<template>
  <v-row justify="center">
    <v-col cols="4">
      <v-simple-table>
        <draggable group="stats" v-model="chosenStats" @change="updateScore">
          <tr v-for="row in 6" :key="row">
            <td>{{ abilityOrder[row - 1] }}</td>
            <td>
              {{ (chosenStats[row - 1] && chosenStats[row - 1].value) || "" }}
            </td>
          </tr>
        </draggable>
      </v-simple-table>
    </v-col>
    <v-col cols="4">
      <v-select
        :items="rollMethods"
        v-model="diceRoll"
        label="Dice Roll"
        item-text="name"
        item-value="roll"
      ></v-select>
      <v-text-field
        v-if="!diceRoll"
        v-model="customRollMethod"
        label="Custom Roll Method"
      ></v-text-field>
      <v-btn color="primary" @click="roll"> Roll </v-btn>

      <v-list dense>
        <draggable group="stats" v-model="rollResults">
          <v-list-item v-for="roll in rollResults" :key="roll.id">
            {{ roll.value }}
          </v-list-item>
        </draggable>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import { abilityOrder } from "@/classes/abilityScores";
import { DiceRoller } from "rpg-dice-roller/lib/esm/bundle";
import * as R from "ramda";
import draggable from "vuedraggable";
const roller = new DiceRoller();

const rollMethods = [
  {
    name: "4d6 Drop Lowest",
    roll: "4d6dl1"
  },
  {
    name: "3d6",
    roll: "3d6"
  },
  {
    name: "Custom",
    roll: ""
  }
];
export default {
  name: "AbilityScores_Roll",
  props: {
    value: Array,
    validate: Object
  },
  computed: {
    statsNumeric() {
      return R.pluck("value")(this.chosenStats);
    },
    isValid() {
      return R.none(R.isNil, this.statsNumeric);
    }
  },
  data() {
    let diceRoll = rollMethods[0].roll;
    return {
      rollMethods,
      diceRoll,
      abilityOrder,
      customRollMethod: "",
      rollResults: [],
      chosenStats: R.map(() => null, R.range(0, 6))
    };
  },

  methods: {
    roll() {
      const diceRoll = this.diceRoll || this.customRollMethod;
      const rollFunc = () => roller.roll(diceRoll).total;
      const createObj = id => ({
        id,
        value: rollFunc()
      });
      const results = R.map(createObj, R.range(0, 6));
      this.chosenStats = R.map(() => null, R.range(0, 6));
      this.rollResults = results;
      this.update();
    },
    update() {
      console.log(this.statsNumeric);
      this.validate.isValid = this.isValid;
      this.$emit("input", this.statsNumeric);
    },

    updateScore(event) {
      const wasAdded = R.has("added");
      const wasMoved = R.has("moved");
      const wasRemoved = R.has("removed");
      if (wasAdded(event)) {
        const idx = R.path(["added", "newIndex"])(event);
        const elem = this.chosenStats.splice(idx + 1, 1)[0];
        if (!R.isNil(elem)) this.rollResults.push(elem);
      } else if (wasMoved(event)) {
        const idx = R.path(["moved", "newIndex"])(event);
        const elem = this.chosenStats.splice(idx + 1, 1)[0];
        if (!R.isNil(elem)) this.rollResults.push(elem);
      } else if (wasRemoved(event)) {
        const idx = R.path(["removed", "oldIndex"]);
        this.chosenStats = R.insert(idx, null, this.chosenStats);
      }
      const extras = this.chosenStats.splice(6);
      this.rollResults = R.concat(this.rollResults, extras);
      this.update();
    }
  },
  components: {
    draggable
  },
  watch: {
    value(val) {
      val;
      // this.chosenStats = R.map(R.identity, val);
    }
  }
};
</script>

<style></style>
