import Vue from 'vue';
import Settings from '../Settings';
import InternalEvents from '../InternalEvents';

const commands = new Vue({
  el: '#commands',
  template: `<div id="commands" class="card">
                <b>Commands</b>
                <div class="columns">
                <div class="column col-12">  
                    <button class="btn btn-primary btn-custom btn-sm" v-for="command in commands" v-on:click="command.execute">{{command.caption}}</button>
                </div>
                </div>
                
                <form class="form-horizontal">
                  <div class="form-group">
                    <div class="col-3">
                      <label class="form-label label-sm" for="amount">Amount</label>
                    </div>
                    <div class="col-9">
                      <input class="form-input input-sm" type="number" id="amount" placeholder="10" v-model="amount" >
                    </div>
                  </div>
                  
                  <div v-if="enableUser" class="form-group">
                    <div class="col-3">
                      <label class="form-label lable-sm" for="input-example-1">User</label>
                    </div>
                    <div class="col-9">
                      <select class="form-select select-sm" v-model="user">
                          <option>Alice</option>
                          <option>Bob</option>
                      </select>
                    </div>
                  </div>
                 
                </form>
                
               
              </div>`,
  data: {
    current: 0,
    amount: 11,
    user:'',
    enableUser : false,
    commands: [
      {
        caption: "Pay out", execute: (e) => {
        const newEvent = {
          type: 'PAYED_OUT',
          amount: commands.amount,
          user: commands.user,
          caption: `PAYED_OUT ${commands.amount}€`,
        };
        commands.eventList.addEvent(Object.assign({}, newEvent, {source: [e.pageX, e.pageY]}));
        }
      },
      {
        caption: "Pay in", execute: (e) => {
          const newEvent = {
            type: 'PAYED_IN',
            amount: commands.amount,
            user: commands.user,
            caption: `PAYED_IN ${commands.amount}€`,
          };
          commands.eventList.addEvent(Object.assign({}, newEvent, {source: [e.pageX, e.pageY]}));
        }
      }
    ],
    eventList: null
  },
  methods : {
    setExample(name){
      const {enableUser} = Settings.getSettings(name);
      this.enableUser = enableUser;
    }
  },
  created(){
    InternalEvents.subscribeOnExampleChanges(({name})=>{
      this.setExample(name);
    });
  }
});

export default commands;