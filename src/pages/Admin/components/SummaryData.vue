<template>
  <div class="summaryData">
    <div class="chartContainer">
      <Doughnut :data="chartData" :options="options" />
    </div>
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
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip);

export default {
  name: "SummaryData",
  components: { Doughnut },
  props: {
    type: String,
    data: Array,
  },

  data() {
    return {
      statusList: ["문의 접수", "문의 진행", "문의 완료"],
      typeList: ["MR 문의", "컨설팅 문의", "일반 문의"],
      chartLength: [],
      options: {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },
      },
    };
  },

  methods: {
    getLength(list) {
      if (list == "문의 접수") {
        const count = this.data.reduce((lengths, item) => {
          if (item == "") return lengths + 1;
          return lengths;
        }, 0);
        return count;
      } else if (list == "문의 진행") {
        const count = this.data.reduce((lengths, item) => {
          if (
            item == "진행" ||
            item == "회신 작업중" ||
            item == "회신 완료" ||
            item == "추가 회신"
          )
            return lengths + 1;
          return lengths;
        }, 0);
        return count;
      } else if (list == "문의 완료") {
        const count = this.data.reduce((lengths, item) => {
          if (item == "미팅 확정" || item == "문의 완료") return lengths + 1;
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
      } else if (this.type === "type") {
        return this.typeList;
      } else {
        return [];
      }
    },
    chartData() {
      if (this.type == "status") {
        return {
          labels: this.statusList,
          datasets: [
            {
              backgroundColor: ["#63da60", "#65aaea", "#f36666"],
              data: [
                this.getLength("문의 접수"),
                this.getLength("문의 진행"),
                this.getLength("문의 완료"),
              ],
            },
          ],
        };
      } else if (this.type == "type") {
        return {
          labels: this.typeList,
          datasets: [
            {
              backgroundColor: ["#63da60", "#65aaea", "#f36666"],
              data: [
                this.getLength("MR 문의"),
                this.getLength("컨설팅 문의"),
                this.getLength("일반 문의"),
              ],
            },
          ],
        };
      } else return {};
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
.chartContainer {
  width: 80%;
  margin: auto;
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
