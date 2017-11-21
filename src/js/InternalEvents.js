import Rx from 'rxjs/Rx';


const Events = {
  EXAMPLE_CHANGED: 'example-changed',
  TAB_CHANGED: 'tab-changed',
  STATE_CHANGED : 'state-changed'
};

// ?????

class InternalEvents {

  constructor() {
    this.subject = new Rx.Subject();
    this.subject.subscribe((e)=>{
      console.log("InternalEvent: ",e);
    })
  }

  exampleChanged(name) {
    console.log("example changed ", name);
    this.subject.next({type: Events.EXAMPLE_CHANGED, name});
  }

  tabChanged(name) {
    this.subject.next({type: Events.TAB_CHANGED, name});
  }

  stateChanged({state,current}){
    this.subject.next({type: Events.STATE_CHANGED, state: Object.assign({},state), current});
  }

  subscribe(cb, thisArg) {
    return this.subject.subscribeOnNext(cb, thisArg)
  }

  subscribeOnExampleChanges(cb) {
    return this.subject
      .filter(_ => _.type === Events.EXAMPLE_CHANGED)
      .subscribe(cb);
  }

  subscribeOnTabChanges(cb) {
    return this.subject
      .filter(_ => _.type === Events.TAB_CHANGED)
      .subscribe(cb);
  }

  subscribeOnStateChanged(cb){
    return this.subject
      .filter(_ => _.type === Events.STATE_CHANGED)
      .subscribe(cb)
  }




}

Object.assign(InternalEvents, Events);


export default new InternalEvents();