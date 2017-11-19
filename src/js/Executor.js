import fun from 'funcy';
import _eval from 'safe-eval';



export default class Executor {

  /**
   * @param {String} actorCode
   */
  static execute(actorCode, event, state){
    const code = `(function(){var onEvent=null; var onCommand=null; ${actorCode}; return {onEvent, onCommand};})();`;
    console.log(code);
    const context = {
        fun : fun,
        $ : fun.parameter,
        _ : fun.wildcard,
        console : console,
        inc : (value) => _ => (_ || 0) + value,
        dec : (value) => _ => (_||0) - value
    };
    const actor = _eval(code, context);
    console.log('actor',  actor);

    if(typeof actor['onEvent'] === 'function'){
      return actor.onEvent(event,state);
    }
    return state;
  }
}