import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'
import Table from '../template/Table.vue'
import ExportTable from '../template/ExportTable.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/table',
      name: 'table',
      component: Table
    },
    {
      path: '/ExportTable',
      name: 'exportTable',
      component: ExportTable
    }
  ]
})