<template>
  <div id="user">
    <a-card title="预约取件" :bordered="false" style="width: 1000px">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="运单号：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input v-model="userUpdate.id" />
        </a-form-item>
        <a-form-item label="取件时间：" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <div>
            <a-date-picker
              format="YYYY-MM-DD HH:mm:ss"
              :disabledDate="disabledDate"
              :disabledTime="disabledDateTime"
              :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
              v-model="userUpdate.appointmentTime"
            />
            <br />
          </div>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      userUpdate: {
        "id": null,
        "appointmentTime": null
      }
    };
  },

  methods: {
    moment,
    range(start, end) {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    },

    disabledDate(current) {
      return current && current < moment().endOf("day");
    },

    disabledDateTime() {
      return {
        disabledHours: () => this.range(0, 24).splice(0, 8),
        disabledMinutes: () => this.range(0, 0),
        disabledSeconds: () => [55, 56]
      };
    },
    handleSubmit (e) {
      this.$store.dispatch('userUpdate', { userUpdate: this.userUpdate });
    },
  }
};
</script>

<style>
</style>

