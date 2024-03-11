<template>
  <v-app>
    <v-main>
      <v-container>
        <v-layout row wrap>
          <RoomList @selectRoom="handleRoomSelection" />
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

      selectedRoom: 1,
      messages: [],
    };
  },
  mounted() {
    this.fetchData();
    this.$socket.emit("joinRoom", this.selectedRoom);
    this.$socket.on("getData", (data) => {
      console.log("run", data);
      this.messages = data;
    });
  },
  methods: {
    async fetchData() {
      try {
        let data = await apiClient.get("/");
        this.res = data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    handleRoomSelection(room) {
      this.selectedRoom = room;
      this.$socket.emit("joinRoom", this.selectedRoom);
    },

    sendMessage(message) {
      if (message.trim() !== "") {
        let msg = { text: message };
        this.messages.push(msg);
        this.$socket.emit("storeChats", msg);
      }
    },
  },
};
</script>
