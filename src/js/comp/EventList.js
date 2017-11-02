import Vue from 'vue';

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
                        ref="event.id"></event>
                </div>
              </div>`,
  data: {
    current: 0,
    events: [
      //Stored events
    ]
  },
  methods: {
    addEvent: function (event) {
      const _event = Object.assign({}, event, {id: this.events.length, visible: false});
      this.events.push(_event);
    },
    setCurrent(index) {
      this.current = index;
    }
  }
});