Vue.component( 'obligations', {
  data() {
    return {
      fields: [
        {
          name: "Eigenheim-Hypothek",
          value: 0,
        },
        {
          name: "BAföG-Darlehen",
          value: 0,
        },
        {
          name: "Autokredite",
          value: 0,
        },
        {
          name: "Kreditkarten",
          value: 0,
        },
        {
          name: "Verbraucherkreditschulden",
          value: 0,
        },
        {
          name: "Bankdarlehen",
          value: 0,
        }
      ],
      realEstates: [],
      businesses: []
    }
  },
  template: `
    <div class="card">
      <h1 class="cardTitle">Verbindlichkeiten</h1>

      <div v-for="( field, index ) in fields" class="singleInputContainer">
        <div class="singleInputTitle">{{field.name}}:</div>
        <input class="singleInput" @change="update(index, 'value', $event)" type="tel" :value="field.value"/>
        <div class="inputLable">Fr.</div>
      </div>

      <div class="multiInputContainer">
        <h2 class="cardSmallTitle">Immobilien-Hypotheken:</h2>
        <div v-for="( realEstate, index ) in realEstates" class="singleInputContainer">
          <div class="singleInputTitle">{{realEstate.name}}</div>
          <input class="singleInput" @change="updateMulti('realEstates', index, 'subValue', $event)" type="tel" :value="realEstate.subValue"/>
          <div class="inputLable">Fr.</div>
        </div>
      </div>

      <div class="multiInputContainer">
        <h2 class="cardSmallTitle">Verbindlichkeiten (Geschäft):</h2>
        <div v-for="( business, index ) in businesses" class="singleInputContainer">
          <div class="singleInputTitle">{{business.name}}</div>
          <input class="singleInput" @change="updateMulti('businesses', index, 'subValue', $event)" type="tel" :value="business.subValue"/>
          <div class="inputLable">Fr.</div>
        </div>
      </div>
    </div>
  `,
    methods: {
      update( index, subField, event ) {
        this.fields[ index ][ subField ] = parseInt( event.target.value );
      },
      updateMulti( field, index, subField, event ) {
        this[ field ][ index ][ subField ] = subField === "subValue" ? parseInt( event.target.value ) : event.target.value;
      }
    },
    created() {
      this.$bus.$on( 'updateList', ( field, obj ) => {
        this[ field ] = obj;
      });
    }
  });
