<template>
  <v-container
    fluid
    class="fill-height d-flex align-center justify-center"
    style="background: #ede7d8"
  >
    <v-card
      width="450"
      class="text-center py-8 px-4"
      style="background: #d1cfc9; border-radius: 1rem"
    >
      <v-card-text>
        <p class="text-h4 text--primary">Chatify</p>
      </v-card-text>
      <v-text-field
        rounded
        style="border: 1px solid grey"
        v-model="name"
        placeholder="Enter your name"
      ></v-text-field>
      <v-card-actions class="d-flex justify-center mt-8">
        <v-btn color="secondary" @click="redirectToPage">Sign In</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  methods: {
    redirectToPage() {
      if (this.name.trim() !== "") {
        localStorage.setItem("user", this.name);
        // Assuming the page you want to redirect to is "/welcome" for example
        this.$router.push("/");
      } else {
        // Handle empty input
        alert("Please enter your name");
      }
    },
  },
};
</script>
