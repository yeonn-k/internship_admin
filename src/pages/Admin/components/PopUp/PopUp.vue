<template>
  <div class="blackBg" @click="$emit('closePopup')">
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

          <div class="basicInfo">
            <div>
              <span :class="['badge', cardType]">{{
                cardData.contact_type
              }}</span>
              <span :class="['badge', badgeBorder]">{{ cardData.status }}</span>
            </div>

            <span class="dateBox">
              등록일자 : {{ formatUpdateDtm(cardData.update_dtm) }}
            </span>
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

            <div class="managerContainer">
              <button class="addTimeLine" @click="addTable">업무 추가</button>
              <div class="managerTable">
                <div class="managerTableHeader">
                  <div class="additional">지원 요청</div>
                  <div class="popupDepartment">담당자</div>
                  <div class="startDate">시작일</div>
                  <div class="endDate">마감(예정)일</div>
                  <div class="status">진행 상태</div>
                  <div class="summary">요약</div>
                  <div class="popupDetail">세부 내용</div>
                </div>

                <TableRow
                  v-for="(row, index) in rows"
                  :key="index"
                  :cardData="cardData"
                  :dataSeq="dataSeq"
                />
              </div>
            </div>
          </div>
          <div class="calendar">
            <calendarView
              locale="en"
              :show-date="showDate"
              class="theme-default holiday-us-traditional holiday-us-official"
            >
              <template #header="{ headerProps }">
                <calendarViewHeader
                  :header-props="headerProps"
                  @input="setShowDate"
                />
              </template>
            </calendarView>
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
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
import TableRow from "./TableRow.vue";

export default {
  name: "PopUp",
  props: {
    dataSeq: String,
  },
  data() {
    return {
      cardData: {},
      upperDataTypes: ["user_name", "contact", "status"],
      lowerDataTypes: ["contents", "manager"],
      upperTitleBox: {
        user_name: "이름: ",
        contact: "연락처: ",
      },
      lowerTitleBox: {
        contents: "문의내용: ",
        manager: "진행 내역: ",
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
      ref: 0,
      rows: [{ id: 0 }],
      showDate: new Date(),
    };
  },
  components: {
    LowerContentBox,
    UpperContentBox,
    CalendarView,
    CalendarViewHeader,
    TableRow,
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
          this.cardData = response;
          this.getCardData();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getStatus(i) {
      this.changeStatus = this.status[i];

      return this.changeStatus;
    },

    formatUpdateDtm(el) {
      const updateDtm = new Date(el);

      let year = updateDtm.getFullYear();
      let month = updateDtm.getMonth() + 1;
      let date = updateDtm.getDate();

      return year + ". " + month + ". " + date;
    },

    // deleteComment(i) {
    //   let copy = [...this.managerComments];
    //   copy.splice(i, 1);

    //   return (this.managerComments = copy);
    // },

    addTable() {
      this.ref += 1;
      this.rows.push({ id: this.ref });
      console.log(this.rows);
    },

    setShowDate(d) {
      this.showDate = d;
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

    badgeBorder() {
      if (this.cardData.status === "진행") {
        return "badge-green";
      } else {
        return "badge-red";
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../../../assets/scss/variables.scss";
@import "./Calendar.scss";
/* @import "../../../../node_modules/vue-simple-calendar/dist/style.css"; */

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

.dateBox {
  font-size: 14px;
  margin-right: 10px;
}

.basicInfo {
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 2px 10px 2px 10px;
  margin-bottom: 5px;
}

.dropdown {
  position: absolute;
  right: 30px;
  top: 70px;
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
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-bottom: 7px;
}

.managerContainer {
  width: 90%;
  margin: auto;

  .addTimeLine {
    background-color: $blue;
    color: white;
    margin-bottom: 10px;
    border-radius: 5px;
    border: none;
  }

  .managerTable {
    table-layout: fixed;

    .managerTableHeader {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
      background-color: $lightGrey;
      padding: 0 8px;
      margin-bottom: 7px;
      border-radius: 5px;
    }

    .additional {
      width: 8%;
    }

    .popupDepartment {
      width: 8%;
    }

    .startDate {
      width: 10%;
    }
    .endDate {
      width: 12%;
    }

    .status {
      width: 15%;
    }

    .summary {
      width: 29%;
    }

    .popupDetail {
      width: 10%;
    }
  }
}

.managerBox {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

#handleCommentBtn {
  position: absolute;
  top: 10px;
  right: 10px;
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
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 10px;
  margin-bottom: 10px;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
}

.managerComment::-webkit-scrollbar {
  display: none; /* 크롬, 사파리, 오페라, 엣지 */
}

.managerComments {
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.badge {
  color: black;
  margin-left: 10px;
  font-size: 12px;

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

.border {
  width: 20px;
  margin-left: 10px;
}

.calendar {
  width: 90%;
  margin: 0 auto;
}
</style>
