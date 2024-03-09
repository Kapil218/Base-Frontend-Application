<template>
  <h5>{{ res?.data }}</h5>
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
    this.res = await axios.get("http://127.0.0.1:3000/api/v1/chats/");
    console.log(this.res.data);

    // Handle successful response
  },
};
</script>
