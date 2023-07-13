<template>
  <div class="boardContainer">
    <SummaryBoard class="summaryBoard" :summaryData="contactDatas" />
    <AdminBoard
      class="board"
      title="Backlog"
      :dataArray="filteredDatas('Backlog')"
    />
    <AdminBoard
      class="board"
      title="Progress"
      :dataArray="filteredDatas('Progress')"
    />
    <AdminBoard class="board" title="Done" :dataArray="filteredDatas('Done')" />
  </div>
</template>

<script>
import AdminBoard from "./components/AdminBoard.vue";
import SummaryBoard from "./components/SummaryBoard.vue";
import data from "../../assets/contact.json";
const contactDatas = data;

export default {
  name: "AdminVue",

  components: {
    AdminBoard,
    SummaryBoard,
  },

  data() {
    return {
      contactDatas,
    };
  },

  methods: {
    filteredDatas(title) {
      if (title === "Backlog") {
        return this.contactDatas.filter((data) => data.status === "");
      } else if (title === "Done") {
        return this.contactDatas.filter(
          (data) => data.status === "회신 완료" || data.status === "미팅 확정"
        );
      } else if (title === "Progress") {
        return this.contactDatas.filter(
          (data) =>
            data.status === "회신중" ||
            data.status === "추가 회신" ||
            data.status === "회신 대기"
        );
      } else {
        return [];
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/variables.scss";

.boardContainer {
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
  width: 90%;

  .board {
    width: 25%;
  }

  .summaryBoard {
    width: 20%;
  }
}
</style>
