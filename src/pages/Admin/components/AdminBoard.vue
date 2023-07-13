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
        >
          <option selected>정렬 필터</option>
          <option v-for="item in items" :key="item" value="영업">
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
      progress: ["회신 대기", "회신중", "추가 회신", "미팅 확정"],
      dataLists: this.dataArray,
      isOpened: false,
    };
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
  methods: {
    getDataId(data) {
      this.dataId = data.dataId;
    },
    filterId() {
      this.filteredData = this.contactDatas.filter(
        (data) => data.id === this.dataId
      );
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
    justify-content: center;
    margin: 20px 0px;

    .boardInfo {
      display: flex;
      gap: 8px;
      margin-right: 10px;

      .boardTitle {
        font-size: 1.5rem;
        font-weight: 900;
      }

      .boardLength {
        align-self: flex-end;
      }
    }

    .form-select {
      width: 110px;
    }
  }
  .list-group-item {
    border-top-width: 3px;
  }
}
</style>
