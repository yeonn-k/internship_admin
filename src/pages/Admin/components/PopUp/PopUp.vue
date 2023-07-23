<template>
  <div class="blackBg" v-if="cardData" @click="$emit('closePopup')">
    <!-- event bubbling 방지 -->
    <div class="popupWhiteBg" @click.stop>
      <div class="content">
        <div>
          <!-- 카드 유형 칼라 변경 -->
          <div :class="['colorBox', cardType]">
            <div class="Xbox">
              <svg
                @click="$emit('closePopup')"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                class="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                />
              </svg>
            </div>
          </div>
          <div class="dateBox">
            등록일자 : {{ formatUpdateDtm(cardData.update_dtm) }}
          </div>

          <!-- 문의 기본 정보 -->
          <div class="contentBox">
            <UpperContentBox
              v-for="(dataType, i) in upperDataTypes"
              :key="i"
              :dataType="dataType"
              :cardData="cardData"
              :upperTitleBox="upperTitleBox"
            />
          </div>

          <!-- dropdown -->
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              진행상황 선택
            </button>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li
                v-for="(status, i) in status"
                :key="i"
                :items="status"
                @click="
                  getStatus(i);
                  putStatus();
                "
                class="dropdown-item"
              >
                {{ status }}
              </li>
            </ul>
          </div>

          <!-- 문의 상세 정보 -->
          <div class="contentBox">
            <LowerContentBox
              v-for="(dataType, i) in lowerDataTypes"
              :key="i"
              :dataType="dataType"
              :cardData="cardData"
              :lowerTitleBox="lowerTitleBox"
            />

            <!-- 담당자 커맨트 -->
            <div class="manager">
              <div class="managerBox">
                <!-- <textarea
                class="managerComment"
                v-model="managerCommentInput"
                placeholder="필요한 메모를 작성해주세요."
              /> -->

                <div id="content" class="managerComment" contenteditable="true">
                  {{ this.cardData.manager_comments }}
                </div>
                <!-- oninput="handleComment" -->

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
          </div>
        </div>
      </div>
      <button type="button" class="btn" @click="$emit('closePopup')">
        확인
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LowerContentBox from "./LowerContentBox.vue";
import UpperContentBox from "./UpperContentBox.vue";

