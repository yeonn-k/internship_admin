<template>
  <div class="backgroundColor">
    <div class="contact">
      <div class="contactBox">
        <div class="leftBox">
          <div class="companyBox">
            <h1 class="companyName">AmberRoad Contact</h1>
            <p
              class="contactPoint"
              v-for="(contactPoint, i) in contactPoint"
              :key="i"
            >
              {{ contactPoint.title + contactPoint.content }}
            </p>
          </div>
        </div>
        <div class="rightBox">
          <div class="contents">
            <div class="contentsTitle">
              <p v-for="(contentsTitle, i) in contentsTitle" :key="i">
                {{ contentsTitle }}
              </p>
            </div>
            <div class="content">
              <div class="boxLine">
                <input type="text" placeholder="이름을 입력해주세요." />
              </div>
              <div class="boxLine">
                <div class="radioBox">
                  <span
                    class="radioContent"
                    v-for="(contactBy, i) in contactBy"
                    :key="i"
                  >
                    <input
                      class="radio"
                      type="radio"
                      name="contactBy"
                    /><span>{{ contactBy }}</span>
                  </span>
                </div>
              </div>
              <div class="boxLine">
                <div class="radioBox">
                  <span
                    class="radioContent"
                    v-for="(inquire, i) in inquire"
                    :key="i"
                  >
                    <input class="radio" type="radio" name="inquire" /><span>{{
                      inquire
                    }}</span>
                  </span>
                </div>
              </div>
              <div class="boxLine">
                <form
                  action="/home/uploadfiles"
                  method="post"
                  enctype="multipart/form-data"
                >
                  <input class="uploadFile" type="file" name="myfile" />
                  <button type="uploadSubmit">제출하기</button>
                </form>
              </div>
              <div class="textAreaBoxLine">
                <textarea
                  placeholder="(선택) 자세한 문의 내용을 입력해주세요."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <ModalComponent /> -->
  </div>
</template>

<script>
// import ModalComponent from "./Modal.vue";

export default {
  name: "ContactVue",
  // components: { ModalComponent: ModalComponent },
  data() {
    return {
      contactPoint: [
        { title: "Email:", content: "eonho@posco.com" },
        { title: "Tel:", content: "054-220-8973" },
        { title: "Mobile:", content: "010-9353-4658" },
      ],
      contentsTitle: ["이름", "연락처", "요청 사항", "파일 첨부", "문의 내용"],
      contactBy: ["e-mail", "전화번호"],
      inquire: ["MR 문의", "컨설팅 문의", "일반 문의"],
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap");

.backgroundColor {
  background-color: #fff5ea;
  width: 100%;
  overflow: hidden;
}

.contact {
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  width: 1280px;
  margin: 0 auto;
  padding: 0px 70px;
  margin-top: 140px;
}

.contactBox {
  display: flex;
}

.leftBox {
  width: 26%;
}

.companyBox {
  position: sticky;
  top: 76%;
  padding: 34px;
}

.companyName {
  font-size: 22px;
}

.contactPoint {
  font-size: 14px;
  margin-top: 10px;
}

.rightBox {
  width: 74%;
  height: 605px;
  border-radius: 5px;
  background-color: #fff;
}

.contents {
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  margin-top: 90px;
}

.contentsTitle {
  width: 20%;
  text-align: end;
  margin-top: 9px;
  margin-left: 7%;
  margin-right: 10px;
}

.contentsTitle p {
  width: 100%;
  margin-bottom: 41px;
}

.content {
  width: 80%;
}

.boxLine {
  width: 90%;
  height: 36px;
  margin-left: 10px;
  border: 1px solid #dadada;
  border-radius: 3px;
  font-size: 14px;
  margin-bottom: 22px;
}

.textAreaBoxLine {
  width: 90%;
  height: 200px;
  margin-left: 10px;
  border: 1px solid #dadada;
  border-radius: 3px;
  font-size: 14px;
  margin-bottom: 22px;
}

.radioBox {
  display: flex;
  justify-content: space-around;
  align-content: center;
}

.radioBox span {
  display: flex;
  line-height: 32px;
}

input[type="file"]::file-selector-button {
  background-color: #fff;
  border: none;
}

.contents input {
  height: 34px;
  line-height: 34px;
  outline: none;
  border: none;
  padding: 10px;
  box-shadow: none;
  border-radius: 3px;
}

.contents textarea {
  outline: none;
  border: none;
  border-radius: 3px;
  resize: none;
  width: 90%;
  height: 196px;
  padding: 10px;
}

.submit {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 150px;
  width: 183px;
  height: 34px;
  border-radius: 10px;
  outline: none;
  background-color: #f39366;
  color: #fff;
  font-size: 14px;
}
</style>
