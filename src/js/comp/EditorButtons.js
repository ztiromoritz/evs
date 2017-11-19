import Vue from 'vue';

const editorButtons = new Vue({
  el: '#editorButtons',
  template: `
        <div id="editorButtons" class="buttons">
            <button class="btn btn-sm"  v-for="command in commands" v-on:click="command.execute"><i>{{command.caption}}</i></button>
        </div>`,
  data: {
    commands: []
  },
  methods : {
    addCommand : function(command){
      this.commands.push(command);
    }
  }

});

export default editorButtons;