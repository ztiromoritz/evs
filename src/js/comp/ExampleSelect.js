import Vue from 'vue';

import InternalEvents from '../InternalEvents';

const localStorageKey = 'evs-examples';
const localStorageCurrentExample = 'evs-current-example';

export default new Vue({
  el: '#example',
  template: `<div id="example">
                <select class="form-select" v-model="selected"  @change="change">
                    <option v-bind:value="-1">Select Example </option>
                    <option  class="icon-asterisk"
                        v-for="(example,index) in examples" 
                        v-bind:key="index" 
                        v-bind:value="index"
                        ref=children><b>{{example}}</b></option>
                    <option v-bind:value="-2">New Example...</option>
                </select>
                <button class="btn btn-action" @click="onShowSettings">
                   <i class="fa fa-cog" aria-hidden="true"></i>
                </button>
                <exampleSettings v-bind:exampleName="getName()" v-bind:active="showSettings" v-bind:onHide="onHideSettings"></exampleSettings>
              </div>`,
  data: {
    selected: -1,
    examples: [],
    showSettings: false,
  },
  methods: {
    onShowSettings() {
      this.showSettings = true;
    },
    onHideSettings() {
      this.showSettings = false;
      //Todo StoreSettings
    },
    getName() {
      if (this.selected >= 0) {
        return this.examples[this.selected];
      }
      return "Default Settings";
    },
    store() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.examples));
      localStorage.setItem(localStorageCurrentExample, this.selected);
    },
    load() {
      this.examples = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
      this.selected = -1;
      const current = localStorage.getItem(localStorageCurrentExample);
      if (current
        && !Number.isNaN(current)
        && Number.parseInt(current) >= 0
        && Number.parseInt(current) < this.examples.length) {
        this.selected = current;
      }
      InternalEvents.exampleChanged(this.examples[this.selected]);
    },
    emitState(){
      InternalEvents.exampleChanged(this.examples[this.selected]);
    },
    change(e) {
      const value = e.target.value;
      if (value == -2) {
        const newIndex = this.examples.length;
        this.examples.push(`Example ${newIndex}`);
        this.selected = newIndex;
        this.store();
        InternalEvents.exampleChanged(this.examples[newIndex]);
      } else if (value >= 0) {
        InternalEvents.exampleChanged(this.examples[value]);
        this.store();
      }
    }
  },
  created() {
    this.load();
  }
});