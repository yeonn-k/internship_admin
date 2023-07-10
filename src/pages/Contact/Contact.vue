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
                <div class="input-group">
                  <input
                    type="file"
                    class="form-control"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="inputGroupFileAddon04"
                  >
                    Button
                  </button>
                </div>
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
    <ContactModal />
    <!-- <SubmitModal /> -->

    <button type="button" class="btn btn-primary">제출하기</button>
  </div>
</template>

<script>
// import SubmitModal from "./SubmitModal.vue";
import ContactModal from "./ContactModal.vue";

export default {
  name: "ContactVue",
  components: { ContactModal: ContactModal },
  // components: { SubmitModal: SubmitModal },
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
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.contact {
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  width: 1280px;
  margin: 0 auto;
  padding: 0px 70px;
  margin-top: 100px;
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

.boxLine:focus {
  border: 1px solid #f39366;
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

.radio {
  margin-right: 8px;
  accent-color: #f39366;
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

.input-group {
  height: 36px;
  display: flex;
  justify-content: space-between;
}

.form-control {
  height: 34px;
  line-height: 0px;
}

.btn {
  height: 35px;
  width: 64px;
  background-color: #f39366;
  color: #fff;
  border: none;
  border-radius: 3px;
}

.btn:hover {
  cursor: pointer;
}

.btn-primary {
  width: 100px;
  color: #fff;
  margin-top: 40px;
  margin-bottom: 70px;
}

input[type="file"]::file-selector-button {
  height: 24px;
  margin-right: 10px;
  background-color: #fff;
  border: 1px solid #f39366;
  border-radius: 3px;
}

input[type="file"]::file-selector-button:hover {
  cursor: pointer;
}

.contents input {
  height: 34px;
  line-height: 34px;
  outline: none;
  border: none;
  padding-left: 10px;
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
