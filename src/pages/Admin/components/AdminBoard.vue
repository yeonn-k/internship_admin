<template>
  <div class="adminBoard">
    <PopUp
      v-if="isOpened === true"
      @closePopup="closePopup"
      :dataSeq="dataSeq"
    />
    <div class="boardHeader">
      <div class="boardInfo">
        <h1 class="boardTitle">{{ title }}</h1>
        <span v-if="newDataArray.length !== 0" class="boardLength"
          >{{ newDataArray.length }}건</span
        >
        <span v-else class="boardLength">{{ dataArray.length }}건</span>
      </div>
      <div class="selectBox">
        <select
          v-if="title != 'Done'"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          @click="setFilter()"
        >
          <option selected>전체 보기</option>
          <option v-for="item in items" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
        <select
          v-if="title == 'Done'"
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          @click="setFilter()"
        >
          <option selected>최근 7일</option>
          <option v-for="item in items" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>
    </div>
    <div class="pagination">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-caret-left-fill"
        viewBox="0 0 16 16"
        @click="prevPage"
      >
        <path
          d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"
        />
      </svg>
      <ul>
        <button
          v-for="num in displayPageNumbers"
          :key="num"
          @click="setPageNumber(num - 1)"
          :class="['pageBtn', setIndex(num)]"
        >
          {{ num }}
        </button>
      </ul>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-caret-right-fill"
        viewBox="0 0 16 16"
        @click="nextPage"
      >
        <path
          d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
        />
      </svg>
    </div>
    <div v-if="dataLists.length == 0" class="cardContainer">
      <p class="alertMessage">등록된 문의가 없습니다.</p>
    </div>
    <div v-else class="cardContainer">
      <draggable
        v-model="dataLists"
        class="list-group"
        group="board"
        :id="this.title"
        :item-key="this.title"
        animation="500"
        :move="restrictMove"
      >
        <template #item="{ element }">
          <CardComponent
            class="list-group-item"
            :data="element"
            @departmentUpdated="$emit('departmentUpdated')"
            @openPopup="isOpened = true"
            @sendSeq="getDataSeq"
          ></CardComponent>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import CardComponent from "./CardComponent.vue";
import draggable from "vuedraggable";
import PopUp from "./PopUp/PopUp.vue";

const date = new Date().toISOString();

