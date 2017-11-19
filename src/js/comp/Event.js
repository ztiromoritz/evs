import Vue from 'vue';

export default Vue.component('event', {
  template: `<div ref="node" 
                class="event tile tile-centered"
                v-bind:class="{invisible: !event.visible, current: current, read: read}">
                
                  <div class="tile-icon">
                    <div class="example-tile-icon">
                      <i class="icon icon-arrow-right centered"></i>
                    </div>
                  </div>
                  

   
                  <div class="tile-content">
                    <div class="tile-title">{{event.caption}}</div>
                  </div>
                
                
                
                </div>`,
  props: ['event', 'current', 'read'],
  methods: {
    getRect: function () {
      return this.$refs['node']
    }
  },
  mounted: function () {
    if (this.event.source) {
      //animate source
      const [s_x, s_y] = this.event.source;
      const t_rect = this.$refs['node'].getBoundingClientRect();
      const $shadow = document.createElement('div');
      $shadow.classList.add('shadow');
      $shadow.style = `width: 10px; height: 10px; top: ${s_y}px; left: ${s_x}px;`;
      document.body.appendChild($shadow);
      $shadow.addEventListener("transitionend", () => {
        if ($shadow.parentNode) {//fires for every property
          this.event.visible = true;
          document.body.removeChild($shadow);
        }
      }, false);
      setTimeout(() => {
        $shadow.style = `width: ${t_rect.width}px;
                            height: ${t_rect.height}px;
                            top: ${t_rect.top}px;
                            left: ${t_rect.left}px;`;
      }, 100);
    } else {
      this.event.visible = true
    }
  }
});
/*Vue.component('event',{
template : `<div class="event" v-bind:class="{invisible: isInvisible}">{{caption}}</div>`
props:['caption'],
data: {
  isInvisible : false
},
methods : {
  getRect : function(){
    return this.$refs['node']
  }
}
});*/

