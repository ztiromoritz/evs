import Vue from 'vue';
import Users from './Users';

const moveShadow = ([s_x, s_y, s_w, s_h], [t_x, t_y, t_w, t_h]) => {
  return new Promise((resolve) => {
    const $shadow = document.createElement('div');
    $shadow.classList.add('shadow');
    $shadow.style = `width: ${s_w}px; height: ${s_h}px; top: ${s_y}px; left: ${s_x}px;`;
    document.body.appendChild($shadow);
    const listener = () => {
      $shadow.removeEventListener("transitionend", listener);
      resolve($shadow);
    };
    $shadow.addEventListener("transitionend", listener, false);
    setTimeout(() => {
      $shadow.style = `width: ${t_w}px; height: ${t_h}px; top: ${t_y}px; left: ${t_x}px;`;
    }, 100);
  })
};


export default Vue.component('event', {
  template: `<div ref="node" 
                class="event chip"
                v-bind:class="{invisible: !event.visible, current: current, read: read}">
                <figure class="avatar avatar-sm" v-bind:class="figureClass" data-initial="">
                   <i class="twa twa-2x" v-bind:class="iconClass" style="margin: 8px;"></i>    
                </figure>
                    {{event.caption}}
                
                
                </div>`,
  props: ['event', 'current', 'read'],
  computed: {
    iconClass: function () {
      const classes = {
        'twa': true,
        'twa-tlg': true
      };
      const user = Users[this.event.user];

      if (user) {
        classes[user.iconClass] = true;
      }else {
        classes[Users['Default'].iconClass] = true;
      }
      return classes;
    },
    figureClass: function(){
      const classes = {};
      const user = Users[this.event.user];
      if (user) {
        classes[user.bgClass] = true;
      }else{
        classes[Users['Default'].bgClass] = true;
      }
      return classes;
    }
  },
  methods: {
    moveShadowFromEventTo: function ($target) {
      if($target){
        const target_rect = $target.getBoundingClientRect();
        const target = [target_rect.left, target_rect.top, target_rect.width, target_rect.height];
        const source_rect = this.$refs['node'].getBoundingClientRect();
        const source = [source_rect.left, source_rect.top, source_rect.width, source_rect.height];
        return moveShadow(source, target);
      }else{
        return Promise.resolve();
      }
    }
  },
  mounted: function () {
    if (this.event.source) {
      //animate source
      const [s_x, s_y] = this.event.source;
      const t_rect = this.$refs['node'].getBoundingClientRect();

      const source = [s_x, s_y, 10, 10];
      const target = [t_rect.left, t_rect.top, t_rect.width, t_rect.height];
      moveShadow(source, target).then(
        ($shadow) => {
          this.event.visible = true;
          document.body.removeChild($shadow);
        });
    } else {
      this.event.visible = true
    }
  }
});

