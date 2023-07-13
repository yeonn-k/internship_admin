<template>
  <div class="backgroundColor">
    <div class="wrapContact">
      <div class="contact">
        <div class="contactBox">
          <!--회사소개-->
          <div class="leftBox">
            <div class="companyBox">
              <h1 class="companyName">AmberRoad Contact</h1>
              <p
                class="contactPoint"
                v-for="(contactPoint, i) in contactPoint"
                :key="i"
              >
                {{ contactPoint.title + " " + contactPoint.content }}
              </p>
            </div>
          </div>
          <div class="rightBox">
            <div class="contents">
              <!--input 이름-->
              <div class="contentsTitle">
                <p
                  v-for="(contentsTitle, i) in contentsTitle"
                  :key="i"
                  label
                  for="validationCustom01"
                >
                  {{ contentsTitle }}
                </p>
              </div>
              <form
                id="submit"
                @submit="checkForm"
                action="/something"
                method="post"
                class="contentForm"
                novalidate="true"
              >
                <div class="content">
                  <div class="boxLine">
                    <input
                      name="name"
                      id="name"
                      v-model="name"
                      required=""
                      class="textInput"
                      type="text"
                      placeholder="이름을 입력해주세요."
                    />
                    <span class="warning" v-if="!name"
                      >이름은 필수 입력사항입니다.</span
                    >
                  </div>

                  <div class="boxLine">
                    <div class="radioBox">
                      <span
                        class="radioContent"
                        v-for="(contactBy, i) in contactBy"
                        :key="i"
                      >
                        <input
                          name="contactRadio"
                          id="contactRadio"
                          :value="contactBy"
                          v-model="contactRadio"
                          type="radio"
                          class="radio"
                          @change="changePlaceholder"
                        />
                        <label for="contactBy">{{ contactBy }}</label>
                      </span>
                    </div>
                    <span class="warning" v-if="!contactRadio"
                      >연락처 선택은 필수사항입니다.</span
                    >
                  </div>
                  <div class="boxLine">
                    <!-- v-if="contactRadio === 'e-mail'" -->
                    <input
                      name="contactTo"
                      id="contactTo"
                      v-model="contact"
                      required=""
                      class="textInput"
                      :type="inputType"
                      :placeholder="contactType"
                      @keydown="onlyNumber"
                    />
                    <span class="warning" v-if="!contact"
                      >연락처는 필수 입력사항입니다.</span
                    >
                    <span
                      class="warning"
                      v-if="
                        contact &&
                        this.contactRadio === 'e-mail' &&
                        !this.contact.includes('@')
                      "
                      >이메일 양식을 지켜주세요 ('@'를 포함해주세요)</span
                    >
                    <span
                      class="warning"
                      v-if="
                        contact &&
                        this.contactRadio === '전화번호' &&
                        this.contact.length !== 11
                      "
                      >숫자만 입력해주세요</span
                    >
                  </div>

                  <div class="boxLine">
                    <div class="radioBox">
                      <span
                        class="radioContent"
                        v-for="(inquire, i) in inquire"
                        :key="i"
                      >
                        <input
                          name="inquireRadio"
                          id="inquireRadio"
                          :value="inquire"
                          v-model="type"
                          type="radio"
                          class="radio"
                        /><label for="inquire">{{ inquire }}</label>
                      </span>
                    </div>

                    <span class="warning" v-if="!type"
                      >요청 사항 선택은 필수 입력사항입니다.</span
                    >
                  </div>

                  <div class="boxLine">
                    <input
                      type="file"
                      id="inputFile"
                      class="addFile"
                      aria-describedby="inputFile"
                      aria-label="Upload"
                    />
                  </div>
                  <div class="textAreaBoxLine">
                    <textarea
                      placeholder="(선택) 자세한 문의 내용을 입력해주세요."
                    />
                    <!-- v-model="managerComment" -->
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <input
      type="submit"
      value="제출하기"
      @click="checkForm"
      class="btn btn-primary"
    />

    <SubmitModal
      v-if="isSubmit === true"
      @closeSubmit="isSubmit = false"
      :isClicked="isClicked"
      :isSubmit="isSubmit"
      :errorsLength="errors.length"
    />
  </div>
