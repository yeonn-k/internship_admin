<template>
  <div class="blackBg" v-if="detailData" @click="$emit('closePopup')">
    <div class="popupWhiteBg" @click.stop>
      <div class="content">
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
        <div class="dateBox">등록일자 : {{ filteredData[0].createAt }}</div>
        <div class="contentBox">
          <UpperContentBox
            v-for="(dataType, i) in upperDataTypes"
            :key="i"
            :dataType="dataType"
            :detailData="detailData"
            :upperTitleBox="upperTitleBox"
            :dataId="dataId"
            :filteredData="filteredData"
          />
        </div>

        <div class="contentBox">
          <LowerContentBox
            v-for="(dataType, i) in lowerDataTypes"
            :key="i"
            :dataType="dataType"
            :detailData="detailData"
            :lowerTitleBox="lowerTitleBox"
            :dataId="dataId"
            :filteredData="filteredData"
          />

          <div class="manager">
            <textarea
              class="managerComment"
              v-model="managerComment"
              placeholder="필요한 메모를 작성해주세요."
              @keyup.enter="submit"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pen"
              viewBox="0 0 16 16"
            >
              <path
                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="primaryColor"
              class="bi bi-check-circle-fill"
              viewBox="0 0 16 16"
              @click="isSubmit(), saveComment()"
            >
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
              />
            </svg>

            <div>
              {{ managerCommentBox }}
            </div>

            {{ console.log("managerComment:", managerComment) }}
            {{ console.log("managerCommentBox: ", managerCommentBox) }}
            {{ console.log("submit: ", submit) }}
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
import LowerContentBox from "./LowerContentBox.vue";
import UpperContentBox from "./UpperContentBox.vue";

export default {
  name: "PopUp",
  props: {
    dataId: String,
    filteredData: Array,
  },
  data() {
    return {
      upperDataTypes: ["name", "contact", "type", "status"],
      lowerDataTypes: ["contents", "file", "manager"],
      upperTitleBox: {
        name: "이름: ",
        contact: "연락처: ",
        type: "문의유형: ",
        status: "진행상황: ",
      },
      lowerTitleBox: {
        contents: "문의내용: ",
        file: "파일첨부: ",
        manager: "담당자: ",
      },
      detailData: null,
      managerComment: "",
      managerCommentBox: "",
      managerComments: [],
      submit: false,
    };
  },
  components: {
    LowerContentBox: LowerContentBox,
    UpperContentBox: UpperContentBox,
  },
  created() {
    this.getDetails();
  },

  methods: {
    getDetails() {
      fetch("/data/inquireData.json")
        .then((response) => response.json())
        .then((data) => (this.detailData = data));
    },

    isSubmit() {
      return (this.submit = true);
    },

    saveComment() {
      if (this.managerComment && this.submit) {
        this.managerComments.push(this.managerComment);

        this.managerCommentBox = this.managerComments.join(" ");
        this.managerComment = "";
      }

      return this.managerCommentBox;
    },

    //managerCommentBox &&
  },

  computed: {
    cardType() {
      if (this.filteredData[0].type === "MR 문의") {
        return "border-green";
      } else if (this.filteredData[0].type === "컨설팅 문의") {
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
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 4%;
  width: 64%;
  min-width: 600px;
  height: 87%;
  overflow: scroll;
  background-color: #fff;
  border-radius: 5px;
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

.bi-pen {
  fill: $primaryColor;
  width: 24px;
  height: 24px;

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
  overflow: scroll;
}

.managerComment {
  outline: none;
  border: none;
  border-radius: 3px;
  resize: none;
  width: 92%;
  height: 55px;
  padding: 10px;
}

.managerCommentBox {
  margin-top: 10px;
  width: 100%;
  word-wrap: break-word;
}
</style>
