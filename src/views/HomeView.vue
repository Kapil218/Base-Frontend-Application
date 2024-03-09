<template>
  <h1>hjghgj</h1>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeE",
  data() {
    return {
      res: null,
    };
  },
  async mounted() {
    this.res = await axios.get("http://127.0.0.1:3000/");
    console.log(this.res.data);
    // Handle successful response
  },
};
</script>
