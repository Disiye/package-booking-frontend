<template>
  <div class="home">
    <div style="background:#ECECEC; padding:30px">
      <a-card title="菜鸟驿站" :bordered="false" style="width: 1000px">
        <a-button type="primary">All</a-button>
        <a-button type="primary">已预约</a-button>
        <a-button type="primary">已取件</a-button>
        <a-button type="primary">未预约</a-button>
        <a-button shape="circle" icon="plus" @click="addPackage"></a-button>
      </a-card>

      <a-modal
        title="包裹入库"
        :visible="visible"
        @ok="handleOk"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
      >
        <a-form :form="form">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="运单号"
          >
            <a-input v-decorator="['id']" v-model="update.id" />
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="收件人"
          >
            <a-input v-decorator="['name']" v-model="update.name" />
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="电话"
          >
            <a-input v-decorator="['phoneNumber']" v-model="update.phoneNumber" />
          </a-form-item>
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="重量"
          >
            <a-input v-decorator="['weight']" />
          </a-form-item>
        </a-form>
      </a-modal>

      <a-table
        :columns="columns"
        :rowKey="record => record.id"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        style="width: 1000px"
      >
        <template slot="action" slot-scope="text, record">
          <span slot="action" @click="updateStatus(record)">
            <a href="javascript:;">确认收货</a>
            <a-divider type="vertical" />
          </span>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import reqwest from "reqwest";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 }
};
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 }
};
const columns = [
  {
    title: "Package No",
    dataIndex: "id",
    width: "20%"
  },
  {
    title: "Name",
    dataIndex: "name",
    width: "20%"
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber"
  },
  {
    title: "Status",
    dataIndex: "status"
  },
  {
    title: "Appointment Time",
    dataIndex: "appointmentTime"
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];
export default {
  mounted() {
    this.fetch();
  },
  data() {
    return {
      data: [],
      update: {
        id: null,
        name: null,
        phoneNumber: null
      },
      pagination: {},
      loading: false,
      columns,
      visible: false,
      confirmLoading: false,
      formItemLayout,
      formTailLayout,
      form: this.$form.createForm(this)
    };
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      });
    },
    fetch(params = {}) {
      this.loading = true;
      reqwest({
        url: "http://localhost:8080/package-boys",
        method: "get",
        data: {
          results: 10,
          ...params
        },
        type: "json"
      }).then(data => {
        const pagination = { ...this.pagination };
        pagination.total = 20;
        this.loading = false;
        this.data = data;
        this.pagination = pagination;
      });
    },

    addPackage() {
      this.visible = true;
    },

    handleOk(e) {
      this.$store.dispatch("addPackage", { update: this.update });
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
      }, 2000);
    },

    handleCancel(e) {
      this.visible = false;
    },

    updateStatus(value){
      this.$store.dispatch("updateStatus", { value: value });
    }
  }
};
</script>

<style>
.ant-btn-primary {
  margin-right: 10px;
}
</style>

