import fun from 'funcy';
import _eval from 'safe-eval';



const onCommandDefault = (context) => {
  return (command, state, eventStore) => {
    return {
      'PAY_IN': ()=> eventStore.push({type: 'PAYED_IN' }),
      'PAY_OUT' : ()=> {
        if(state.balance >= command.amount){

          eventStore.push({type: 'PAYED_OUT', amount: command.amount});
        }else{

        }
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




export default class Executor {


  static handleCommand(actorCode, command, state, eventStore){

  }

  /**
   * @param {String} actorCode
   */
  static handleEvent(actorCode, event, state){
    const code = `(function(){var onEvent=null; var onCommand=null; ${actorCode}; return {onEvent, onCommand};})();`;
    const context = {
        fun : fun,
        $ : fun.parameter,
        _ : fun.wildcard,
        console : console,
        log : (msg)=>{console.log('%c %s', 'background: #222; color: #bada55', JSON.stringify(msg,null,2));},
        inc : (value) => _ => (_ || 0) + value,
        dec : (value) => _ => (_||0) - value
    };
    const actor = _eval(code, context);
    if(!actor.onCommand){
      actor.onCommand = onCommandDefault(context)
    }
    console.log('actor',  actor);

    if(typeof actor['onEvent'] === 'function'){
      return actor.onEvent(event,state);
    }
    return state;
  }
}