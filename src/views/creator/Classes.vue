<template>
  <v-form ref="form" v-model="isValid">
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
            <v-text-field
              v-model.number="pc.level"
              label="Level"
            ></v-text-field>

            <v-select
              v-if="pc.classData"
              :items="pc.classData.subclasses"
              label="Subclass"
              v-model="pc.subclass"
            />
          </div>

          <v-row justify="end">
            <v-btn @click="addClass"> <v-icon>mdi-plus</v-icon>Add</v-btn>
          </v-row>
          <v-row>
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
    // isValid() {
    //   return this.$refs.form.validate();
    // }
  },
  data() {
    return {
      classes: null,
      loaded: false,
      chosenClasses: [],
      isValid: false
    };
  },
  async mounted() {
    this.classes = (await import("@/reference/classes.json")).default;
    this.loaded = true;
    if (R.either(R.isNil, R.isEmpty)(this.builder.classes)) {
      this.addClass();
    }
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
