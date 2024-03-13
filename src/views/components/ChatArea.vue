<template>
  <v-flex xs12 md9>
    <v-card class="elevation-2 chat-area-card">
      <v-card-title class="text-center" style="border-bottom: 1px solid black">
        {{ selectedRoom ? "Room " + selectedRoom : "Select a room" }}
      </v-card-title>
      <v-card-text class="message-list">
        <v-list dense>
          <v-list-item v-for="(message, index) in messages" :key="index">
            <v-list-item-subtitle class="message-text"
              ><v-chip style="background: #c2e6f7">{{
                message.text
              }}</v-chip></v-list-item-subtitle
            >
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions class="message-input">
        <v-text-field
          :disabled="!selectedRoom"
          v-model="newMessage"
          label="Type your message"
          outlined
          dense
          class="message-field"
          @keyup.enter="sendMessage"
        ></v-text-field>
        <v-btn @click="sendMessage" color="primary">Send</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ["selectedRoom", "messages"],
  data() {
    return {
      newMessage: "",
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.$emit("sendMessage", this.newMessage);
        this.newMessage = "";
      }
    },
  },
};
</script>

<style scoped>
.chat-area-card {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.message-list {
  flex: 1;
  overflow-y: auto;
}

.message-text {
  word-break: break-word;
}

.message-input {
  display: flex;
  align-items: start;
  justify-content: flex-end;
}

.message-field {
  flex: 1;
  margin-right: 10px;
}
</style>
