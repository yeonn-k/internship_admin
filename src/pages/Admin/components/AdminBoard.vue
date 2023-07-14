<template>
  <div class="adminBoard">
    <PopUp
      v-if="isOpened === true"
      @ClosePopup="isOpened = false"
      :dataId="dataId"
      :filteredData="filteredData"
    />
    <div class="boardHeader">
      <div class="boardInfo">
        <h1 class="boardTitle">{{ title }}</h1>
        <span class="boardLength">{{ dataLists.length }}건</span>
      </div>
      <div v-if="title !== 'Done'" class="selectBox">
        <select
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          @click="setFilter()"
        >
          <option selected>전체 보기</option>
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
          v-for="num in pageCount"
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
    <div class="cardContainer">
      <draggable
        v-model="dataLists"
        class="list-group"
        group="board"
        item-key="id"
        animation="500"
      >
        <template #item="{ element }">
          <CardComponent
            class="list-group-item"
            :data="element"
            @openPopup="isOpened = true"
            @sendId="getDataId"
            @click="filterId"
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
      progress: ["회신중", "회신 대기", "추가 회신"],
      filteredData: [],
      isOpened: false,
      pageNumber: 0,
      size: 3,
      dataLists: this.dataArray.slice(this.pageNumber, this.size),
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
      switch (filter) {
        case "최신순":
          return (this.dataLists = this.filteredData.sort(
            (a, b) => b.createAt - a.createAt
          ));
        case "오래된순":
          return (this.dataLists = this.filteredData.sort(
            (a, b) => a.createAt - b.createAt
          ));
        case "회신중":
        case "추가 회신":
        case "회신 대기":
          return (this.dataLists = this.filteredData.filter(
            (data) => data.status === filter
          ));
        default:
          return (this.dataLists = this.dataArray);
      }
    },

    getDataId(data) {
      this.dataId = data.dataId;
    },

    filterId() {
      this.filteredData = this.contactDatas.filter(
        (data) => data.id === this.dataId
      );
    },

    nextPage() {
      if (this.pageNumber == this.pageCount - 1) {
        return;
      } else {
        this.pageNumber++;
        this.updateDataLists();
      }
    },

    prevPage() {
      if (this.pageNumber > 0) {
        this.pageNumber--;
        this.updateDataLists();
      } else {
        return;
      }
    },

    setPageNumber(number) {
      this.pageNumber = number;
      this.updateDataLists();
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
  },

  computed: {
    items() {
      if (this.title === "Backlog") {
        return this.backlogs;
      } else if (this.title === "Progress") {
        return this.progress;
      } else {
        return [];
      }
    },

    pageCount() {
      let length = this.dataArray.length,
        size = this.size;
      return Math.ceil(length / size);
    },

    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.dataLists.slice(start, end);
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
</style>
