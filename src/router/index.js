import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import profileView from "../views/profileDialog.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/p",
    name: "p",
    component: profileView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Implement a global navigation guard
router.beforeEach((to, from, next) => {
  // Check if the user is not logged in and trying to access a protected route
  if (!localStorage.getItem("user") && to.name !== "login") {
    // Redirect to the login page
    next({ name: "login" });
  } else if (localStorage.getItem("user") && to.name === "login") {
    // If user is logged in and trying to access the login page, redirect to home
    next({ name: "home" });
  } else {
    // Allow navigation to proceed
    next();
  }
});

export default router;
