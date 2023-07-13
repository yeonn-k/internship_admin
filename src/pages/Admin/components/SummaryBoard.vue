<template>
  <div class="summaryBoard">
    <h1 class="boardTitle">Summary</h1>
    <div class="totalSummary">
      <div>총 회신:</div>
      <div>
        <span class="number">{{ summaryData.length }}</span>
        건
      </div>
    </div>
    <div class="dataContainer">
      <SummaryData type="status" :data="filteredData('status')" />
      <SummaryData type="department" :data="filteredData('department')" />
      <SummaryData type="type" :data="filteredData('type')" />
    </div>
  </div>
</template>

<script>
import SummaryData from "./SummaryData.vue";

export default {
  name: "SummaryBoard",

  components: {
    SummaryData,
  },

  props: {
    summaryData: Array,
  },

  data() {
    return {
      summaryList: this.summaryData,
    };
  },

  methods: {
    filteredData(type) {
      if (type === "status") {
        return this.summaryList.map((data) => data.status);
      } else if (type === "department") {
        return this.summaryList.map((data) => data.department);
      } else if (type === "type") {
        return this.summaryList.map((data) => data.type);
      } else {
        return [];
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/variables.scss";

.summaryBoard {
  height: 100%;
  background-color: $lightGrey;
  border-radius: 5px;
  font-family: $fontFamily;

  .boardTitle {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    font-size: 1.5rem;
    font-weight: 900;
  }

  .totalSummary {
    background-color: #ffffff;
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    height: 20px;
    border-radius: 5px;
    font-weight: 900;
    height: 40px;

    .number {
      font-weight: 900;
      color: $primaryColor;
    }
  }
}
</style>
