<template>
  <div class="upperBox" r>
    <div class="upperTitle">
      {{ upperTitleBox[dataType] }}
    </div>
    <div v-if="dataType !== 'status'" class="upperContent">
      {{ filteredData[0][dataType] }}
    </div>
    <span
      v-if="dataType === 'status'"
      :class="['badge', badgeBorder, 'popUpBadge']"
      >{{ filteredData[0][dataType] }}</span
    >
  </div>
</template>

<script>
export default {
  name: "UpperContentBox",
  props: {
    upperTitleBox: Object,
    detailData: Object,
    dataType: String,
    filteredData: Array,
  },
  computed: {
    badgeBorder() {
      if (this.filteredData[0].status === "회신 대기") {
        return "badge-blue";
      } else if (this.filteredData[0].status === "회신중") {
        return "badge-green";
      } else if (this.filteredData[0].status === "추가 회신") {
        return "badge-yellow";
      } else {
        return "badge-red";
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../../../assets/scss/variables.scss";

.upperBox {
  width: 90%;
  font-size: 18px;
  display: flex;
}

.upperTitle {
  width: 80px;
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

.badge {
  color: black;

  &.badge-green {
    background-color: $lightGreen;
  }

  &.badge-red {
    background-color: $red;
  }

  &.badge-yellow {
    background-color: $yellow;
  }

  &.badge-blue {
    background-color: $lightBlue;
  }
}
</style>
