<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="4">
        <div v-for="pc in builder.classes" :key="pc.id">
          <v-select
            :items="classes"
            item-text="name"
            item-value="name"
            v-model="pc.classData"
            return-object
            label="Class"
            :rules="[
              v => !!v || 'Must Select a Class',
              v => !!v && (counts[v.name] <= 1 || 'Already Selected')
            ]"
          />
          <v-text-field v-model.number="pc.level" label="Level"></v-text-field>

          <v-select
            v-if="pc.classData"
            :items="pc.classData.subclasses"
            label="Subclass"
            v-model="pc.subclass"
          />
        </div>

        <v-btn @click="addClass">Add</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import { PlayerClass } from "@/classes/playerClass";
import { v4 as uuid } from "uuid";
import * as R from "ramda";
export default {
  props: {
    builder: Object
  },
  computed: {
    counts() {
      return R.countBy(R.path(["classData", "name"]))(this.builder.classes);
    }
  },
  data() {
    return {
      classes: null,
      loaded: false,
      chosenClasses: []
    };
  },
  async mounted() {
    this.classes = (await import("@/reference/classes.json")).default;
    this.loaded = true;
  },
  methods: {
    addClass() {
      // if ()
      this.builder.classes.push({
        id: uuid(),
        classData: null,
        level: 1,
        subclass: ""
      });
    }
  }
};
</script>

<style></style>
