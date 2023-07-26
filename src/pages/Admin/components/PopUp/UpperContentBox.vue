<template>
  <div class="upperBox">
    <div class="upperTitle">
      {{ upperTitleBox[dataType] }}
    </div>
    <div v-if="dataType !== 'status'" class="upperContent">
      {{ cardData[dataType] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "UpperContentBox",
  props: {
    upperTitleBox: Object,
    cardData: Object,
    dataType: String,
  },
};
</script>

<style lang="scss">
@import "../../../../assets/scss/variables.scss";

.upperBox {
  width: 47%;
  font-size: 18px;
  display: flex;
}

.upperTitle {
  width: 65px;
  line-height: 34px;
  text-align: end;
}

.upperContent {
  width: 90%;
  height: 34px;
  line-height: 34px;
  margin-left: 10px;
}

.popUpBadge {
  line-height: 1.6;
  margin-left: 10px;
}
</style>
