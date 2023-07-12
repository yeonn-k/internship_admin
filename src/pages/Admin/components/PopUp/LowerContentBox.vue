<template>
  <div class="lowerBox">
    <div class="greyLine" />
    <div class="lowerTitle">
      {{ lowerTitleBox[dataType] }}
    </div>
    <div class="lowerContent">{{ detailData[0][dataType] }}</div>
  </div>
</template>

<script>
export default {
  name: "LowerContentBox",
  props: {
    lowerTitleBox: Object,
    detailData: Object,
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
