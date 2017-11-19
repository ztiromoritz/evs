import Vue from 'vue';

import html from './slides.pug';

const parser = new DOMParser();

const $ = function (selector, node) {
  return (node || document).querySelector(selector);
};
const $$ = function (selector, node) {
  return [].slice.call((node || document).querySelectorAll(selector));
};

const getHash = function(){
    const hash = window.location.hash;
    if(typeof hash === 'string' && hash.length > 0 ){
      const mayBeNum = hash.substring(1);
      if(!Number.isNaN(mayBeNum)){
        return Number.parseInt(mayBeNum);
      }
    }
    return null;
};

const Key = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

new Vue({
  el: '#slides',
  template: `<div  v-on:click="onClick" id="slides" class="slides"  v-bind:class="{example: example}">
                <slide v-for="(slide, index) in slides" 
                v-html="slide.content" 
                class="slide" 
                v-bind:class="{ current: index === current , seen: index < current ,hidden: index > current}"></slide>
             </div>`,
  data: {
    current: 0,
    example: false,
    slides: []
  },
  methods: {
    next() {
      this.current = (this.current + 1) % this.slides.length;
      this.example = (this.slides[this.current].example);
      window.location.hash = this.current;
    },
    prev() {
      this.current > 0 && this.current--;
      this.example = (this.slides[this.current].example);
      window.location.hash = this.current;
    },
    onClick(e) {
      if (this.example) {
        if (e.ctrlKey) {
          this.prev();
        } else {
          this.next();
        }
      }
    }
  },
  created: function () {
    console.log(html());

    this.current = getHash() || 0;
    console.log("hash",window.location.hash);
    window.location.hash = this.current;

    const doc = parser.parseFromString(html(), 'text/html');

    this.slides = $$('section', doc).map((section) => {
      return {
        content: section.innerHTML,
        example: (typeof section.dataset.example !== 'undefined')
      }
    });

    this.example = (this.slides[this.current].example);

    window.addEventListener('keyup', (event) => {
      if (!this.example) {
        if (event.keyCode === Key.LEFT) {
          this.prev();
        } else if (event.keyCode === Key.RIGHT) {
          this.next();
        }
      }
    });
  }
});