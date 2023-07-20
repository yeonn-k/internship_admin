<template>
  <div class="boardContainer" @openPopup="isOpened = true">
    <SummaryBoard class="summaryBoard" @searchedValue="receiveSearch" />

    <AdminBoard
      ref="adminBoard"
      class="board"
      title="Backlog"
      :dataArray="filteredBacklogDatas"
      :contactDatas="contactDatas"
      @departmentUpdated="fetchContactData"
    />
    <AdminBoard
      class="board"
      title="Progress"
      :dataArray="filteredProgressDatas"
      :contactDatas="contactDatas"
      @departmentUpdated="fetchContactData"
    />
    <!-- @fetchAll="fetchContactData" -->

    <AdminBoard
      class="board"
      title="Done"
      :dataArray="filteredDoneDatas"
      :contactDatas="contactDatas"
      @departmentUpdated="fetchContactData"
    />

    {{ console.log(contactArray) }}
  </div>
</template>

<script>
import AdminBoard from "./components/AdminBoard.vue";
import SummaryBoard from "./components/SummaryBoard.vue";
import PopUp from "./components/PopUp/PopUp.vue";

export default {
  name: "AdminVue",

  components: {
    AdminBoard,
    SummaryBoard,
    // PopUp,
  },

  data() {
    return {
      contactArray: [],

      searchValue: "",
    };
  },
  watch: {
    contactArray: {
      handler() {
        this.filteredBacklogDatas;
        this.filteredProgressDatas;
        this.filteredDoneDatas;
      },
      immediate: true,
    },
  },
  methods: {
    fetchContactData() {
      fetch(`http://110.165.17.239:8000/api/contactlist`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.contactArray = data;
        });
    },

    receiveSearch(searchValue) {
      this.searchValue = searchValue;
    },
  },

  computed: {
    filteredBacklogDatas() {
      return this.contactArray.filter(
        (data) =>
          (data.user_name.includes(this.searchValue) ||
            data.contact_type.includes(this.searchValue)) &&
          data.status === ""
      );
    },
    filteredProgressDatas() {
      return this.contactArray.filter(
        (data) =>
          ((data.user_name.includes(this.searchValue) ||
            data.contact_type.includes(this.searchValue)) &&
            data.status === "진행") ||
          data.status === "회신 작업중" ||
          data.status === "추가 회신" ||
          data.status === "회신 완료"
      );
    },
    filteredDoneDatas() {
      return this.contactArray.filter(
        (data) =>
          data.status === "문의 완료" ||
          (data.status === "미팅 확정" &&
            (data.user_name.includes(this.searchValue) ||
              data.contact_type.includes(this.searchValue)))
      );
    },
  },
  mounted() {
    this.fetchContactData();
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