export default {
  name: "PopUp",
  props: {
    dataSeq: String,
  },
  data() {
    return {
      cardData: {},
      upperDataTypes: ["user_name", "contact", "contact_type", "status"],
      lowerDataTypes: ["contents", "manager"],
      upperTitleBox: {
        user_name: "이름: ",
        contact: "연락처: ",
        contact_type: "문의유형: ",
        status: "진행상황: ",
      },
      lowerTitleBox: {
        contents: "문의내용: ",
        manager: "담당자: ",
      },
      managerComment: "",
      managerCommentBox: "",
      managerComments: "",
      changeStatus: "",
      submit: false,
      comment: {},
      status: ["진행", "문의 완료"],
      managerDate: "",
      managerText: "",
    };
  },
  components: {
    LowerContentBox: LowerContentBox,
    UpperContentBox: UpperContentBox,
  },

  created() {
    this.getCardData();
  },

  methods: {
    getCardData() {
      const api = axios.create({
        baseURL: "http://110.165.17.239:8000",
        headers: {
          "Content-Type": "application/json",
        },
      });

      api
        .get(`/api/contact/${this.dataSeq}`)
        .then((response) => {
          this.cardData = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    putStatus() {
      const api = axios.create({
        baseURL: "http://110.165.17.239:8000",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = {
        contact_seq: `${this.dataSeq}`,
        status: `${this.changeStatus}`,
        department: `${this.cardData.department}`,
        manager_comments: `${this.cardData.manager_comments}`,
      };

      api
        .put("/api/contact", data)
        .then((response) => {
          this.cardData = response.data;
          this.getCardData();
        })
        .catch((error) => {
          console.log(error);
        });
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
          this.cardData = response.data;
          this.getCardData();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    isSubmit() {
      return (this.submit = true);
    },

    getStatus(i) {
      this.changeStatus = this.status[i];

      return this.changeStatus;
    },

    handleContent() {
      const text = document.getElementById("content");

      this.managerText = text.innerText;
    },

    handleCommentDate() {
      let now = new Date();
      let month = now.getMonth() + 1;
      let date = now.getDate();

      this.managerDate = "[" + month + ". " + date + "]";
    },

    saveComment() {
      this.handleContent(); //managerText
      this.handleCommentDate(); //mangerDate

      if (this.managerText === "") {
        this.managerComments = "";
      }
      if (
        this.cardData.manager_comments.includes("[" && "]") &&
        this.managerText !== this.cardData.manager_comments
      ) {
        this.managerComments = this.managerDate + this.managerText;

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
        this.managerComments = this.managerDate + this.managerText;
      }

      return this.managerComments;
    },

    // deleteComment(i) {
    //   let copy = [...this.managerComments];
    //   copy.splice(i, 1);

    //   return (this.managerComments = copy);
    // },

    formatUpdateDtm(el) {
      const updateDtm = new Date(el);

      let year = updateDtm.getFullYear();
      let month = updateDtm.getMonth() + 1;
      let date = updateDtm.getDate();

      return year + ". " + month + ". " + date;
    },
  },

  computed: {
    cardType() {
      if (this.cardData.contact_type === "MR 문의") {
        return "border-green";
      } else if (this.cardData.contact_type === "컨설팅 문의") {
        return "border-blue";
      } else {
        return "border-red";
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../../../assets/scss/variables.scss";

.blackBg {
  z-index: 10;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: rgba(0, 0, 0, 0.4);
}

.popupWhiteBg {
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 4%;
  width: 64%;
  min-width: 600px;
  min-height: 750px;
  height: 87%;
  overflow: scroll;
  background-color: #fff;
  border-radius: 5px;
}

.dropdown {
  position: absolute;
  right: 30px;
  top: 170px;
}

#dropdownMenuButton1 {
  font-size: 14px;
}

.dropdown-menu {
  min-width: 120px;
}

.dropdown-item {
  font-size: 14px;

  &:active {
    background-color: $primaryColor;
  }
}

.content {
  width: 100%;
}

.colorBox {
  width: 97%;
  height: 50px;
  margin: 0 auto;
  margin-top: 13px;
  border-radius: 5px;

  &.border-green {
    background-color: $green;
  }

  &.border-red {
    background-color: $red;
  }

  &.border-blue {
    background-color: $blue;
  }
}

.contents {
  width: 96%;
  display: flex;
  justify-content: center;
}

.Xbox {
  float: right;
  margin-right: 10px;
  margin-top: 12px;
}

.bi-x-lg {
  height: 24px;
  width: 24px;
}

.dateBox {
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: 10px;
  padding-right: 26px;
}

.contentBox {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.inquire {
  height: 300px;
}

.btn {
  width: 120px;
  height: 34px;
  line-height: 0;
  border: 1px solid $primaryColor;
  background-color: #fff;
  color: $primaryColor;
  border-radius: 5px;
  margin-bottom: 50px;
  margin-top: 30px;

  &:hover {
    background-color: $primaryColor;
  }

  &:active {
    background-color: $primaryColor;
  }
}

.bi-check-circle-fill {
  fill: $primaryColor;
  width: 24px;
  height: 24px;
  margin-left: 10px;

  &:hover {
    cursor: pointer;
  }

  &:active {
    cursor: pointer;
  }
}

.manager {
  position: relative;
  width: 90%;
  height: 300px;
  overflow: hidden;
}

.managerBox {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

#handleCommentBtn {
  position: sticky;
  top: 10px;
  right: 16px;
}
.managerCommentBox {
  display: flex;
  justify-content: space-between;
  align-content: center;
  line-height: 0.8;
  margin-bottom: 8px;

  &.date {
    margin-right: 20px;
  }

  .bi-x-lg {
    height: 16px;
    width: 16px;
    line-height: 0.8;
  }
}

.comment {
  width: 100%;
  line-height: 1.3;
  word-wrap: break-word;
  overflow: unset;
}

.date {
  margin-right: 10px;
  min-width: 120px;
}

.managerComment {
  outline: none;
  border: none;
  border-radius: 3px;
  resize: none;
  width: 94%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 10px;
  margin-bottom: 10px;
}

.managerComments {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
</style>
