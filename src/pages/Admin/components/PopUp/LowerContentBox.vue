<template>
  <div class="lowerBox">
    <div class="greyLine" />
    <div class="lowerTitle">
      {{ lowerTitleBox[dataType] }}
    </div>
    <div v-if="dataType !== 'manager'" class="lowerContent">
      {{ cardData[dataType] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "LowerContentBox",
  props: {
    lowerTitleBox: Object,
    cardData: Object,
    dataType: String,
  },
};
</script>

<style>
.lowerBox {
  width: 90%;
  font-size: 18px;
}

.lowerTitle {
  width: 80px;
  line-height: 34px;
}

.lowerContent {
  width: 100%;
  height: 96px;
  line-height: 34px;
  font-weight: 300;
  overflow: scroll;
}

.greyLine {
  width: 100%;
  height: 1px;
  background-color: #e4e4e4;
  margin-top: 15px;
  margin-bottom: 10px;
}
</style>
