<template>
  <div class="summaryBoard">
    <h1 class="boardTitle">Summary</h1>
    <div class="totalSummary">
      <div>총 회신:</div>
      <div>
        <span class="number">{{ summaryData.length }}</span>
        건
      </div>
    </div>
    <div class="searchContainer">
      <div>문의 검색</div>
      <input
        class="searchBar"
        type="text"
        :value="searchValue"
        @input="checkValue"
        placeholder="이름/문의 유형으로 검색"
      />
    </div>
    <div class="dataContainer">
      <SummaryData type="status" :data="filteredData('status')" />
      <SummaryData type="type" :data="filteredData('type')" />
    </div>
  </div>
</template>

<script>
import SummaryData from "./SummaryData.vue";

export default {
  name: "SummaryBoard",

  components: {
    SummaryData,
  },

  data() {
    return {
      searchValue: "",
      summaryData: [],
    };
  },
  mounted() {
    this.fetchSummaryData();
  },
  methods: {
    fetchSummaryData() {
      fetch(`http://110.165.17.239:8000/api/contactlist`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          this.summaryData = data;
        });
    },

    filteredData(type) {
      if (type === "status") {
        return this.summaryData.map((data) => data.status);
      } else if (type === "type") {
        return this.summaryData.map((data) => data.contact_type);
      } else {
        return [];
      }
    },
    checkValue() {
      this.searchValue = event.target.value;
      this.$emit("searchedValue", this.searchValue);
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/variables.scss";

.summaryBoard {
  height: 100%;
  background-color: $lightGrey;
  border-radius: 5px;
  font-family: $fontFamily;
  padding-bottom: 10px;

  .boardTitle {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    font-size: 1.5rem;
    font-weight: 900;
  }

  .totalSummary {
    background-color: #ffffff;
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    height: 20px;
    border-radius: 5px;
    font-weight: 900;
    height: 40px;

    .number {
      font-weight: 900;
      color: $primaryColor;
    }
  }
  .searchContainer {
    font-family: $fontFamily;
    font-weight: 900;
    margin: 10px auto;
    padding: 5px 0;
    background-color: #ffffff;
    width: 80%;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .searchBar {
      width: 90%;
    }
  }
}
</style>
