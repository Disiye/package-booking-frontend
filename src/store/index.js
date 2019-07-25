import Vue from 'vue'
import Vuex from 'vuex'
import menu from './menu'
import resume from './resume'
import axios from 'axios'
import { async } from 'q';

Vue.use(Vuex)

const state = {
  package: {

  },
}

const getters = {

}

const mutations = {
  initData(state, data) {
    data.forEach(e => {
      let item = {
        id: e.id,
        name: e.name,
        complete: e.complete,
        phoneNumber: e.phoneNumber,
        status: e.status,
        appointmentTime: e.appointmentTime
      }
      state.package.push(item)
    })
  }
}

const actions = {

  async addPackage(state, context) {
    axios({
      method: 'post',
      url: 'http://localhost:8080/package-boys',
      data: {
        "id": context.update.id,
        "name": context.update.name,
        "phoneNumber": context.update.phoneNumber
      }
    })
  },

  async userUpdate(state, context) {
    axios({
      method: 'put',
      url: 'http://localhost:8080/package-boys/' + context.userUpdate.id,
      data: {
        "id": context.userUpdate.id,
        "status": "已预约",
        "appointmentTime": context.userUpdate.appointmentTime
      }
    })
  },

  async updateStatus (state,context){
    axios({
      method: 'put',
      url: 'http://localhost:8080/package-boys/' + context.value.id,
      data: {
        "status": "已取件",
      }
    });
  }

}




export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    menu,
    resume
  }
})