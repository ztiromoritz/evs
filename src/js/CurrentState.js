import InternalEvents from './InternalEvents';


class CurrentState {
  constructor() {
    this.current = 0; //current event from store
    this.state = null;

    this.example = 'Default';
    this.user = 'Default';
    this.updateStorageKey();

    InternalEvents.subscribeOnExampleChanges(({name}) => {
      console.log("Editor Example Changed", name);
      this.setExample(name);
    });

    InternalEvents.subscribeOnTabChanges(({name}) => {
      this.setUser(name);
      console.log("user tab changes");
    });

    this.load();
  }




  clear(){
    this.current = 0; //current event from store
    this.state = null;
    this.store();
    this.emit();
  }

  setExample(example) {
    this.example = example;
    this.updateStorageKey();
    this.load();
    this.emit();
  }

  setUser(user) {
    this.user = user;
    this.updateStorageKey();
    this.load();
    this.emit();
  }

  updateStorageKey() {
    this.storageKey = `evs-current-state-${this.example}-${this.user}`;
  }

  load() {
    const raw = localStorage.getItem(this.storageKey) || '{ "current": 0, "state": {} }';
    const data = JSON.parse(raw);
    this.current = data.current;
    this.state = data.state;
  }

  store() {
    const data = JSON.stringify({
      current: this.current,
      state: this.state
    });
    localStorage.setItem(this.storageKey, data);
  }

  transform(f) {

    if (typeof(f) === 'function') {
      const {state, current} = f({state: this.state, current: this.current});
      this.state = state;
      this.current = current;
      this.store();
    }
  }

  emit() {
    InternalEvents.stateChanged({ state: this.state, current: this.current });
  }

}

export default new CurrentState();






