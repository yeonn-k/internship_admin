<template>
  <div class="upperBox" r>
    <div class="upperTitle">
      {{ upperTitleBox[dataType] }}
    </div>
    <div v-if="dataType !== 'status'" class="upperContent">
      {{ detailData[0][dataType] }}
    </div>
    <span v-else class="badge text-bg-primary">Primary</span>
  </div>
</template>

<script>
export default {
  name: "UpperContentBox",
  props: {
    upperTitleBox: Object,
    detailData: Object,
    dataType: String,
  },
};
</script>

<style>
.upperBox {
  width: 90%;
  font-size: 18px;
  display: flex;
}

.upperTitle {
  width: 70px;
  line-height: 34px;
  text-align: end;
}

.upperContent {
  width: 90%;
  height: 34px;
  line-height: 34px;
  margin-left: 10px;
}
</style>
