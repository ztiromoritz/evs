import fun from 'funcy';
import _eval from 'safe-eval';



const onCommandDefault = (context) => {
  return (command, state, persist) => {
    console.log("onCommandDefaultIsCalled");
    return {
      'PAY_IN': ()=> {
        const event = context.copy(command);
        event.type = 'PAYED_IN';
        persist(event);
      },
      'PAY_OUT' : ()=> {
        const event = context.copy(command);
        event.type = 'PAYED_OUT';
        persist(event);
      }
    }[command.type]();
  };
};



const onEventDefault = (context) =>{
  return (event, state) => {
    return {
      'PAYED_IN': () => state.update('balance', context.inc(event.amount)),
      'PAYED_OUT': () => state.update('balance', context.dec(event.amount))
    }[event.type]();
  };
};



const getCode = (actorCode) => {
  return `(function(){
      var onEvent=null; 
      var onCommand=null;
      var filter = ()=>{return true;};
      var initialState = {}; 
      ${actorCode}; 
      return {
        onEvent, 
        onCommand,
        initialState,
        filter
      };
     })();`;
};

const getContext = ()=>{
  return {
    fun : fun,
    $ : fun.parameter,
    _ : fun.wildcard,
    console : console,
    log : (msg)=>{console.log('%c %s', 'background: #222; color: #bada55', JSON.stringify(msg,null,2));},
    inc : (value) => _ => (_ || 0) + value,
    dec : (value) => _ => (_||0) - value,
    sendMail : (msg) => { console.log("send mail"); new Notification("You have a mail", {body: msg}); },
    copy : (obj) => Object.assign({},obj)
  };
};

const getActor = (actorCode)=>{
  const code = getCode(actorCode);
  const context = getContext();
  return _eval(code, context);
};


export default class Executor {

  static handleCommand(actorCode, command, state, persist){
    const actor = getActor(actorCode);
    console.log("actor.onCommand", actor.onCommand);
    if(!actor.onCommand){
      actor.onCommand = onCommandDefault(getContext());
    }
    actor.onCommand(command, Object.freeze(state), persist);
  }

  static filter(actorCode,event){
    const actor = getActor(actorCode);
    return actor.filter(event);
  }


  static getInitialState(actorCode){
    const actor = getActor(actorCode);
    return Object.assign({},actor.initialState);
  }


  /**
   * @param {String} actorCode
   */
  static handleEvent(actorCode, event, state){
      const actor = getActor(actorCode);


    if(typeof actor['onEvent'] === 'function'){
      return actor.onEvent(event,state);
    }
    return state;
  }

}