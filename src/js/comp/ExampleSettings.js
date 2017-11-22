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
                      <div class="panel">
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
                          
                          <label class="form-switch">
                            <input type="checkbox" v-model="settings.showDebugger">
                            <i class="form-icon"></i> Show debugger
                          </label>
                          <br>
                      </div>
                      
                       <button id="clear" class="btn btn-primary" v-on:click="clearEventList">Clear current event store</button>
  </div>
            
                       <div class="panel">
                       <div class="panel-header">
                            <div class="panel-title">Import/Export</div>
                        </div>
                        <div class="panel-body">
                            <textarea style="width: 100%" rows="5" v-model="dump"></textarea>
                        </div>
                        <div class="panel-footer">
                            <button id="exportData" class="btn btn-primary" v-on:click="exportData">Export</button>
                            <button id="importData" class="btn btn-primary" v-on:click="importData">Import (overrides all!!!)</button>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>`,

  props: ['exampleName', 'active', 'onHide'],
  data: function () {
    return {
      settings: Settings.getSettings(this.exampleName),
      dump: ""
    };
  },
  methods: {
    onHideInternal() {
      console.log("onHideInternal", this.settings);
      Settings.saveSettings(this.exampleName, this.settings);
      InternalEvents.exampleChanged(this.exampleName);
      // this.active = false;
      this.onHide();
    },
    clearEventList() {
      eventList.clear();
    },
    store() {

    }
    ,
    importData() {
      const data = JSON.parse(this.dump);
      console.log(data);
      Object.entries(data).forEach(([key, value]) => {
      // console.log(key,value);
        localStorage.setItem(key, value);
      });
    },
    exportData() {
      const data = {};
      for (let key in localStorage) {
        console.log(key);
        if (key.startsWith('evs') || key.startsWith('exampleSettings')) {
          data[key] = localStorage.getItem(key);
        }
      }
      this.dump = JSON.stringify(data, null, 2);
    }
  },
  mounted: function () {

  }
});

