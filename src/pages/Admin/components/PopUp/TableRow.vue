<template>
  <tr>
    <td class="additional">
      <select
        class="form-select form-select-sm"
        aria-label=".form-select-sm example"
        v-model="selected"
      >
        <option disabled value="">지원 요청</option>
        <option value="영업">영업</option>
        <option value="기술">기술</option>
      </select>
    </td>
    <td class="department">
      <select
        class="form-select form-select-sm"
        aria-label=".form-select-sm example"
        v-model="selected"
      >
        <option value="영업">영업</option>
        <option value="기술">기술</option>
      </select>
    </td>
    <td class="startDate">2023.07.12</td>
    <td class="endDate">캘린더</td>
    <td class="status">
      <select
        class="form-select form-select-sm"
        aria-label=".form-select-sm example"
        v-model="selected"
      >
        <option value="진행중">일정 진행중</option>
        <option value="지연">일정 지연</option>
        <option value="완료">완료</option>
      </select>
    </td>
    <td class="summary"><input /></td>
    <td class="detail">
      <div class="overFlow">
        {{ this.cardData.manager_comments }}
      </div>
      <button @click="showDetail()" class="detailBtn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          fill="currentColor"
          class="bi bi-caret-down-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
          />
        </svg>
      </button>
    </td>
  </tr>
  <tr v-if="isDisplayed" class="manager">
    <td id="content" class="managerComment" contenteditable="true" colspan="7">
      {{ this.cardData.manager_comments }}
      <svg
        id="handleCommentBtn"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="primaryColor"
        class="bi bi-check-circle-fill"
        viewBox="0 0 16 16"
        @click="isSubmit(), saveComment(), putComments()"
      >
        <path
          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
        />
      </svg>
    </td>
  </tr>
</template>

<script>
export default {
  name: "TableRow",

  data() {
    return { isDisplayed: false };
  },
  props: {
    cardData: Object,
  },

  methods: {
    showDetail() {
      this.isDisplayed = !this.isDisplayed;
    },
  },

  computed: {},
};
</script>

<style lang="scss">
@import "../../../../assets/scss/variables.scss";
.additional {
  width: 10%;
}
.popupDepartment {
  width: 10%;
}

.startDate {
  width: 10%;
}
.endDate {
  width: 10%;
}
.status {
  width: 20%;
}
.summary {
  width: 20%;
}

.detail {
  width: 20%;
  display: flex;

  .overFlow {
    width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .detailBtn {
    width: 15%;
    border: none;
  }
}
</style>
