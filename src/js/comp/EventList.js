import Vue from 'vue';
import InternalEvents from '../InternalEvents';



export default new Vue({
  el: '#events',
  template: `<div id="events" class="card">
                <div>
                    <b>Events</b>
                </div>
                <div id="eventList">
                <event v-for="(event,index) in events" 
                        v-bind:event="event" 
                        v-bind:current="index===current"  
                        v-bind:read="index<current"
                        v-bind:key="event.id" 
                        ref=children></event>
                </div>
                <div class="card-icon">
                    <i class="fa fa-hdd-o fa-2x" aria-hidden="true"></i>
                </div>
              </div>`,
  data: {
    current: 0,
    events: []
  },
  methods: {
    addEvent(event) {
      const _event = Object.assign({}, event, {id: this.events.length, visible: false});
      this.events.push(_event);
      this.store();
    },
    getLength(){
      return this.events.length;
    },
    setCurrent(index) {
      this.current = index;
    },
    getEvent(index){
      return this.events[index];
    },
    getComponent(index){
      console.log(this.$refs);
      return this.$refs['children'][index];
    },
    clear(){
      this.events = [];
      this.store();
    },
    store(){
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.events));
    },
    load(){
      this.events = JSON.parse(localStorage.getItem(this.localStorageKey)||'[]')
        .map((event)=>{delete event.source; return event;});
    }
  },
  created(){
    this.localStorageKey = 'evs-event-store';
    this.load();


    InternalEvents.subscribeOnExampleChanges(({name})=>{
      console.log("Receive",name);
      this.localStorageKey = `evs-event-store-${name}`;
      this.load();
    });

    InternalEvents.subscribeOnStateChanged(({state,current})=>{
      this.setCurrent(current);
    });
  }
});