<template>
  <span style="display: inline-block">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn @click="openDialog" small elevation="0" fab v-on="on"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </template>
      <span>Create Group</span>
    </v-tooltip>
    <v-dialog
      v-model="dialog"
      max-width="500px"
      style="background: transparent"
    >
      <v-card class="blue lighten-5" style="border-radius: 1rem">
        <v-card-title class="text-center mb-3"> Enter Group Name </v-card-title>
        <v-card-text>
          <v-text-field
            outlined
            rounded
            v-model="groupName"
            label="Group Name"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="save"> Create </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      groupName: "",
    };
  },
  methods: {
    openDialog() {
      this.dialog = true;
    },
    cancel() {
      this.dialog = false;
      this.groupName = "";
    },
    save() {
      if (this.groupName.trim() === "") {
        // Optionally, handle empty input
        return;
      }
      this.$emit("createRoom", this.groupName);
      this.dialog = false;
      this.groupName = "";
    },
  },
};
</script>

<style scoped></style>
