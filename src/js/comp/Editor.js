import ace from 'brace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import beautify from 'js-beautify';

import InternalEvents from '../InternalEvents';
import Settings from '../Settings';


export default class Editor {

  constructor($el, name = 'defaultActor') {
    this.$el = $el;
    this.example = name;
    this.user = 'Default';
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
    this.updateStorageKey();
    this.load();

    console.log("Create Editor")
    InternalEvents.subscribeOnExampleChanges(({name}) => {
      console.log("Editor Example Changed", name);
      this.setExample(name);
    });

    InternalEvents.subscribeOnTabChanges(({name}) => {
      this.setUser(name);
      console.log("user tab changes");
    });

  }

  setExample(example) {
    this.example = example;
    const {showEditor} = Settings.getSettings(example);
    console.log("SHOW EDITOR", showEditor, this.$el);
    if (!showEditor) {
      this.$el.style.opacity = 0;
    } else {
      this.$el.style.opacity = 1;
    }
    this.updateStorageKey();
    this.load();
  }

  setUser(user) {
    this.user = user;
    this.updateStorageKey();
    this.load();
  }

  updateStorageKey() {
    this.storageKey = `evs-editor-${this.example}-${this.user}`;
  }


  format() {
    this.editor.setValue(beautify(this.editor.getValue(), {indent_size: 1}));
    this.editor.clearSelection();
  }

  incFontSize() {
    this.fontSize += 2;
    this.editor.setOptions({
      fontSize: `${this.fontSize}pt`
    });
  }

  decFontSize() {
    this.fontSize -= 2;
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