export default {
  name: "AdminBoard",

  props: {
    title: String,
    dataArray: Array,
    contactDatas: Array,
  },
  components: { CardComponent, draggable, PopUp },
  data() {
    return {
      backlogs: ["최신순", "오래된순"],
      progress: [
        "등록 최신순",
        "등록 오래된순",
        "업데이트 최신순",
        "업데이트 오래된순",
      ],
      done: ["최근 30일"],
      filteredData: [],
      isOpened: false,
      pageNumber: 0,
      size: 4,
      filterLists: this.dataArray,
      dataLists: [{}, ...this.dataArray.slice(this.pageNumber, this.size)],
      today: date,
      isClicked: false,
      newDataArray: [],
    };
  },
  watch: {
    dataArray: {
      handler() {
        this.updateDataLists();
      },
      immediate: true,
    },
  },
  methods: {
    setFilter() {
      const filter = event.target.value;
      this.filteredData = [...this.dataArray];
      this.isClicked = true;
      switch (filter) {
        case "최신순":
        case "등록 최신순":
          this.newDataArray = this.filteredData.sort(
            (a, b) => new Date(b.create_dtm) - new Date(a.create_dtm)
          );
          return (this.dataLists = this.newDataArray.slice(
            this.pageNumber * this.size,
            this.pageNumber * this.size + this.size
          ));
        case "오래된순":
        case "등록 오래된순":
          this.newDataArray = this.filteredData.sort(
            (a, b) => new Date(a.create_dtm) - new Date(b.create_dtm)
          );
          return (this.dataLists = this.newDataArray.slice(
            this.pageNumber * this.size,
            this.pageNumber * this.size + this.size
          ));
        //        case "검색 기간":
        case "최근 7일":
          this.newDataArray = this.filteredData.filter(
            (item) =>
              this.dateFormat(item.create_dtm) > this.dateFormat(this.today) - 7
          );
          return (this.dataLists = this.newDataArray.slice(
            this.pageNumber * this.size,
            this.pageNumber * this.size + this.size
          ));
        case "최근 30일":
          this.newDataArray = this.filteredData.filter(
            (item) =>
              this.dateFormat(item.create_dtm) >
              this.dateFormat(this.today) - 30
          );
          return (this.dataLists = this.newDataArray.slice(
            this.pageNumber * this.size,
            this.pageNumber * this.size + this.size
          ));
        case "업데이트 최신순":
          this.newDataArray = this.filteredData.sort(
            (a, b) => new Date(b.update_dtm) - new Date(a.update_dtm)
          );
          return (this.dataLists = this.newDataArray.slice(
            this.pageNumber * this.size,
            this.pageNumber * this.size + this.size
          ));
        case "업데이트 오래된순":
          this.newDataArray = this.filteredData.sort(
            (a, b) => new Date(a.update_dtm) - new Date(b.update_dtm)
          );
          return (this.dataLists = this.newDataArray.slice(
            this.pageNumber * this.size,
            this.pageNumber * this.size + this.size
          ));
        case "전체 보기":
          this.$emit("departmentUpdated");
          this.newDataArray = this.dataArray;
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

    getDataSeq(data) {
      this.dataSeq = data.dataSeq;
    },

    closePopup() {
      this.isOpened = false;
    },

    nextPage() {
      if (this.pageNumber == this.pageCount - 1) {
        return;
      } else {
        if (this.isClicked == true) {
          this.pageNumber++;
          const start = this.pageNumber * this.size;
          this.dataLists = this.newDataArray.slice(start, start + this.size);
        } else {
          this.pageNumber++;
          this.updateDataLists();
        }
      }
    },

    prevPage() {
      if (this.pageNumber > 0) {
        if (this.isClicked == true) {
          this.pageNumber--;
          const start = this.pageNumber * this.size;
          this.dataLists = this.newDataArray.slice(start, start + this.size);
        } else {
          this.pageNumber--;
          this.updateDataLists();
        }
      } else {
        return;
      }
    },

    setPageNumber(number) {
      this.pageNumber = number;
      if (this.isClicked == true) {
        const start = this.pageNumber * this.size;
        this.dataLists = this.newDataArray.slice(start, start + this.size);
      } else {
        this.updateDataLists();
      }
    },

    setIndex(page) {
      if (page === this.pageNumber + 1) {
        return "active";
      } else {
        return;
      }
    },
    updateDataLists() {
      const start = this.pageNumber * this.size;
      this.dataLists = this.dataArray.slice(start, start + this.size);
    },

    restrictMove(event) {
      if (event.from.id === "Progress" && event.to.id == "Backlog") {
        return false;
      } else if (event.from.id === "Done" && event.to.id == "Backlog") {
        return false;
      } else if (event.from.id === "Backlog" && event.to.id == "Progress") {
        fetch(`http://110.165.17.239:8000/api/contact`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contact_seq: event.draggedContext.element.contact_seq,
            status: "진행",
            department: event.draggedContext.element.department,
            manager_comments: event.draggedContext.manager_comments,
          }),
        }).then(() => {
          this.$emit("departmentUpdated");
        });
      } else if (event.from.id === "Progress" && event.to.id == "Done") {
        fetch(`http://110.165.17.239:8000/api/contact`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contact_seq: event.draggedContext.element.contact_seq,
            status: "문의 완료",
            department: event.draggedContext.element.department,
            manager_comments: event.draggedContext.manager_comments,
          }),
        }).then(() => {
          this.$emit("departmentUpdated");
        });
      } else if (event.from.id === "Done" && event.to.id == "Progress") {
        fetch(`http://110.165.17.239:8000/api/contact`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contact_seq: event.draggedContext.element.contact_seq,
            status: "진행",
            department: event.draggedContext.element.department,
            manager_comments: event.draggedContext.manager_comments,
          }),
        }).then(() => {
          this.$emit("departmentUpdated");
        });
      }
    },
  },

  computed: {
    items() {
      if (this.title === "Backlog") {
        return this.backlogs;
      } else if (this.title === "Progress") {
        return this.progress;
      } else if (this.title === "Done") {
        return this.done;
      } else {
        return [];
      }
    },

    pageCount() {
      if (this.isClicked == true) {
        let length = this.newDataArray.length,
          size = this.size;
        return Math.ceil(length / size);
      } else {
        let length = this.dataArray.length,
          size = this.size;
        return Math.ceil(length / size);
      }
    },

    displayPageNumbers() {
      const currentPage = this.pageNumber + 1;
      const pageRange = 10;

      let startPage = currentPage - Math.floor(pageRange / 2);
      let endPage = currentPage + Math.floor(pageRange / 2);

      if (startPage < 1) {
        startPage = 1;
        endPage = Math.min(startPage + pageRange - 1, this.pageCount);
      } else if (endPage > this.pageCount) {
        endPage = this.pageCount;
        startPage = Math.max(endPage - pageRange + 1, 1);
      }

      return Array(endPage - startPage + 1)
        .fill()
        .map((num, index) => startPage + index);
    },
  },
  mounted() {
    this.updateDataLists();
  },
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/variables.scss";

.adminBoard {
  background-color: $lightGrey;
  border-radius: 5px;
  font-family: $fontFamily;

  .boardHeader {
    display: flex;
    align-items: center;
    font-size: 1rem;
    justify-content: space-around;
    margin: 20px 0px;

    .boardInfo {
      display: flex;
      gap: 8px;

      .boardTitle {
        font-size: 1.5rem;
        font-weight: 900;
        margin-bottom: 0px;
      }

      .boardLength {
        align-self: flex-end;
      }
    }

    .form-select {
      width: 110px;
    }
  }
}

.pagination {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;

  .pageBtn {
    padding: 0 5px;
    border: none;

    &.active {
      font-weight: bold;
      color: red;
    }
  }

  svg {
    padding: 0;
  }

  ul {
    padding: 0;
    display: flex;
    align-items: center;
  }
}
.ghost {
  display: none;
}

.alertMessage {
  display: flex;
  justify-content: center;
  margin-top: 30%;
}
</style>
