import Vue from 'vue';
import InternalEvents from '../InternalEvents';
import Settings from '../Settings';

const debug = new Vue({
  el: '#controls',
  template: `<div id="controls" class="card" v-if="this.showDebugger">
                <b>Debugger</b>
                <button class="btn btn-sm btn-primary btn-custom" v-for="command in commands" v-on:click="command.execute">{{command.caption}}</button><br>
                <span style="color: gray">Current Event: {{current}}</span>
              </div>`,
  data: {
    current: 0,
    commands: [],
    showDebugger : false
  },
  methods : {
    addCommand : function(command){
      this.commands.push(command);
    },
    setExample(name) {
      const {showDebugger} = Settings.getSettings(name);
      this.showDebugger = showDebugger;
    }
  },
  created(){
    InternalEvents.subscribeOnStateChanged(({current}) => {
      this.current = current;
    });

    InternalEvents.subscribeOnExampleChanges(({name}) => {
      this.setExample(name);
    });
  }

});

export default debug;