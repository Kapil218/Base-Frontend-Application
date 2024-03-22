<template>
  <v-app>
    <v-main class="bg">
      <v-container fluid>
        <v-layout row wrap justify-center>
          <v-container fluid class="text-center pa-0 ma-0">
            <v-row class="py-2" justify="space-between">
              <v-col cols="5" class="text-right">
                <span class="#E3F2FD white--text text-h4">Chatify</span>
              </v-col>
              <v-col cols="6" class="text-right pa-0 ma-0">
                <profileDialogVue></profileDialogVue>
              </v-col>
            </v-row>
          </v-container>
          <RoomList
            v-if="showGroups"
            :rooms="rooms"
            @createRoom="createRoom"
            @selectRoom="selectRoom"
          />
          <ChatArea
            v-if="showChats"
            :selectedRoom="selectedRoom"
            :messages="messages"
            @sendMessage="sendMessage"
            @showGroupsOnClick="showGroups = $event"
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
import profileDialogVue from "./profileDialog.vue";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000",
});

export default {
  name: "HomeE",
  components: {
    RoomList,
    ChatArea,
    profileDialogVue,
  },
  data() {
    return {
      res: null,
      showChats: false,
      showGroups: true,
      selectedRoom: null,
      rooms: [],
      messages: [],
    };
  },
  created() {
    // Listen for available rooms and initial messages
    this.$socket.on("avlRooms", (data) => {
      this.rooms = data;
    });
    this.$socket.on("getData", (data) => {
      this.messages = data;
    });
  },
  mounted() {
    // Fetch initial data after the component is mounted
    this.fetchData();
    // Check screen size on mount
    this.checkScreenSize();
    // Add event listener for screen resize
    window.addEventListener("resize", this.checkScreenSize);
  },
  destroyed() {
    // Remove event listener on component destroy
    window.removeEventListener("resize", this.checkScreenSize);
  },
  methods: {
    createRoom(roomName) {
      this.$socket.emit("createRoom", roomName);
    },
    selectRoom(roomName) {
      this.selectedRoom = roomName;
      if (window.innerWidth < 600) {
        this.showChats = true;
        this.showGroups = false;
      }
      // Emit room selection change
      this.$socket.emit("joinRoom", roomName);
    },
    sendMessage(message) {
      var currentDate = new Date();
      var date = currentDate.getDate();
      var monthIndex = currentDate.getMonth() + 1;
      var year = currentDate.getFullYear();
      var hours = currentDate.getHours();
      var minutes = currentDate.getMinutes();
      // Display the current date and time
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const month = monthNames[monthIndex];
      const data = {
        chat: {
          text: message,
          user: localStorage.getItem("user"),
          timeStamp: {
            time: hours + ":" + minutes + " " + ampm,
            date: date + " " + month + " " + year,
          },
        },
        roomName: this.selectedRoom,
      };

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
    checkScreenSize() {
      if (window.innerWidth > 600) {
        this.showChats = true;
        this.showGroups = true;
      }
    },
  },
};
</script>

<style scoped>
/* Add custom styles here */
/* Center the content horizontally */

.bg {
  background-image: linear-gradient(
    to bottom right,
    rgb(224, 224, 224),
    rgb(58, 58, 58)
  );
}
</style>
