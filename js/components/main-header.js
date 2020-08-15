Vue.component( 'main-header', {
  props: ['passiveIncome', 'totalIncome', 'totalExpenses', 'cashflow'],
  template: `
    <div class="mainHeader">
      <div class="mainHeaderRow">
        <div class="mainHeaderRowTitle">Passives Einkommen</div>
        <div class="mainHeaderRowInfo">{{passiveIncomeText}}</div>
      </div>
      <div class="mainHeaderRow">
        <div class="mainHeaderRowTitle">Gesamtes Einkommen</div>
        <div class="mainHeaderRowInfo">{{totalIncomeText}}</div>
      </div>
      <div class="mainHeaderRow">
        <div class="mainHeaderRowTitle">Gesamte Ausgaben</div>
        <div class="mainHeaderRowInfo">{{totalExpensesText}}</div>
      </div>
      <div class="mainHeaderBigRow">
        <div class="mainHeaderRowTitle">Monatlicher Cashflow</div>
        <div class="mainHeaderRowInfo">{{cashflowText}}</div>
      </div>
    </div>
  `,
  computed: {
    passiveIncomeText() {
      return this.formatNum( this.passiveIncome );
    },
    totalIncomeText() {
      return this.formatNum( this.totalIncome );
    },
    totalExpensesText() {
      return this.formatNum( this.totalExpenses );
    },
    cashflowText() {
      return this.formatNum( this.cashflow );
    },
  },
  methods: {
    formatNum( nStr ) {
      nStr += '';
      var x = nStr.split('.');
      var x1 = x[0];
      var x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;

      while( rgx.test( x1 ) ) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }
      var res = x1 + x2;

      return res.replace( /,/g, '\'' ) + " Fr.";
    }
  }
});
