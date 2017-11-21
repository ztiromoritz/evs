import Vue from 'vue';

const debug = new Vue({
  el: '#controls',
  template: `<div id="controls" class="card">
                <b>Debugger</b><br>
                <button class="btn btn-primary btn-custom" v-for="command in commands" v-on:click="command.execute">{{command.caption}}</button><br>
              </div>`,
  data: {
    current: 0,
    commands: [],
  },
  methods : {
    addCommand : function(command){
      this.commands.push(command);
    }
  }

});

export default debug;