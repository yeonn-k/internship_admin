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
      <div v-if="title != 'Done'" class="selectBox">
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
      dataLists: this.dataArray,
      filteredData: [],
      isOpened: false,
    };
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
</style>
