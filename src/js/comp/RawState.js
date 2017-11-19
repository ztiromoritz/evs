import Vue from 'vue';
import stringify from "json-stringify-pretty-compact";
import Settings from '../Settings';
import InternalEvents from '../InternalEvents';

export default new Vue({
  el: '#state',
  template : `<div id="state" class="card" v-if="this.showState">
                <b>State</b>
                <pre>{{this.getString()}}</pre>
                <div class="card-icon">
                    <i class="fa fa-microchip fa-2x" aria-hidden="true"></i>
                </div>
              </div>`,
  data: {
    value : {},
    showState : false
  },
  methods: {
    getString : function(){
     return JSON.stringify(this.value);
      // return stringify(this.value, {maxLength: 80, indent: 1});
    },
    setExample(name){
      const {showState} = Settings.getSettings(name);
      this.showState = showState;
    }
  },
  created(){
    InternalEvents.subscribeOnExampleChanges(({name})=>{
      this.setExample(name);
    });
  }

});