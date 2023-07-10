<template>
  <div class="blackBg">
    <div class="whiteBg">
      <div class="ham">
        <div class="lineLeft" />
        <div class="lineRight" />
      </div>
      <div class="line" />
      <div class="textBox">
        <span>제출되었습니다.</span>
      </div>
      <button>확인</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
};
</script>

<style>
.blackBg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: rgba(0, 0, 0, 0.4);
}

.whiteBg {
  width: 412px;
  height: 214px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.ham {
  width: 1px;
  height: 7px;
}

.lineLeft {
  transform: rotate(45deg);
}

.lineRight {
  transform: rotate(-45deg);
}

.line {
  margin-top: 30px;
  height: 1px;
  width: 96%;
  background-color: #000;
}

.textBox {
  width: 100%;
}
</style>
