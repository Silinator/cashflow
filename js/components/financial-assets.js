Vue.component( 'financial-assets', {
  data() {
    return {
      savings: 0,
      shares: [ { name: "", quantity: 0, value: 0, subValue: 0 } ],
      realEstates: [ { name: "", quantity: 0, value: 0, subValue: 0 } ],
      businesses: [ { name: "", quantity: 0, value: 0, subValue: 0 } ],
    }
  },
  template: `
    <div class="card">
      <h1 class="cardTitle">Vermögenswerte</h1>

      <div class="singleInputContainer">
        <div class="singleInputTitle">Ersparnisse</div>
        <input class="singleInput" @change="update('savings', $event)" type="tel" :value="savings"/>
        <div class="inputLable">Fr.</div>
      </div>

      <div class="largeMultiInputContainer">
        <div class="inputTitles">
          <h3 class="cardSmallTitle">Aktien/Fonds/CDs</h3>
          <h3 class="cardSmallTitle">Anteile</h3>
          <h3 class="cardSmallTitle">Kosten/Anteil</h3>
        </div>
        <div v-for="( share, index ) in shares" class="largeInputContainer">
          <input class="singleInputTitle" @change="updateMulti('shares', index, 'name', $event)" type="text" :value="share.name"/>
          <input class="singleInput" @change="updateMulti('shares', index, 'quantity', $event)" type="tel" :value="share.quantity"/>
          <input class="singleInput" @change="updateMulti('shares', index, 'value', $event)" type="tel" :value="share.value"/>
          <div class="inputLable">Fr.</div>
        </div>
        <div class="btn" @click="add('shares')"><span class="material-icons">add</span> Hinzufügen</div>
      </div>

      <div class="largeMultiInputContainer">
        <div class="inputTitles">
          <h3 class="cardSmallTitle">Immobilien</h3>
          <h3 class="cardSmallTitle">Anzahlung</h3>
          <h3 class="cardSmallTitle">Kosten</h3>
        </div>
        <div v-for="( realEstate, index ) in realEstates" class="largedoubleLableInputContainer">
          <input class="singleInputTitle" @change="updateMulti('realEstates', index, 'name', $event)" type="text" :value="realEstate.name"/>
          <input class="singleInput" @change="updateMulti('realEstates', index, 'quantity', $event)" type="tel" :value="realEstate.quantity"/>
          <div class="inputLable">Fr.</div>
          <input class="singleInput" @change="updateMulti('realEstates', index, 'value', $event)" type="tel" :value="realEstate.value"/>
          <div class="inputLable">Fr.</div>
        </div>
        <div class="btn" @click="add('realEstates')"><span class="material-icons">add</span> Hinzufügen</div>
      </div>

      <div class="largeMultiInputContainer">
        <div class="inputTitles">
          <h3 class="cardSmallTitle">Geschäfte</h3>
          <h3 class="cardSmallTitle">Anzahlung</h3>
          <h3 class="cardSmallTitle">Kosten</h3>
        </div>
        <div v-for="( business, index ) in businesses" class="largedoubleLableInputContainer">
          <input class="singleInputTitle" @change="updateMulti('businesses', index, 'name', $event)" type="text" :value="business.name"/>
          <input class="singleInput" @change="updateMulti('businesses', index, 'quantity', $event)" type="tel" :value="business.quantity"/>
          <div class="inputLable">Fr.</div>
          <input class="singleInput" @change="updateMulti('businesses', index, 'value', $event)" type="tel" :value="business.value"/>
          <div class="inputLable">Fr.</div>
        </div>
        <div class="btn" @click="add('businesses')"><span class="material-icons">add</span> Hinzufügen</div>
      </div>
    </div>
  `,
    methods: {
      save() {
        localStorage.financialAssets = JSON.stringify({
          savings: this.savings,
          shares: this.shares,
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

        if( field !== "shares" ) {
          this.$bus.$emit( 'updateList', field, this[ field ] );
        }

        this.save();
      },
      add( field ) {
        this[ field ].push({
          name: "",
          quantity: 0,
          value: 0,
          subValue: 0
        });

        if( field !== "shares" ) {
          this.$bus.$emit( 'addList', field, this[ field ] );
        }

        this.save();
      }
    },
    created() {
      this.$bus.$on( 'loadFromSave', () => {
        if( localStorage.financialAssets ) {
          const { savings, shares, realEstates, businesses } = JSON.parse( localStorage.financialAssets );

          this.savings = savings;
          this.shares = shares;
          this.realEstates = realEstates;
          this.businesses = businesses;
        }
      });
    },
    mounted() {
      if( !localStorage.obligations ) {
        this.$bus.$emit( 'addList', 'realEstates', this.realEstates );
        this.$bus.$emit( 'addList', 'businesses', this.businesses );
      }
    },
  });
