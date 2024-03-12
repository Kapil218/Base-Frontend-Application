<template>
  <v-flex xs12 md9>
    <v-card class="elevation-2">
      <v-card-title>{{
        selectedRoom ? selectedRoom : "Select a room"
      }}</v-card-title>
      <v-card-text>
        <v-list dense>
          <v-list-item v-for="(message, index) in messages" :key="index">
            <v-list-item-subtitle>{{ message.text }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-text-field
          v-model="newMessage"
          label="Type your message"
          outlined
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
/* Add your custom styles here */
</style>
