<template>
  <v-container>
    <v-row>
      <v-col cols="4" offset="4">
        <v-text-field
          label="Name"
          v-model="builder.basicInfo.name"
          persistent-hint
        />
        <v-text-field
          label="Player Name"
          v-model="builder.basicInfo.playerName"
        />
        <v-btn @click="next" color="primary">Continue</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["builder"],
  methods: {
    next() {
      this.$emit("nextStep");
    }
  }
};
</script>

<style></style>
