Vue.component( 'income', {
  data() {
    return {
      wage: 0,
      interest: 0,
      dividends: [ { name: "", value: 0 } ],
      realEstates: [ { name: "", value: 0 } ],
      businesses: [ { name: "", value: 0 } ],
    }
  },
  template: `
    <div class="card">
      <h1 class="cardTitle greenTitle">Einkommen</h1>

      <div class="singleInputContainer">
        <div class="singleInputTitle">Lohn/Gehalt</div>
        <input class="singleInput" @change="update('wage', $event)" type="tel" :value="wage"/>
        <div class="inputLable">Fr.</div>
      </div>

      <div class="singleInputContainer">
        <div class="singleInputTitle">Zinsen</div>
        <input class="singleInput" @change="update('interest', $event)" type="tel" :value="interest"/>
        <div class="inputLable">Fr.</div>
      </div>

      <div class="multiInputContainer">
        <h2 class="cardSmallTitle">Dividenden</h2>
        <div v-for="( dividend, index ) in dividends" class="singleInputContainer">
          <input class="singleInputTitle" @change="updateMulti('dividends', index, 'name', $event)" type="text" :value="dividend.name"/>
          <input class="singleInput" @change="updateMulti('dividends', index, 'value', $event)" type="tel" :value="dividend.value"/>
          <div class="inputLable">Fr.</div>
        </div>
        <div class="btn" @click="add('dividends')"><span class="material-icons">add</span> Hinzufügen</div>
      </div>

      <div class="multiInputContainer">
        <h2 class="cardSmallTitle">Immobilien</h2>
        <div v-for="( realEstate, index ) in realEstates" class="singleInputContainer">
          <input class="singleInputTitle" @change="updateMulti('realEstates', index, 'name', $event)" type="text" :value="realEstate.name"/>
          <input class="singleInput" @change="updateMulti('realEstates', index, 'value', $event)" type="tel" :value="realEstate.value"/>
          <div class="inputLable">Fr.</div>
        </div>
        <div class="btn" @click="add('realEstates')"><span class="material-icons">add</span> Hinzufügen</div>
      </div>

      <div class="multiInputContainer">
        <h2 class="cardSmallTitle">Geschäfte</h2>
        <div v-for="( business, index ) in businesses" class="singleInputContainer">
          <input class="singleInputTitle" @change="updateMulti('businesses', index, 'name', $event)" type="text" :value="business.name"/>
          <input class="singleInput" @change="updateMulti('businesses', index, 'value', $event)" type="tel" :value="business.value"/>
          <div class="inputLable">Fr.</div>
        </div>
        <div class="btn" @click="add('businesses')"><span class="material-icons">add</span> Hinzufügen</div>
      </div>
    </div>
  `,
    watch: {
      totalIncome: function( value ) {
        this.$bus.$emit( 'update', 'totalIncome', value );
      },
      passiveIncome: function( value ) {
        this.$bus.$emit( 'update', 'passiveIncome', value );
      }
    },
    methods: {
      save() {
        localStorage.income = JSON.stringify({
          wage: this.wage,
          interest: this.interest,
          dividends: this.dividends,
          realEstates: this.realEstates,
          businesses: this.businesses
        });
      },
      update( field, event ) {
        this[ field ] = parseInt( event.target.value );

        this.save();
      },
      updateMulti( field, index, subField, event ) {
        this[ field ][ index ][ subField ] = subField === "value" ? parseInt( event.target.value ) : event.target.value;

        this.save();
      },
      add( field ) {
        this[ field ].push({
          name: "",
          value: 0
        });

        this.save();
      }
    },
    computed: {
      passiveIncome() {
        const dividendsValue  = this.dividends.reduce( (a, b) => a + parseInt( b.value ), 0 );
        const realEstates     = this.realEstates.reduce( (a, b) => a + parseInt( b.value ), 0 );
        const businesses      = this.businesses.reduce( (a, b) => a + parseInt( b.value ), 0 );

        return this.interest + dividendsValue + realEstates + businesses;
      },
      totalIncome() {
        return this.passiveIncome + this.wage;
      }
    },
    created() {
      this.$bus.$on( 'loadFromSave', () => {
        if( localStorage.income ) {
          const { wage, interest, dividends, realEstates, businesses } = JSON.parse( localStorage.income );

          this.wage = wage;
          this.interest = interest;
          this.dividends = dividends;
          this.realEstates = realEstates;
          this.businesses = businesses;
        }
      });
    }
  });
