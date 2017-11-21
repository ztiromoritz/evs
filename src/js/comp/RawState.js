import Vue from 'vue';
import Settings from '../Settings';
import InternalEvents from '../InternalEvents';

var i = 0;
export default new Vue({
  el: '#state',
  template: `<div id="state" class="card" v-if="this.showState">
                <b>State</b>
                <pre>{{this.getString()}}</pre>
                <div class="card-icon">
                    <i class="fa fa-microchip fa-2x" aria-hidden="true"></i>
                </div>
              </div>`,
  data: {
    value: {},
    showState: false
  },
  methods: {
    getString: function () {
      return JSON.stringify(this.value);
    },
    setExample(name) {
      const {showState} = Settings.getSettings(name);
      this.showState = showState;
    }
  },
  created() {
    InternalEvents.subscribeOnExampleChanges(({name}) => {
      this.setExample(name);
    });

    InternalEvents.subscribeOnTabChanges(({name}) => {

    });

    InternalEvents.subscribeOnStateChanged(({state}) => {
      //visual hack
      setTimeout(()=>{this.value = state;},0);

    })
  }

});