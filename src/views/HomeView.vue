<template>
  <v-app>
    <v-main>
      <v-container>
        <v-layout row wrap justify-center>
          <RoomList
            :rooms="rooms"
            @createRoom="createRoom"
            @selectRoom="selectRoom"
          />

          <ChatArea
            :selectedRoom="selectedRoom"
            :messages="messages"
            @sendMessage="sendMessage"
          />
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import RoomList from "./components/RoomList.vue";
import ChatArea from "./components/ChatArea.vue";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000",
});

export default {
  name: "HomeE",
  components: {
    RoomList,
    ChatArea,
  },
  data() {
    return {
      res: null,
      selectedRoom: null,
      rooms: [],
      messages: [],
    };
  },
  created() {
    // Fetch initial data
    this.fetchData();

    // Listen for available rooms and initial messages
    this.$socket.on("avlRooms", (data) => {
      this.rooms = data;
    });
    this.$socket.on("getData", (data) => {
      this.messages = data;
    });
  },
  methods: {
    createRoom(room) {
      this.$socket.emit("createRoom", room);
    },
    selectRoom(roomId) {
      this.selectedRoom = roomId;
      // Emit room selection change
      this.$socket.emit("joinRoom", roomId);
    },
    sendMessage(message) {
      // Emit new message to the server
      const data = { text: message, roomId: this.selectedRoom };
      this.$socket.emit("storeChats", data);
    },
    async fetchData() {
      try {
        const response = await apiClient.get("/");
        this.res = response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Add custom styles here */
/* Center the content horizontally */
.container {
  display: flex;
  justify-content: center;
}

/* Add margin to the components */
.room-list {
  margin-right: 20px;
}

.chat-area {
  margin-left: 20px;
}
</style>
