<template>
  <div class="blackBg">
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
        <div class="dateBox">등록일자 : 07.07.2023</div>
        <div class="contentBox">
          <div class="upperBox" v-for="(titleBox, i) in titleBox" :key="i">
            <div class="title">
              {{ titleBox }}
            </div>
            <div class="upperContent"></div>
          </div>
        </div>
        <div class="contentBox">
          <div class="lowerBox" v-for="(lowerBox, i) in lowerBox" :key="i">
            <div class="greyLine" />
            <div class="title">
              {{ lowerBox }}
            </div>
            <div class="lowerContent"></div>
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-primary">Primary</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  data() {
    return {
      titleBox: ["이름: ", "연락처: ", "문의유형: ", "진행상황: "],
      lowerBox: ["문의내용: ", "파일첨부: ", "담당자: "],
    };
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
  overflow: hidden;
  background-color: #fff;
  border-radius: 5px;
  /* padding: 10px; */
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

.title {
  width: 70px;
  line-height: 34px;
  text-align: end;
}

.upperBox {
  width: 90%;
  font-size: 18px;
  display: flex;
}

.lowerBox {
  width: 90%;
  font-size: 18px;
}

.upperContent {
  width: 90%;
  height: 34px;
  line-height: 34px;
}

.lowerContent {
  width: 100%;
  height: 96px;
  line-height: 34px;
  overflow: scroll;
}

.greyLine {
  width: 100%;
  height: 1px;
  background-color: #e4e4e4;
  margin-top: 15px;
  margin-bottom: 10px;
}

.btn {
  width: 120px;
  height: 34px;
  background-color: #f39366;
  color: #fff;
  border: none;
  border-radius: 5px;
}
</style>
