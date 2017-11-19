import Vue from 'vue';
import Settings from '../Settings';
import InternalEvents from '../InternalEvents';

export default new Vue({
  el: '#tabs',
  template : `<div id="tabs" v-if="this.enableUser">
               <ul class="tab tab-block">
                  <li class="tab-item">
                      
                      <a href="#"><div class="tab-circle general-circle">
                      </div>All</a>
                  </li>
                  <li class="tab-item">
                      
                      <a href="#" class="active">
                      <div class="tab-circle alice-circle">
                              <i class="twa twa-2x twa-panda-face"></i>
                      </div>Alice</a>
                  </li>
                  <li class="tab-item">
                      
                      <a href="#">
                      <div class="tab-circle bob-circle">
                          <i class="twa twa-2x twa-cow-face"></i>
                      </div>
                      Bob</a>
                  </li>
              </ul>
              </div>`,
  data: {
    enableUser : false
  },
  methods: {
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