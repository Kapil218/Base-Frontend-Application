<template>
  <div>
    <h5>{{ res?.data }}</h5>
    <ul>
      <li v-for="message in messages" :key="message._id">
        {{ message.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";

export default {
  name: "HomeE",
  data() {
    return {
      res: null,
      messages: [],
    };
  },
  async mounted() {
    // Fetch initial data from the backend
    this.res = await axios.get("http://127.0.0.1:3000/api/v1/chats/");
    console.log(this.res.data);

    // Connect to Socket.IO server
    const socket = io("http://localhost:3000", { transports: ["websocket"] }); // Replace with your Socket.IO server URL

    // Listen for "message" event from Socket.IO server
    socket.on("message", (data) => {
      // Add received message to the messages array
      this.messages.push(data);
    });

    // Handle successful response
  },
};
</script>
