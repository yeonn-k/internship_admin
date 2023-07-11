<template>
  <div>Admin</div>
  <PopUp />
</template>

<script>
import PopUp from "./PopUp/PopUp.vue";

export default {
  name: "AdminVue",
  components: { PopUp: PopUp },
  data() {
    return {
      detailData: [],
    };
  },
  methods: {
    getDetails() {
      fetch("/data/inquireData.js")
        .then((response) => response.json())
        .then((result) => this.detailData.push(result));
    },
  },
};
</script>

<style></style>
