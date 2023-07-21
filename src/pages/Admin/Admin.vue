<template>
  <div class="boardContainer" @openPopup="isOpened = true">
    <SummaryBoard class="summaryBoard" @searchedValue="receiveSearch" />

    <AdminBoard
      ref="adminBoard"
      class="board"
      title="Backlog"
      :dataArray="filteredBacklogDatas"
      :contactDatas="contactDatas"
      @departmentUpdated="fetchContactData()"
      @filtered="setFilter()"
    />
    <AdminBoard
      class="board"
      title="Progress"
      :dataArray="filteredProgressDatas"
      :contactDatas="contactDatas"
      @departmentUpdated="fetchContactData()"
      @filtered="setFilter()"
    />

    <AdminBoard
      class="board"
      title="Done"
      :dataArray="filteredDoneDatas"
      :contactDatas="contactDatas"
      @departmentUpdated="fetchContactData()"
      @filtered="setFilter()"
    />
  </div>
</template>

<script>
import AdminBoard from "./components/AdminBoard.vue";
import SummaryBoard from "./components/SummaryBoard.vue";

export default {
  name: "AdminVue",

  components: {
    AdminBoard,
    SummaryBoard,
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

    setFilter() {
      const filter = event.target.value;

      switch (filter) {
        case "최신순":
          return (this.dataLists = this.filteredData.sort(
            (a, b) => new Date(b.create_dtm) - new Date(a.create_dtm)
          ));
        case "등록 최신순":
          return (this.dataLists = this.filteredData.sort(
            (a, b) => new Date(b.create_dtm) - new Date(a.create_dtm)
          ));
        case "오래된순":
          return (this.dataLists = this.filteredData.sort(
            (a, b) => new Date(a.create_dtm) - new Date(b.create_dtm)
          ));
        case "등록 오래된순":
          return (this.dataLists = this.filteredData.sort(
            (a, b) => new Date(a.create_dtm) - new Date(b.create_dtm)
          ));
        case "최근 7일":
          return (this.dataLists = this.filteredData.filter(
            (item) =>
              this.dateFormat(item.create_dtm) > this.dateFormat(this.today) - 7
          ));
        case "최근 30일": {
          return (this.dataLists = this.filteredData.filter(
            (item) =>
              this.dateFormat(item.create_dtm) >
              this.dateFormat(this.today) - 30
          ));
        }
        case "업데이트 최신순":
          return (this.dataLists = this.filteredData.sort(
            (a, b) => new Date(b.update_dtm) - new Date(a.update_dtm)
          ));
        case "업데이트 오래된순":
          return (this.dataLists = this.filteredData.sort(
            (a, b) => new Date(a.update_dtm) - new Date(b.update_dtm)
          ));
        case "전체 보기":
          this.$emit("departmentUpdated");
          return (this.dataLists = this.dataArray);
        default:
          return (this.dataLists = this.dataArray);
      }
    },

    dateFormat(date) {
      return (
        date.substring(2, 4) + date.substring(5, 7) + date.substring(8, 10)
      );
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
          (data.user_name.includes(this.searchValue) ||
            data.contact_type.includes(this.searchValue)) &&
          (data.status === "진행" ||
            data.status === "회신 작업중" ||
            data.status === "추가 회신" ||
            data.status === "회신 완료")
      );
    },
    filteredDoneDatas() {
      return this.contactArray.filter(
        (data) =>
          (data.user_name.includes(this.searchValue) ||
            data.contact_type.includes(this.searchValue)) &&
          (data.status === "문의 완료" || data.status === "미팅 확정")
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
