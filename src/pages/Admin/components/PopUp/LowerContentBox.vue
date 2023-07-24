<template>
  <div class="lowerBox">
    <div class="greyLine" />
    <div class="lowerTitle">
      {{ lowerTitleBox[dataType] }}
    </div>

    <div
      class="departmentBox"
      v-if="dataType === 'manager' && this.cardData.department"
    >
      <span
        v-for="(department, i) in splitDepartments()"
        :key="i"
        :class="['departmentPopup', labelBorder(department)]"
      >
        {{ department }}
      </span>
    </div>

    <div v-if="dataType !== 'manager'" class="lowerContent">
      {{ cardData[dataType] }}
    </div>
  </div>
</template>

<script>
export default {
  name: "LowerContentBox",
  props: {
    lowerTitleBox: Object,
    cardData: Object,
    dataType: String,
  },

  data() {
    return {
      splitDepartment: null,
    };
  },

  created() {
    this.splitDepartments();
    this.departmentLabel();
  },

  methods: {
    splitDepartments() {
      if (this.cardData.department && this.cardData.department.includes(",")) {
        this.splitDepartment = this.cardData.department.split(",");

        return this.splitDepartment;
      } else if (this.cardData.department) {
        this.splitDepartment = this.cardData.department.split(" ");

        return this.splitDepartment;
      }
    },

    departmentLabel() {
      if (Array.isArray(this.splitDepartment))
        if (this.splitDepartment.length !== 0) {
          return Object.values(this.splitDepartment);
        }
    },
  },

  computed: {
    labelBorder() {
      return (department) => {
        if (department === "기술") {
          return "label-green";
        } else if (department === "영업") {
          return "label-blue";
        }
      };
    },
  },
};
</script>

<style lang="scss">
@import "../../../../assets/scss/variables.scss";

.lowerBox {
  width: 90%;
  font-size: 18px;
}

.lowerTitle {
  width: 80px;
  line-height: 34px;
}

.lowerContent {
  width: 100%;
  height: 300px;
  line-height: 34px;
  font-weight: 300;
  overflow-y: scroll;
  overflow-x: hidden;

  -ms-overflow-style: none;
  scrollbar-width: none;
}

#lowerContent::-webkit-scrollbar {
  display: none;
}

.greyLine {
  width: 100%;
  height: 1px;
  background-color: #e4e4e4;
  margin-top: 15px;
  margin-bottom: 10px;
}

.departmentBox {
  display: flex;
}

.departmentPopup {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  width: 50px;
  height: 30px;
  padding: 3px 6px;
  border-radius: 3px;
  font-size: 1rem;

  &.label-green {
    background-color: $lightGreen;
  }

  &.label-blue {
    background-color: $lightBlue;
  }

  &.label-yellow {
    background-color: $yellow;
    width: 80px;
  }
}
</style>
