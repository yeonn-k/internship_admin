<template>
  <div :class="['card', cardBorder]" @click="$emit('openPopup', sendId())">
    <div class="card-body">
      <header class="cardHeader">
        <h5 class="card-title">{{ data.contact_type }}</h5>
        <div v-if="!cardStatus()" :class="[dueDateCheck]">
          D+<span @click="check">{{ this.passedDate }}</span>
        </div>
      </header>
      <div class="labelWrapper">
        <span :class="['badge', badgeBorder]">{{ data.status }}</span>
        <h6 class="card-subtitle">
          등록일자 {{ data.create_dtm.substring(2, 10) }}
        </h6>
      </div>
      <div class="categoryContainer">
        <div class="contactCategory">
          <p class="categoryTitle">이름</p>
          <p class="categoryValue">{{ data.user_name }}</p>
        </div>
        <div class="contactCategory">
          <p class="categoryTitle">연락처</p>
          <p class="categoryValue">{{ data.contact }}</p>
        </div>
      </div>
      <div class="inChargeInfo">
        <p class="department">담당부서</p>
        <div v-if="labelCheck"><div></div></div>
        <div
          v-else
          class="departmentBadge"
          :class="[labelBorder(item)]"
          v-for="(item, index) in labelData"
          :key="index"
        >
          {{ item }}
          <button
            type="button"
            class="btn-close"
            @click.stop="deleteItem(data.contact_seq, item)"
          ></button>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          fill="currentColor"
          class="bi bi-caret-down-fill"
          viewBox="0 0 16 16"
          @click.stop="showDropdown"
        >
          <path
            d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
          />
        </svg>
      </div>
      <div class="selectContainer" v-show="isClicked === true" @click.stop>
        <select
          class="form-select form-select-sm"
          aria-label=".form-select-sm example"
          v-model="selected"
          @change="addArray(data.contact_seq, selected)"
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
const date = new Date().toISOString();

export default {
  name: "CardComponent",

  props: { data: Object, componentKey: Number },

  data() {
    return {
      selected: null,
      isClicked: false,
      array: [],
      cardData: this.data,
      today: date,
      departmentData: this.data.department.split(","),
    };
  },
  watch: {
    departmentData: {
      handler() {
        this.labelData;
      },
      immediate: true,
    },
    data: {
      handler() {
        this.labelData;
      },
      immediate: true,
    },
  },
  methods: {
    submitDepartment(seq, department) {
      if (Object.values(this.departmentData).indexOf(department) == -1) {
        if (Object.values(this.departmentData)[0] === "") {
          fetch(`http://110.165.17.239:8000/api/contact`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contact_seq: seq,
              status: this.cardData.status,
              department: department,
              manager_comments: this.cardData.manager_comments,
            }),
          }).then(() => {
            fetch(`http://110.165.17.239:8000/api/contact/${seq}`)
              .then((res) => res.json())
              .then((data) => {
                this.departmentData = data.department.split(",");
              });
          });
        } else if (Object.values(this.departmentData)[0] !== "") {
          const newDepartment =
            Object.values(this.departmentData)[0] + "," + department;
          fetch(`http://110.165.17.239:8000/api/contact`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contact_seq: seq,
              status: this.cardData.status,
              department: newDepartment,
              manager_comments: this.cardData.manager_comments,
            }),
          }).then(() => {
            fetch(`http://110.165.17.239:8000/api/contact/${seq}`)
              .then((res) => res.json())
              .then((data) => {
                this.departmentData = data.department.split(",");
              });
          });
        }
      } else {
        return;
      }
    },
    cardStatus() {
      if (
        this.data.status === "문의 완료" ||
        this.data.status === "미팅 확정"
      ) {
        return true;
      } else {
        return false;
      }
    },

    showDropdown() {
      this.isClicked = !this.isClicked;
    },

    addArray(seq, selected) {
      if (this.array.indexOf(selected) == -1) {
        this.array.push(selected);
        this.submitDepartment(seq, selected);
        this.selected = null;
      } else {
        return this.array;
      }
    },

    deleteItem(seq, department) {
      const newDepartment = Object.values(this.departmentData).filter(
        (item) => item !== department && item !== ""
      );
      fetch(`http://110.165.17.239:8000/api/contact`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact_seq: seq,
          status: this.cardData.status,
          department: newDepartment.join(),
          manager_comments: this.cardData.manager_comments,
        }),
      }).then(() => {
        fetch(`http://110.165.17.239:8000/api/contact/${seq}`)
          .then((res) => res.json())
          .then((data) => {
            this.departmentData = data.department.split(",");
          });
      });
    },

    labelBorder(item) {
      if (item == "기술") {
        return "label-green";
      } else if (item == "영업") {
        return "label-blue";
      } else {
        return "label-blue";
      }
    },

    sendId() {
      this.$emit("sendSeq", { dataSeq: this.data.contact_seq });
    },
  },

  computed: {
    cardBorder() {
      if (this.data.contact_type === "MR 문의") {
        return "border-green";
      } else if (this.data.contact_type === "컨설팅 문의") {
        return "border-blue";
      } else {
        return "border-red";
      }
    },

    badgeBorder() {
      if (this.data.status === "회신 완료") {
        return "badge-blue";
      } else if (this.data.status === "회신 작업중") {
        return "badge-green";
      } else if (this.data.status === "추가 회신") {
        return "badge-yellow";
      } else if (this.data.status === "진행") {
        return "badge-green";
      } else {
        return "badge-red";
      }
    },
    passedDate() {
      return (
        Math.floor(
          (new Date(this.today).getTime() -
            new Date(this.data.create_dtm).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1
      );
    },
    dueDateCheck() {
      if (this.passedDate >= 14) {
        return "alert";
      } else {
        return "";
      }
    },
    labelData() {
      if (this.departmentData.length !== 0) {
        return Object.values(this.departmentData);
      } else {
        return false;
      }
    },
    labelCheck() {
      if (this.departmentData[0]["0"] !== undefined) {
        return false;
      } else {
        return true;
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
  border-top-width: 4px;
  border-bottom-width: 0px;
  border-right-width: 0px;
  border-left-width: 0px;

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
  font-size: 1rem;

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
}

.labelWrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin-bottom: 5px;

  .card-subtitle {
    text-align: end;
    width: 100%;
    margin: 0;
    font-size: 0.9rem;
  }
}

.categoryContainer {
  width: 100%;
  text-align: center;
  margin: 10px 0 5px;

  .contactCategory {
    display: flex;
    gap: 5px;
    margin: 3px 0;

    .categoryTitle {
      font-weight: 600;
      margin: 0;
    }

    .categoryValue {
      margin: 0;
    }
  }
}

.inChargeInfo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid $lightGrey;

  .department {
    font-weight: 600;
    margin-bottom: 0px;
  }

  svg {
    padding: 2px;
  }

  .departmentBadge {
    display: flex;
    align-items: center;
    padding: 3px 6px;
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

.alert {
  padding: 0;
  color: red;
  font-weight: bold;
}
</style>
