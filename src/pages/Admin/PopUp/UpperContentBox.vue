<template>
  <div class="upperBox" r>
    <div class="title">
      {{ titleBox.name }}
    </div>
    <div class="upperContent">{{ detailData[0].name }}</div>
  </div>
</template>

<script>
export default {
  name: "UpperContentBox",
  props: {
    titleBox: Object,
    detailData: Object,
    type: String,
  },
};
</script>

<style></style>
