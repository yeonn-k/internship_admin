<template>
  <div class="blackBg">
    <div class="whiteBg">
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
      <div class="line" />
      <div class="textBox">
        <input
          class="inputBox"
          type="text"
          placeholder="e-mail을 입력해주세요."
        />
      </div>
      <button type="button" class="btn btn-primary">확인</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactModal",
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
  margin-top: 20%;
  width: 412px;
  height: 230px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 5px;
}

.Xbox {
  width: 100%;
  display: flex;
  justify-content: end;
  margin: 10px;
}

.bi-x-lg {
  width: 20px;
  justify-content: flex-end;
}

.line {
  height: 1px;
  width: 96%;
  background-color: #000;
}

.textBox {
  width: 100%;
  margin-top: 56px;
  margin-bottom: 7px;
  text-align: center;
}

.inputBox {
  width: 240px;
  height: 34px;
  padding: 10px;
}
</style>
