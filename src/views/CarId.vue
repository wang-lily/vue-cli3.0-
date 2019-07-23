<template>
  <div class="page-car-num">
    <div class="input-nums">
      <div
        class="input-nums-left "
        :class="{ 'border-left': inputLength === 0 }"
      >
        <span
          class="input-nums-item"
          :class="{ 'border-right': inputLength === index + 1 }"
          v-for="(item, index) of inputNums"
          :key="index"
        >
          {{ item }}
        </span>
        |
      </div>
      <button class="input-nums-button">查询</button>
    </div>
    <div class="input-keyboard">
      <span
        class="input-keyboard-item"
        v-for="(item, index) of keyboardFist"
        :key="index"
        >{{ item }}</span
      >
      <span class="input-keyboard-close">x</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CarId',
  data() {
    return {
      inputNums: ['1', '', '', '', '', '', ''],
      inputLength: 1,
      keyboardFist: [
        '京',
        '津',
        '冀',
        '晋',
        '蒙',
        '辽',
        '吉',
        '黑',
        '沪',
        '苏',
        '浙',
        '皖',
        '闽',
        '赣',
        '鲁',
        '豫',
        '鄂',
        '湘',
        '粤',
        '桂',
        '琼',
        '渝',
        '川',
        '贵',
        '云',
        '藏',
        '陕',
        '甘',
        '青',
        '宁',
        '新'
      ],
      keyboardOther: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        0,
        'Q',
        'W',
        'E',
        'R',
        'T',
        'Y',
        'U',
        'I',
        'O',
        'P',
        'A',
        'S',
        'D',
        'F',
        'G',
        'H',
        'J',
        'K',
        'L',
        'Z',
        'X',
        'C',
        'V',
        'B',
        'N',
        'W'
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
@keyframes fadeLeft {
  from,
  49% {
    border-left-color: rgb(0, 204, 255);
  }
  51%,
  to {
    border-left-color: #ffffff;
  }
}
@keyframes fadeRight {
  from,
  49% {
    border-right-color: rgb(0, 204, 255);
  }
  51%,
  to {
    border-right-color: #ffffff;
  }
}
.page-car-num {
  .input-nums {
    border: 1px solid #cccccc;
    width: 100%;
    height: 40px;
    margin: 20px 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    .input-nums-left {
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin: 20px;
      width: 80%;
    }
    .input-nums-item {
      width: 14.3%;
    }
    .input-nums-button {
      width: 15%;
      margin-right: 20px;
      height: 60%;
      background: rgb(0, 204, 255);
      border: none;
      border-radius: 5px;
    }
    .border-left {
      border-left: 2px solid rgb(0, 204, 255);
      animation: fadeLeft 1s infinite;
    }
    .border-right {
      border-right: 2px solid rgb(0, 204, 255);
      animation: fadeRight 1s infinite;
    }
  }
  .input-keyboard {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #cccccc;
    height: 30vh;
    display: flex;
    flex-wrap: wrap;
    .input-keyboard-item {
      background: #ffffff;
      width: 9%;
      height: 5vh;
      margin: 5px;
    }
  }
}
</style>
