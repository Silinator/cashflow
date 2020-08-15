const bus = new Vue();
Vue.prototype.$bus = bus;

const app = new Vue({
  el: '#app',
  data() {
    return {
      totalIncome: 0,
      passiveIncome: 0
    }
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

      <income />
    </div>
  `,
  computed: {
    totalExpenses() {
      return 3814; // test val
    },
    cashflow() {
      return this.totalIncome - this.totalExpenses;
    }
  },
  created() {
    this.$bus.$on( 'update', ( field, value ) => {
      this[ field ] = value;
    });
  }
})
