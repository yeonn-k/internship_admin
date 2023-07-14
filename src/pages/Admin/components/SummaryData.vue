<template>
  <div class="summaryData">
    <div class="dataList" v-for="list in lists" :key="list">
      <span class="dataCategory">{{ list }}</span>
      <div class="dataLength">
        <span class="number">{{ getLength(list) }}</span
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
    data: Array,
  },

  data() {
    return {
      statusList: [
        "문의 등록",
        "회신 대기",
        "추가 회신",
        "회신중",
        "회신 완료",
        "미팅 확정",
      ],
      departmentList: ["영업팀", "기술팀"],
      typeList: ["MR 문의", "컨설팅 문의", "일반 문의"],
    };
  },

  methods: {
    getLength(list) {
      if (list == "문의 등록") {
        const count = this.data.reduce((lengths, item) => {
          if (item == "") return lengths + 1;
          return lengths;
        }, 0);
        return count;
      } else {
        const count = this.data.reduce((lengths, item) => {
          if (item == list) return lengths + 1;
          return lengths;
        }, 0);
        return count;
      }
    },
  },

  computed: {
    lists() {
      if (this.type === "status") {
        return this.statusList;
      } else if (this.type === "department") {
        return this.departmentList;
      } else if (this.type === "type") {
        return this.typeList;
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
