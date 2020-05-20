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
      <v-col cols="4">
        <v-simple-table>
          <draggable v-model="chosenStats" group="stats" @change="updateScore">
            <!-- <tr v-for="row in rows" :key="row[0]">
              <td>{{ row[0].toUpperCase() }}</td>
              <td>{{ row[1] }}</td>
            </tr> -->

            <tr v-for="row in 6" :key="row">
              <td>{{ abilityOrder[row - 1] }}</td>
              <td>{{ chosenStats[row - 1] }}</td>
            </tr>
          </draggable>
        </v-simple-table>
      </v-col>
      <template v-if="generation === 'Roll'">
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

          <v-row>
            <draggable v-model="rollResults" group="stats">
              <div v-for="roll in rollResults" :key="roll.id">
                {{ roll.value }}
              </div>
            </draggable>
          </v-row>
        </v-col>
      </template>

      <template v-else-if="generation === 'Point buy'">
        <v-col cols="4">
          <v-row justify="center" align="center" style="height: 100%">
            <div>
              <h2 class="text-center">Points Remaining</h2>
              <h1 class="text-center">27</h1>
            </div>
          </v-row>
          <v-row justify="center" align="center">
            <v-col> </v-col>
          </v-row>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { abilityOrder } from "@/classes/abilityScores";
import * as R from "ramda";
import { DiceRoller } from "rpg-dice-roller/lib/esm/bundle";
import draggable from "vuedraggable";

const generationMethods = ["Roll", "Point buy", "Manual"];
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
  name: "Creator_AbilityScores",
  props: ["builder"],
  data() {
    return {
      abilityOrder,
      generationMethods,
      customRollMethod: "",
      rollMethods,
      diceRoll: "4d6dl1",
      generation: "Roll",
      roller: null,
      rollResults: null,
      chosenStats: R.map(() => null, R.range(0, 6))
    };
  },
  mounted() {
    if (R.isNil(this.roller)) {
      this.roller = new DiceRoller();
    }
  },
  computed: {
    rows() {
      return R.zip(abilityOrder, this.builder.abilityScores);
    }
  },
  methods: {
    roll() {
      const diceRoll = R.defaultTo(this.customRollMethod)(this.diceRoll);
      const rollFunc = () => this.roller.roll(diceRoll).total;
      const createObj = id => ({
        id,
        value: rollFunc()
      });
      const results = R.map(createObj, R.range(0, 6));
      this.rollResults = results;
    },
    updateScore(event) {
      console.log(event);

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
    }
  },
  components: {
    draggable
  }
};
</script>

<style></style>
