import Vue from 'vue';

export default new Vue({
  el: '#state',
  template : `<div id="state" class="card">
                <b>State</b>
                <pre>{{JSON.stringify(value,null,2)}}</pre>
              </div>`,
  data: {
    value : {}
  }
});