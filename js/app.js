const bus = new Vue();
Vue.prototype.$bus = bus;

const app = new Vue({
  el: '#app',
  data: {
  },
  bus,
  template: `
    <div class="wrapper">
      <div class="navi">
        <div class="naviPoint active">Übersicht</div>
        <div class="naviPoint">Verlauf</div>
        <div class="naviPoint">Statistik</div>
      </div>

      <main-header :passiveIncome="passiveIncome" :totalIncome="totalIncome" :totalExpenses="totalExpenses" :cashflow="cashflow" />
    </div>
  `,
  computed: {
    passiveIncome() {
      return 1749; // test val
    },
    totalIncome() {
      return 4749; // test val
    },
    totalExpenses() {
      return 3814; // test val
    },
    cashflow() {
      return this.totalIncome - this.totalExpenses;
    }
  }
})
