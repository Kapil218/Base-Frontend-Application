<template>
  <v-flex xs12 sm8 md8>
    <v-card v-if="selectedRoom" class="elevation-0 chat-area-card">
      <v-card-title class="mb-4" style="border-bottom: 1px solid black">
        <v-icon
          class="mr-4 d-flex d-sm-none"
          style="cursor: pointer"
          @click="showGroupsOnClick"
          >mdi-arrow-left</v-icon
        >
        {{ selectedRoom }}
      </v-card-title>
      <v-card-text class="message-list" ref="messageContainer">
        <v-list dense>
          <v-list-item v-for="(message, index) in messages" :key="index">
            <v-list-item-subtitle
              v-if="getUser() == message.chat.user"
              class="message-text text-right my-1"
            >
              <div
                class="pt-3 pb-1 my-1"
                style="
                  background: white;
                  border-radius: 6px;
                  display: inline-block;
                  max-width: 70%;
                "
              >
                <p
                  class="mb-0 pr-10 pl-3"
                  style="
                    font-size: 1rem;
                    display: inline-block;
                    white-space: normal;
                  "
                >
                  {{ message.chat.text }}
                </p>
                <p class="#F8BBD0--text mb-0 pr-2" style="font-size: 10px">
                  {{ message.chat.timeStamp.time }}
                </p>
              </div>
            </v-list-item-subtitle>
            <v-list-item-subtitle v-else class="message-text my-1">
              <div
                class="py-1 px-2 my-1"
                style="
                  background: rgb(136, 186, 220);
                  border-radius: 6px;
                  display: inline-block;
                  max-width: 70%;
                "
              >
                <p
                  class="mb-0 px-1 #F8BBD0--text"
                  style="font-size: 10px; font-weight: bold"
                >
                  ~{{ message.chat.user }}
                </p>
                <p
                  class="mb-0 pr-10 pl-3"
                  style="
                    font-size: 1rem;
                    display: inline-block;
                    white-space: normal;
                  "
                >
                  {{ message.chat.text }}
                </p>
                <p
                  class="#F8BBD0--text text-right mb-0 pr-2"
                  style="font-size: 10px"
                >
                  {{ message.chat.timeStamp.time }}
                </p>
              </div>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions class="message-input px-4">
        <v-text-field
          :disabled="!selectedRoom"
          v-model="newMessage"
          label="Type your message"
          rounded
          outlined
          dense
          class="message-field"
          @keyup.enter="sendMessage"
        ></v-text-field>
        <v-btn @click="sendMessage" color="primary" icon class="send-btn">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else class="elevation-2 chat-area-card px-4">
      <v-card-text class="message-list d-flex align-center justify-center">
        <!-- Adding flexbox classes -->
        <div class="text-center">
          <!-- Centering the content -->
          <h1>Welcome to Chatify!</h1>
          <br />
          <div>
            Join millions of users worldwide in experiencing the ultimate
            chatting platform.
          </div>
        </div>
      </v-card-text>
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
  watch: {
    messages: {
      handler() {
        // Scroll to bottom after adding a new message
        this.$nextTick(() => {
          this.$refs.messageContainer.scrollTop =
            this.$refs.messageContainer.scrollHeight;
        });
      },
    },
  },

  methods: {
    getUser() {
      return localStorage.getItem("user");
    },
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.$emit("sendMessage", this.newMessage);
        this.newMessage = "";
      }
    },
    showGroupsOnClick() {
      this.$emit("showGroupsOnClick", true);
    },
  },
};
</script>

<style scoped>
.chat-area-card {
  border-radius: 0;
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  background-color: rgb(213, 223, 230) !important;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 0;
}
.theme--light.v-list {
  background-color: rgb(213, 223, 230) !important;
  padding: 0;
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
/* Customizing scrollbar */
.message-list::-webkit-scrollbar {
  width: 6px; /* Adjust the width of the scrollbar */
}

.message-list::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2); /* Adjust scrollbar thumb color */
  border-radius: 3px;
}
</style>
