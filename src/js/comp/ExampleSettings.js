import Vue from 'vue';
import Settings from '../Settings';
import InternalEvents from '../InternalEvents';

import eventList from './EventList';
import currentState from '../CurrentState';


Vue.component('exampleSettings', {
  template: `<div class="modal" v-bind:class="{active: active}">
                  <div class="modal-overlay"></div>
                  <div class="modal-container">
                    <div class="modal-header">
                      <button class="btn btn-clear float-right" v-on:click="onHideInternal"></button>
                      <div class="modal-title h5">Settings [{{exampleName}}]</div>
                    </div>
                    <div class="modal-body">
                      <div class="content">
                      <!-- -->
                      <div class="form-group">
                          <label class="form-switch">
                            <input type="checkbox" v-model="settings.enableUser">
                            <i class="form-icon"></i> Show users (<i class="twa twa twa-panda-face"></i>,<i class="twa twa twa-cow-face"></i>)
                          </label>
                          <br>
                          
                          <label class="form-switch">
                            <input type="checkbox" v-model="settings.showView">
                            <i class="form-icon"></i> Show view
                          </label>
                          <br>
                      
                          <label class="form-switch">
                            <input type="checkbox" v-model="settings.showEditor">
                            <i class="form-icon"></i> Show editor
                          </label>
                          <br>  
                          
                          <label class="form-switch">
                            <input type="checkbox" v-model="settings.showState">
                            <i class="form-icon"></i> Show state
                          </label>
                          <br>
                      </div>
                       <button id="clear" class="btn btn-primary" v-on:click="clearEventList">Clear current event store</button>
  
                      </div>
                    </div>
                  </div>
                </div>`,

  props: ['exampleName', 'active', 'onHide'],
  data: function() {
    return {
      settings: Settings.getSettings(this.exampleName)
    };
  },
  methods: {
    onHideInternal() {
      console.log("onHideInternal",this.settings);
      Settings.saveSettings(this.exampleName, this.settings);
      InternalEvents.exampleChanged(this.exampleName);
     // this.active = false;
      this.onHide();
    },
    clearEventList(){
      eventList.clear();
    },
    store() {

    }
  },
  mounted: function () {

  }
});

