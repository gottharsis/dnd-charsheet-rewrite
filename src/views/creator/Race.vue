<template>
  <v-container class="race">
    <v-row>
      <v-col cols="4" offset="4">
        <template v-if="loaded">
          <v-select
            :items="races"
            item-text="name"
            item-value="name"
            return-object
            v-model="builder.race"
            placeholder="Select a Race"
          ></v-select>
          <v-btn color="primary" @click="$emit('nextStep')">
            Continue
          </v-btn>
        </template>
        <template v-else>
          Loading...
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import races from "@/reference/races.json";
// import * as R from "ramda";
export default {
  props: ["builder"],
  async mounted() {
    this.races = (await import("@/reference/races.json")).default;
    this.loaded = true;
  },
  computed: {},
  data() {
    return {
      selected: null,
      races: [],
      loaded: false
    };
  }
};
</script>

<style></style>
