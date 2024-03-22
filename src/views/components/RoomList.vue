<template>
  <v-flex xs12 sm4 md4>
    <v-card class="elevation-2 room-list-card">
      <v-card-title class="primary room-list-title white--text"
        ><span>Groups</span>
        <v-spacer></v-spacer>
        <createRoomVue @createRoom="createRoom"></createRoomVue
      ></v-card-title>

      <v-card-text class="pa-0 room-list-container">
        <v-list dense class="pa-0">
          <v-list-item class="pa-0" v-for="(room, index) in rooms" :key="index">
            <v-list-item-title>
              <v-btn
                style="
                  background-color: rgb(136, 186, 220) !important;
                  color: #ebeff2;
                "
                @click="selectRoom(room)"
                class="room-btn px-0"
                >{{ room }}</v-btn
              >
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import createRoomVue from "./createRoom.vue";
export default {
  components: { createRoomVue },
  props: ["rooms"],
  methods: {
    selectRoom(room) {
      this.$emit("selectRoom", room);
    },
    createRoom(name) {
      this.$emit("createRoom", name);
    },
  },
};
</script>

<style scoped>
.room-list-card {
  background-color: rgb(136, 186, 220) !important;
  width: 100%;
  height: calc(100vh - 60px);
  border-radius: 0;
}

.room-list-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-align: center;
  padding: 1rem;
}

.room-list-container {
  background-color: rgb(136, 186, 220) !important;
  height: calc(100% - 128px); /* Adjust the height based on your design */
  overflow-y: auto;
}

.room-btn {
  background-color: rgb(221, 214, 214) !important;
  width: 100%;
  text-align: left;
  border-bottom: 0.5px solid gray;
  padding: 1.5rem 0 !important;
  border-radius: 0;
}

/*  padding: 2rem 0 !important;
  z-index: 100; */
/* Customizing scrollbar */
.room-list-container::-webkit-scrollbar {
  width: 6px; /* Adjust the width of the scrollbar */
}

.room-list-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2); /* Adjust scrollbar thumb color */
  border-radius: 3px;
}
</style>
