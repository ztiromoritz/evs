import Vue from 'vue';
import Chart from 'chart.js';
import Settings from '../Settings';
import InternalEvents from '../InternalEvents';

export default new Vue({
  el: '#view',
  template: `<div id="view" class="card"  v-if="this.showView">
                <b>View</b>
                <canvas v-bind:class="{invisible: !value.history}" ref="canvas" id="myChart" width="100%" height="50px"></canvas>
                <div class="card-icon">
                    <i class="fa fa-eye fa-2x" aria-hidden="true"></i>
                </div>
              </div>`,
  data: {
    value: {},
    showView: false
  },
  methods: {
    setExample(name) {
      const {showView} = Settings.getSettings(name);
      this.showView = showView;
    }
  },
  mounted: function () {

    this.config = {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'balance',
          data:
            []
        }]
      }
    };

    if (this.$refs['canvas']) {
      const ctx = this.$refs['canvas'].getContext('2d');
      this.chart = new Chart(ctx, this.config);
    }
  },
  beforeUpdate() {
    if (this.value.history) {
      const history = (this.value.history || []);
      this.config.data.datasets[0].data = history;
      this.config.data.labels = history.map(() => '');
      this.chart.update();
      console.log('beforeUpdate');
    }
  },
  created() {
    InternalEvents.subscribeOnExampleChanges(({name}) => {
      this.setExample(name);
    });
  }
});