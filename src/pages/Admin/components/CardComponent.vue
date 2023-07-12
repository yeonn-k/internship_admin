<template>
  <div :class="['card', cardBorder]">
    <div class="card-body">
      <header class="cardHeader">
        <h5 class="card-title">{{ data.type }}</h5>
        <h6 class="card-subtitle">등록일자 {{ data.createAt }}</h6>
      </header>
      <span :class="['badge', badgeBorder]">{{ data.status }}</span>
      <div class="categoryContainer">
        <div class="contactCategory">
          <p class="categoryTitle">이름</p>
          <p class="categoryValue">{{ data.name }}</p>
        </div>
        <div class="contactCategory">
          <p class="categoryTitle">연락처</p>
          <p class="categoryValue">{{ data.contact }}</p>
        </div>
      </div>
      <hr />
      <div class="inChargeInfo">
        <p class="department">담당부서</p>
        <div
          v-for="(item, index) in array"
          :key="index"
          class="departmentBadge"
          :class="[labelBorder(item)]"
        >
          {{ item }}
          <button
            type="button"
            class="btn-close"
            @click="deleteItem(item)"
          ></button>
        </div>
        <button @click="showDropdown">...</button>
      </div>
      <div class="selectContainer" v-show="isClicked === true">
        <select
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="selected"
          @change="addArray(selected)"
        >
          <option disabled>부서 선택</option>
          <option value="영업">영업</option>
          <option value="기술">기술</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardComponent",
  props: { data: Object },
  data() {
    return { selected: null, isClicked: false, array: [] };
  },
  methods: {
    showDropdown() {
      this.isClicked = !this.isClicked;
    },
    addArray(selected) {
      if (this.array.indexOf(selected) == -1) {
        this.array.push(selected);
        this.selected = null;
      } else {
        return this.array;
      }
    },
    deleteItem(item) {
      this.array = this.array.filter((data) => data !== item);
      this.selected = null;
    },
    labelBorder(item) {
      if (item == "기술") {
        return "label-green";
      } else if (item == "영업") {
        return "label-yellow";
      } else {
        return "label-blue";
      }
    },
  },
  computed: {
    cardBorder() {
      if (this.data.type === "MR 문의") {
        return "border-green";
      } else if (this.data.type === "컨설팅 문의") {
        return "border-blue";
      } else {
        return "border-red";
      }
    },
    badgeBorder() {
      if (this.data.status === "회신 대기") {
        return "badge-blue";
      } else if (this.data.status === "회신중") {
        return "badge-green";
      } else if (this.data.status === "추가 회신") {
        return "badge-yellow";
      } else {
        return "badge-red";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../assets/scss/variables.scss";

.card {
  width: 90%;
  margin: 10px auto;
  border-width: 3px;

  &.border-green {
    border-color: $green;
  }

  &.border-red {
    border-color: $red;
  }

  &.border-blue {
    border-color: $blue;
  }
}

.badge {
  color: black;

  &.badge-green {
    background-color: $lightGreen;
  }

  &.badge-red {
    background-color: $red;
  }

  &.badge-yellow {
    background-color: $yellow;
  }

  &.badge-blue {
    background-color: $lightBlue;
  }
}

.cardHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin-bottom: 5px;

  .card-title {
    font-weight: 600;
    margin: 0;
    width: 100%;
    font-size: 1rem;
  }

  .card-subtitle {
    text-align: end;
    width: 100%;
    margin: 0;
    font-size: s 0.9rem;
  }
}

.categoryContainer {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  text-align: center;

  .contactCategory {
    display: flex;
    flex-direction: column;
    margin: 15px 0;
    gap: 5px;

    .categoryTitle {
      font-weight: 600;
      margin: 0;
    }
  }
}

.inChargeInfo {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .department {
    font-weight: 600;
  }

  .departmentBadge {
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: 3px;
    font-size: 1rem;
    background-color: $lightGrey;

    &.label-green {
      background-color: $lightGreen;
    }

    &.label-yellow {
      background-color: $yellow;
    }

    &.label-blue {
      background-color: $lightBlue;
    }
    .btn-close {
      width: 6px;
      height: 6px;
      margin-left: 10px;
    }
  }

  .form-select {
    width: 60%;
  }
}

button {
  border: none;
  background-color: transparent;
}

.selectContainer {
  margin-top: 7px;
}
</style>
