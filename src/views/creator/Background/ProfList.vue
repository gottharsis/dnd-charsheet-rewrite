<template>
  <v-col justify="center">
    <v-row v-for="prof in profList" :key="prof.id" fluid>
      <v-col>
        <v-text-field
          label="Name"
          v-model="prof.name"
          @input="handleInput"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-select
          :items="proficiencyOptions"
          v-model="prof.proficiency"
        ></v-select>
      </v-col>
      <v-col>
        <v-btn icon @click="removeProf(prof.id)"
          ><v-icon color="red">mdi-delete</v-icon></v-btn
        >
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import * as R from "ramda";
import { v4 as uuid } from "uuid";

class Prof {
  constructor() {
    this.id = uuid();
    this.name = "";
    this.proficiency = 1;
  }
}

export default {
  props: {
    value: Object
  },
  data() {
    return {
      profList: [new Prof()],

      proficiencyOptions: [
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
      ]
    };
  },
  computed: {
    profObj() {
      const isInvalid = R.either(R.isNil, R.isEmpty);
      return R.pipe(
        R.reject(({ name }) => isInvalid(name)),
        R.map(({ name, proficiency }) => ({ [name]: proficiency })),
        R.fromPairs
      );
    }
  },
  methods: {
    update() {
      this.$emit("input", this.profObj);
    },
    addProf() {
      this.profList.push(new Prof());
    },
    removeProf(id) {
      this.profList = R.reject(R.propEq("id", id))(this.profList);
      if (R.isEmpty(this.profList)) {
        this.profList.push(new Prof());
      }
    },
    handleInput() {
      if (R.compose(R.not, R.isEmpty, R.prop("name"), R.last)(this.profList)) {
        this.addProf();
      }
    }
  }
};
</script>

<style></style>