</template>

<script>
import SubmitModal from "./SubmitModal.vue";

export default {
  name: "ContactVue",
  components: {
    SubmitModal: SubmitModal,
  },
  data() {
    return {
      contactPoint: [
        { title: "Email:", content: "eonho@posco.com" },
        { title: "Tel:", content: "054-220-8973" },
        { title: "Mobile:", content: "010-9353-4658" },
      ],
      contentsTitle: [
        "이름",
        "연락처 선택",
        "연락처",
        "요청 사항",
        "파일 첨부",
        "문의 내용",
      ],
      contactBy: ["e-mail", "전화번호"],
      inquire: ["MR 문의", "컨설팅 문의", "일반 문의"],
      isSubmit: false,
      isClicked: false,
      errors: [],
      name: null,
      contactRadio: null,
      contactType: "",
      contact: null,
      type: null,
      contents: null,

      inputType: "",
    };
  },
  methods: {
    openSubmit() {
      this.isClicked = true;
      this.isSubmit = true;
    },
    checkForm(e) {
      e.preventDefault();

      this.errors = [];
      if (!this.name) {
        this.errors.push("name");
      }
      if (!this.contactRadio) {
        this.errors.push("contactRadio");
      }
      if (!this.contact) {
        this.errors.push("contact");
      }
      if (!this.type) {
        this.errors.push("type");
      }
      if (this.contactRadio === "e-mail" && !this.contact.includes("@")) {
        this.errors.push("email");
      }
      if (this.contactRadio === "전화번호" && this.contact.length !== 11) {
        this.errors.push("tel");
      }
      return this.openSubmit();
    },
    changePlaceholder() {
      if (this.contactType === "") {
        this.contactType = "연락처를 입력해주세요";
        this.inputType = "text";
      }
      if (this.contactRadio === "e-mail") {
        this.contactType = "e-mail을 입력해주세요";
        this.inputType = "text";
      }
      if (this.contactRadio === "전화번호") {
        this.contactType = "전화번호를 입력해주세요";
        this.inputType = "number";
      }
    },
  },
  created() {
    this.changePlaceholder();
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/variables.scss";
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap");

.backgroundColor {
  background-color: #fff5ea;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}

.wrapContact {
  width: 100%;
  display: flex;
  margin-top: -140px;
  justify-content: center;
}

.contact {
  font-family: $fontFamily;
  font-weight: 400;
  width: 1280px;
  margin: 0 auto;
  padding: 0px 70px;
  margin-top: 180px;
}

.contactBox {
  display: flex;
}

.warning {
  color: $primaryColor;
  line-height: 2;
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
  margin-top: 50px;
}

.contentForm {
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
}

.contentsTitle {
  width: 20%;
  text-align: end;
  margin-top: 3px;
  margin-left: 7%;
  margin-right: 10px;
}

.contentsTitle p {
  width: 100%;
  margin-bottom: 39px;
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
  margin-bottom: 27px;
}

.textInput {
  width: 100%;
  padding-left: 10px;
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
  accent-color: $primaryColor;
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

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.addFile {
  background: none;
  margin-top: 5px;
  margin-left: 10px;
  line-height: 0;
}

.btn {
  height: 35px;
  width: 64px;
  background-color: $primaryColor;
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
  border: 1px solid $primaryColor;
  border-radius: 3px;
}

input[type="file"]::file-selector-button:hover {
  cursor: pointer;
}

input[type="file"]:active {
  border: none;
  background: none;
}

.contents input {
  height: 34px;
  outline: none;
  border: none;
  box-shadow: none;
  border-radius: 3px;
}

.contents textarea {
  outline: none;
  border: none;
  border-radius: 3px;
  resize: none;
  width: 100%;
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
  background-color: $primaryColor;
  color: #fff;
  font-size: 14px;
}
</style>
