import Vue from 'vue';
import Settings from '../Settings';
import InternalEvents from '../InternalEvents';
import Users from './Users';

export default new Vue({
  el: '#tabs',
  template : `<div id="tabs" v-if="this.enableUser">
               <ul class="tab tab-block">
                  <li v-for="user in allUsers" class="tab-item" :class="{active: user.name === active}">
                        <a href="#" @click="changeUser(user.name)">
                          <div class="tab-circle general-circle" :class="circleClass(user.name)">
                           <i class="twa twa-2x" :class="iconClass(user.name)"></i>
                          </div>
                          {{user.name}}
                        </a>
                    </li>
               
              </ul>
              </div>`,
  data: {
    enableUser : false,
    active: 'Default'
  },
  computed : {
    allUsers : ()=> {
      return Object.entries(Users)
        .map(([name, data]) => Object.assign({}, data, {name}));
    }
  },
  methods: {
    setExample(name){
      const {enableUser} = Settings.getSettings(name);
      this.enableUser = enableUser;
    },
    changeUser(name){
      console.log("Change user", name);
      this.active = name;
      InternalEvents.tabChanged(name);
    },
    iconClass(name){
      const className = Users[name] && Users[name].iconClass;
      if(className) {
        const result = {};
        result[className] = true;
        return result;
      }
      return {};
    },
    circleClass(name){
      const className = Users[name] && Users[name].bgClass;
      if(className) {
        const result = {};
        result[className] = true;
        return result;
      }
      return {};
    },
    emitState(){
      InternalEvents.tabChanged(this.active);
    }
  },
  created(){

    InternalEvents.subscribeOnExampleChanges(({name})=>{
      this.setExample(name);
    });
  }
});