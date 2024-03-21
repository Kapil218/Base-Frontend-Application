<template>
  <div>
    <v-btn
      @click="toggleMenu"
      class="pa-8"
      style="background-color: white; cursor: pointer"
    >
      {{ currentUser }}
      <v-icon class="pl-4">mdi mdi-account</v-icon>
    </v-btn>

    <v-card v-if="menuOpen" elevation="5" class="menu-card py-4" outlined flat>
      <div class="email-container text-center">
        <p class="close-btn" @click="closeMenu">
          <v-btn icon text elevation="0"><v-icon>mdi-close</v-icon></v-btn>
        </p>
      </div>
      <v-card-text class="google-font text-center pt-0 px-8">
        <div>
          <span style="font-size: 80% !important">Managed by Chatify</span>
        </div>
        <h2>Hi, {{ currentUser }}</h2>
      </v-card-text>
      <v-card-actions class="pa-8">
        <v-btn
          class="px-7 py-3"
          style="
            border-radius: 1rem 0rem 0rem 1rem;
            border-right: 2px solid rgb(220, 215, 215);
          "
          elevation="0"
          >Profile</v-btn
        >
        <v-btn
          class="px-6 py-3 ml-0"
          style="border-radius: 0rem 1rem 1rem 0rem"
          elevation="0"
          @click="logout"
        >
          <v-icon>mdi-logout-variant</v-icon>Logout
        </v-btn>
      </v-card-actions>
      <p class="text-center">
        <span class="px-2" style="font-size: 60% !important"
          >Privacy policy</span
        >
        •
        <span class="px-2" style="font-size: 60% !important"
          >Terms of service</span
        >
      </p>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
    };
  },
  computed: {
    currentUser: {
      get() {
        return localStorage.getItem("user"); // Retrieving the value from local storage
      },
    },
  },

  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
    logout() {
      // logout
      localStorage.setItem("user", "");
      this.$router.push("login");
    },
  },
  mounted() {
    // Listen for route changes to close the menu
    // this.$router.afterEach(() => {
    //   this.closeMenu();
    // });
  },
};
</script>

<style scoped>
.menu-card {
  border-radius: 1.5rem;
  position: absolute;
  top: calc(10% + 5px); /* Adjust this value as needed */
  right: 1rem;
  z-index: 1000; /* Ensure the card is above other content */
}

.email-container {
  position: relative;
}

.email {
  font-size: 110% !important;
  font-weight: 600;
}

.close-btn {
  position: absolute;
  top: -16px;
  right: -8px;
  margin: 10px;
}
</style>
