<template>
  <div class="blackBg" v-if="detailData">
    <div class="whiteBg">
      <div class="content">
        <div class="colorBox">
          <div class="Xbox">
            <svg
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
        <div class="dateBox">등록일자 : {{ detailData[0].createAt }}</div>
        <div class="contentBox">
          <UpperContentBox
            v-for="(dataType, i) in upperDataTypes"
            :key="i"
            :dataType="dataType"
            :detailData="detailData"
            :upperTitleBox="upperTitleBox"
          />
        </div>

        <div class="contentBox">
          <LowerContentBox
            v-for="(dataType, i) in lowerDataTypes"
            :key="i"
            :dataType="dataType"
            :detailData="detailData"
            :lowerTitleBox="lowerTitleBox"
          />
        </div>
      </div>
      <button type="button" class="btn btn-primary">확인</button>
    </div>
  </div>

  <!-- {{ console.log("createAt:", detailData[3].createAt) }} -->
</template>

<script>
import LowerContentBox from "./LowerContentBox.vue";
import UpperContentBox from "./UpperContentBox.vue";

export default {
  name: "PopUp",
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
  },
};
</script>

<style>
.blackBg {
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

.whiteBg {
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
  background-color: #fff8bd;
  width: 97%;
  height: 50px;
  margin: 0 auto;
  margin-top: 13px;
  border-radius: 5px;
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
  background-color: #f39366;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-bottom: 50px;
}
</style>
