<template>
  <v-flex xs12 md3>
    <v-card class="elevation-2">
      <v-card-title>Room List</v-card-title>
      <v-card-text>
        <v-list dense>
          <v-list-item v-for="(room, index) in rooms" :key="index">
            <v-list-item-title>
              <v-btn @click="selectRoom(room)">Room {{ room }}</v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data() {
    return {
      rooms: [1, 2, 3],
    };
  },
  methods: {
    selectRoom(room) {
      this.$emit("selectRoom", room);
    },
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
