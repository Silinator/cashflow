window.addEventListener('load', () => {
  console.log( 'ready' );
  createVueApp();
  registerServiceWorker();
});


/* ==== register serviceWorker ==== */
function registerServiceWorker() {
  if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceWorker.js').then(function(registration) {
      // Registration was successful
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  }
}


/* ==== vue app ==== */
function createVueApp() {
  const bus = new Vue();
  Vue.prototype.$bus = bus;

  const app = new Vue({
    el: '#app',
    data() {
      return {
        totalIncome: 0,
        passiveIncome: 0,
        totalExpenses: 0
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

        <income/>
        <expenses/>
        <financial-assets/>
        <obligations/>
      </div>
    `,
    computed: {
      cashflow() {
        return this.totalIncome - this.totalExpenses;
      }
    },
    created() {
      this.$bus.$on( 'update', ( field, value ) => {
        this[ field ] = value;
      });
    }
  });
}
