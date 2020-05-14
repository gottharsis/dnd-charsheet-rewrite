<template>
    <v-container class="fill-height landing-page" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" flat dark>
                        <v-toolbar-title>Select Character</v-toolbar-title>
                        <v-spacer />
                        <v-btn color="secondary" to="/creator">
                            <v-icon>mdi-plus</v-icon>
                            New
                        </v-btn>
                    </v-toolbar>

                    <template v-if="ready">
                        <v-list>
                            <v-list-item
                                v-for="character in characters"
                                :key="character.name"
                                @click="() => {}"
                            >
                                <v-list-item-content>
                                    <v-list-item-title v-html="character.name">
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </template>

                    <template v-else>
                        <v-col>
                            <v-row justify="center">
                                Loading...
                            </v-row>
                            <v-row justify="center">
                                <v-progress-circular indeterminate>
                                </v-progress-circular>
                            </v-row>
                        </v-col>
                    </template>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { characterList } from "@/data/persistCharacter";
export default {
    data() {
        return {
            characters: [],
            ready: false,
            character: 1
        };
    },
    async mounted() {
        this.characters = await characterList();
        this.ready = true;
    }
};
</script>

<style></style>
