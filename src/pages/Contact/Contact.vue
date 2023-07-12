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
                        />
                        <label for="contactBy">{{ contactBy }}</label>
                      </span>
                    </div>
                    <span class="warning" v-if="!contactRadio"
                      >연락처 선택은 필수사항입니다.</span
                    >
                  </div>
                  <div class="boxLine">
                    <input
                      name="contactTo"
                      id="contactTo"
                      v-model="contact"
                      required=""
                      class="textInput"
                      type="text"
                      placeholder="연락처를 입력해주세요."
                    />
                    <span class="warning" v-if="!contact"
                      >연락처는 필수 입력사항입니다.</span
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

                    <span class="warning" v-if="!inquireRadio"
                      >요청 사항 선택은 필수 입력사항입니다.</span
                    >
                  </div>

                  <div class="boxLine">
                    <div class="input-group">
                      <input
                        type="file"
                        class="form-control"
                        id="inputFile"
                        aria-describedby="inputFile"
                        aria-label="Upload"
                      />
                    </div>
                  </div>
                  <div class="textAreaBoxLine">
                    <textarea
                      v-model="contents"
                      placeholder="(선택) 자세한 문의 내용을 입력해주세요."
                    />
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
      contact: null,
      type: null,
      contents: null,
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
      if (!this.errors.length) return this.openSubmit();
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/variables.scss";
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap");

.backgroundColor {
  background-color: #fff5ea;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.wrapContact {
  width: 100%;
}

.contact {
  font-family: $fontFamily;
  font-weight: 400;
  width: 1280px;
  margin: 0 auto;
  padding: 0px 70px;
  margin-top: 100px;
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
  margin-top: 9px;
  margin-left: 7%;
  margin-right: 10px;
}

.contentsTitle p {
  width: 100%;
  margin-bottom: 46px;
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
}

/* .boxLine:focus {
  border: 1px solid $primaryColor;
} */

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

.input-group {
  height: 36px;
  display: flex;
  justify-content: space-between;
}

.input-group input {
  width: 100%;
}

.form-control {
  height: 34px;
  line-height: 0px;
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
