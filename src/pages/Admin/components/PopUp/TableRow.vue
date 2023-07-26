<template>
  <div class="tableRow">
    <div class="additional">
      <select
        class="form-select form-select-sm"
        aria-label=".form-select-sm example"
        v-model="selected"
      >
        <option disabled value="">지원 요청</option>
        <option value="영업">영업</option>
        <option value="기술">기술</option>
      </select>
    </div>
    <div class="popupDepartment">
      <select
        class="form-select form-select-sm"
        aria-label=".form-select-sm example"
      >
        <option value="영업">영업</option>
        <option value="기술">기술</option>
      </select>
    </div>
    <div class="startDate">2023.07.12</div>
    <div class="endDate">캘린더</div>
    <div class="status">
      <select
        class="form-select form-select-sm"
        aria-label=".form-select-sm example"
      >
        <option value="진행중">일정 진행중</option>
        <option value="지연">일정 지연</option>
        <option value="완료">완료</option>
      </select>
    </div>
    <div class="summary">
      <input
        type="text"
        v-if="!isEntered"
        name="summary"
        @keyup.enter="submitSummary()"
        v-model="summary"
        placeholder="작성 후 Enter키로 저장"
      />
      <div v-else>
        <div>
          {{ summary
          }}<button class="editBtn" @click="editSummary()">수정</button>
        </div>
      </div>
    </div>
    <div class="detailTd">
      <div class="overFlow">
        {{ this.cardData.manager_comments }}
      </div>
      <button @click="showDetail()" class="detailBtn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          fill="currentColor"
          class="bi bi-caret-down-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
          />
        </svg>
      </button>
    </div>
  </div>
  <div v-if="isDisplayed" class="manager">
    <div id="content" class="managerComment" contenteditable="true" colspan="7">
      {{ this.cardData.manager_comments }}
      <svg
        id="handleCommentBtn"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="primaryColor"
        class="bi bi-check-circle-fill"
        viewBox="0 0 16 16"
        @click="isSubmit(), saveComment(), putComments()"
      >
        <path
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TableRow",

  data() {
    return {
      isDisplayed: false,
      summary: "",
      isEntered: false,
      data: {},
      submit: false,
    };
  },
  props: {
    cardData: Object,
  },

  methods: {
    showDetail() {
      this.isDisplayed = !this.isDisplayed;
    },
    submitSummary() {
      const text = event.target.value;
      this.summary == text;
      this.isEntered = !this.isEntered;
    },

    editSummary() {
      this.isEntered = !this.isEntered;
    },
    isSubmit() {
      return (this.submit = true);
    },
    saveComment() {
      this.handleContent(); //managerText
      this.handleCommentDate(); //managerDate

      if (this.managerText === "") {
        this.managerComments = "";
      }
      if (
        (this.cardData.manager_comments.includes("[") ||
          this.cardData.manager_comments.includes("]")) &&
        this.cardData.manager_comments !== this.managerText
      ) {
        this.managerComments = this.managerDate + this.managerText.substring(7);

        return this.managerComments;
      }
      if (this.cardData.manager_comments === this.managerText) {
        this.managerComments = this.cardData.manager_comments;

        return this.managerComments;
      }
      if (
        !this.cardData.manager_comments ||
        this.cardData.manager_comments === "None"
      ) {
        return (this.managerComments = this.managerDate + this.managerText);
      }

      return this.managerComments;
    },

    putComments() {
      const api = axios.create({
        baseURL: "http://110.165.17.239:8000",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = {
        contact_seq: `${this.dataSeq}`,
        status: `${this.cardData.status}`,
        department: `${this.cardData.department}`,
        manager_comments: `${this.managerComments}`,
      };

      api
        .put("/api/contact", data)
        .then((response) => {
          this.data = response;
          this.getCardData();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleContent() {
      const text = document.getElementById("content");

      return (this.managerText = text.innerText);
    },

    handleCommentDate() {
      let now = new Date();
      let month = now.getMonth() + 1;
      let date = now.getDate();

      return (this.managerDate = "[" + month + ". " + date + "]");
    },
  },

  computed: {},
};
</script>

<style lang="scss">
@import "../../../../assets/scss/variables.scss";

.tableRow {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  border-top: 2.5px solid white;
  border-bottom: 2.5px solid white;
  padding: 0 8px;

  .additional {
    width: 15%;
  }

  .popupDepartment {
    width: 15%;
  }

  .startDate {
    width: 10%;
  }
  .endDate {
    width: 10%;
  }

  .status {
    width: 15%;
  }

  .summary {
    width: 20%;

    input {
      width: 90%;
      background-color: #fff;
      border: 1px solid #dee2e6;
    }

    .editBtn {
      border: none;
      background-color: $blue;
      color: white;
      margin-left: 10px;
      border-radius: 5px;
    }
  }

  .detailTd {
    width: 10%;
    display: flex;
    justify-content: space-around;
    align-content: center;

    .overFlow {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      align-items: center;
    }

    .detailBtn {
      border: none;
    }
  }
}
</style>
