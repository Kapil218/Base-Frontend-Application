<template>
  <v-flex xs12 md3>
    <v-card class="elevation-2 room-list-card">
      <v-card-title class="room-list-title">Room List</v-card-title>
      <v-card-text>
        <v-list dense>
          <v-list-item v-for="(room, index) in rooms" :key="index">
            <v-list-item-title>
              <v-btn @click="selectRoom(room)" outlined class="room-btn"
                >Room {{ room }}</v-btn
              >
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="createRoom()" outlined class="room-btn">
          Create Room
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ["rooms"],
  data() {
    return {};
  },
  methods: {
    selectRoom(room) {
      this.$emit("selectRoom", room);
    },
    createRoom() {
      this.$emit("createRoom", (this.rooms.length + 1).toString());
    },
  },
};
</script>

<style scoped>
.room-list-card {
  width: 100%;
  height: 100vh;
}

.room-list-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-align: center;
  padding: 10px;
}

.room-btn {
  width: 100%;
  text-align: left;
}

.room-btn:hover {
  background-color: #f0f0f0;
}
</style>
