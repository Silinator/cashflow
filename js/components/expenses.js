Vue.component( 'expenses', {
  data() {
    return {
      fields: [
        {
          name: "Steuern",
          quantity: null,
          value: 0,
        },
        {
          name: "Eigenheim-Hypothek/Miete",
          quantity: null,
          value: 0,
        },
        {
          name: "BAföG-Darlehenszahlung",
          quantity: null,
          value: 0,
        },
        {
          name: "Autokreditzahlung",
          quantity: null,
          value: 0,
        },
        {
          name: "Kreditkartenzahlung",
          quantity: null,
          value: 0,
        },
        {
          name: "Verbraucherkredit Zahlung",
          quantity: null,
          value: 0,
        },
        {
          name: "Sonstige Ausgaben",
          quantity: null,
          value: 0,
        },
        {
          name: "Kinder-Ausgaben",
          quantity: 0,
          value: 0,
        },
        {
          name: "Bankdarlehenszahlung",
          quantity: null,
          value: 0,
        },
      ]
    }
  },
  template: `
    <div class="card">
      <h1 class="cardTitle redTitle">Ausgaben</h1>

      <div v-for="( field, index ) in fields" :class="field.quantity === null ? 'singleInputContainer' : 'doubleInputContainer'">
        <div class="singleInputTitle">{{field.name}}:</div>
        <input v-if="field.quantity !== null" class="doubleInput" @change="update(index, 'quantity', $event)" type="tel" :value="field.quantity"/>
        <input class="singleInput" @change="update(index, 'value', $event)" type="tel" :value="field.value"/>
        <div class="inputLable">Fr.</div>
      </div>
    </div>
  `,
    watch: {
      totalExpenses: function( value ) {
        this.$bus.$emit( 'update', 'totalExpenses', value );
      }
    },
    methods: {
      update( index, subField, event ) {
        this.fields[ index ][ subField ] = parseInt( event.target.value );
      }
    },
    computed: {
      totalExpenses() {
        return this.fields.reduce( (a, b) => a + parseInt( b.value * ( b.quantity !== null ? b.quantity : 1 )  ), 0 );
      },
    }
  });
