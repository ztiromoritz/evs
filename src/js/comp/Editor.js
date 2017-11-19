import ace from 'brace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import beautify from 'js-beautify';

import InternalEvents from '../InternalEvents';
import Settings from '../Settings';



export default class Editor {

  constructor($el, name = 'defaultActor') {
    this.$el = $el;
    this.name = name;
    this.editor = ace.edit($el);
    this.editor.getSession().setMode("ace/mode/javascript");

    this.editor.getSession().on('change', () => {
      this.store()
    });
    this.fontSize = 20;
    this.editor.setOptions({
      tabSize: 2,
      fontSize: `${this.fontSize}pt`
    });
    this.storageKey = `evs-editor-${this.name}`;
    this.load();

    InternalEvents.subscribeOnExampleChanges(({name})=>{
      console.log("subscribeOnExampleChanges",  name);
      this.setExample(name);
    });

  }

  setExample(name){
    const {showEditor} = Settings.getSettings(name);
    console.log("SHOW EDITOR", showEditor,this.$el);
    if(!showEditor){
      this.$el.style.opacity = 0;
    }else{
      this.$el.style.opacity = 1;
    }
  }

  format() {
    this.editor.setValue(beautify(this.editor.getValue(), {indent_size: 1}));
    this.editor.clearSelection();
  }

  incFontSize(){
    this.fontSize+=2;
    this.editor.setOptions({
      fontSize: `${this.fontSize}pt`
    });
  }

  decFontSize(){
    this.fontSize-=2;
    this.editor.setOptions({
      fontSize: `${this.fontSize}pt`
    });
  }

  load() {
    this.editor.setValue(localStorage.getItem(this.storageKey) || '');
  }

  store() {
    localStorage.setItem(this.storageKey, this.editor.getValue());
  }

  getValue() {
    return this.editor.getValue();
  }
}