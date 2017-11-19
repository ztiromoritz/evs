import Vue from 'vue';

const commands = new Vue({
  el: '#commands',
  template: `<div id="commands" class="card">
                <b>Commands</b><br>
                <button class="btn" v-for="command in commands" v-on:click="command.execute">{{command.caption}}</button><br>
              </div>`,
  data: {
    current: 0,
    commands: [
      {
        caption: "Pay out 3€!", execute: (e) => {

        const newEvent = {
          type: 'PAYED_OUT',
          amount: 10,
          caption: "PAYED_OUT 10€",
        };
        commands.eventStore.push(newEvent);
        commands.eventList.addEvent(Object.assign({}, newEvent, {source: [e.pageX, e.pageY]}));
      }
      }
    ],
    eventStore: null,
    eventList: null
  }
});

export default commands;