<template>
  <div class="summaryData">
    <div>{{ list }}</div>
    <div class="dataList" v-for="list in lists" :key="list">
      <span class="dataCategory">{{ list.title }}</span>
      <div class="dataLength">
        <span class="number">{{ list.length }}</span
        >건
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SummaryData",
  props: {
    type: String,
  },
  data() {
    return {
      statusLists: [
        { title: "회신 대기", length: "2" },
        { title: "회신 진행", length: "3" },
        { title: "회신 완료", length: "3" },
      ],
      departmentLists: [
        { title: "영업팀", length: "3" },
        { title: "기술팀", length: "5" },
      ],
      typeLists: [
        { title: "MR 문의", length: "3" },
        { title: "컨설팅 문의", length: "2" },
        { title: "일반 문의", length: "3" },
      ],
    };
  },
  computed: {
    lists() {
      if (this.type === "status") {
        return this.statusLists;
      } else if (this.type === "department") {
        return this.departmentLists;
      } else if (this.type === "type") {
        return this.typeLists;
      } else {
        return [];
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/variables.scss";

.summaryData {
  background-color: #ffffff;
  border-radius: 5px;
  width: 80%;
  margin: 20px auto;
  padding: 10px 0;
}

.dataList {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 10px 0;

  .dataCategory {
    font-weight: 700;
  }

  .dataLength {
    border-radius: 50%;
    border: 1px solid white;
    background-color: white;

    .number {
      font-weight: 900;
      color: $primaryColor;
    }
  }
}
</style>
