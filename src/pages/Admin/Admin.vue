<template>
  <div class="boardContainer" @openPopup="isOpened = true">
    <SummaryBoard class="summaryBoard" />
    <AdminBoard
      class="board"
      title="Backlog"
      :dataArray="filteredDatas('Backlog')"
      :contactDatas="contactDatas"
    />
    <AdminBoard
      class="board"
      title="Progress"
      :dataArray="filteredDatas('Progress')"
      :contactDatas="contactDatas"
    />
    <AdminBoard
      class="board"
      title="Done"
      :dataArray="filteredDatas('Done')"
      :contactDatas="contactDatas"
    />
  </div>
  <PopUp v-if="isOpened === true" />
</template>

<script>
import AdminBoard from "./components/AdminBoard.vue";
import SummaryBoard from "./components/SummaryBoard.vue";
import PopUp from "./components/PopUp/PopUp.vue";
import data from "../../assets/contact.json";
const contactDatas = data;

export default {
  name: "AdminVue",
  components: {
    AdminBoard,
    SummaryBoard,
    PopUp,
  },
  data() {
    return {
      contactDatas,
      isOpened: false,
    };
  },
  methods: {
    filteredDatas(title) {
      if (title === "Backlog") {
        return this.contactDatas.filter((data) => data.status === "회신 대기");
      } else if (title === "Done") {
        return this.contactDatas.filter((data) => data.status === "회신 완료");
      } else if (title === "Progress") {
        return this.contactDatas.filter(
          (data) => data.status === "회신중" || data.status === "추가 회신"
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
