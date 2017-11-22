import './css/slides.css';
import './css/styles.css';
import './css/twemoji-awesome.css';
//import 'font-awesome/css/font-awesome.min.css';
import 'spectre.css';
import 'spectre.css/dist/spectre-icons.css';


import './js/comp/Event';
import './js/comp/ExampleSettings';
import tabs from './js/comp/Tabs';

import './js/slides/Slide';
import './js/slides/Slides';

import Editor from './js/comp/Editor';
import eventList from './js/comp/EventList';
import exampleSelect from './js/comp/ExampleSelect';
import executor from './js/Executor';
import './js/comp/RawState';
import './js/comp/View';
import commands from './js/comp/Commands';
import debug from './js/comp/Debugger';
import editorButtons from './js/comp/EditorButtons';

import currentState from './js/CurrentState';
import InternalEvents from './js/InternalEvents';

const editor = new Editor(document.querySelector('#editorPane'));

//Fire current state, after all elements are initialized.
exampleSelect.emitState();
tabs.emitState();
currentState.emit();

const fadeOutShadow = function ($shadow) {

  if (!$shadow) {
    return Promise.resolve();
  }
  return new Promise(resolve => {

    $shadow.style.opacity = 0;
    const listener = () => {
      $shadow.removeEventListener("transitionend", listener);
      document.body.removeChild($shadow);
      resolve();
    };
    $shadow.addEventListener("transitionend", listener, false);
  });
};

const addFilteredMessage = function ($shadow) {

  if (!$shadow) {
    return Promise.resolve();
  }

  return new Promise(resolve => {
    $shadow.classList.add('filtered');
    setTimeout(() => {

      resolve($shadow);
    }, 400);
  });

};


//let state = {};
//let current = 0;


const consumeNextEvent = function () {

  //Fake mail
  //var notification = new Notification("You have a mail",{body: "Hey there! You've been notified!"});


  const $state = document.querySelector('#state');

  currentState.transform(({state, current}) => {

    if (eventList.getLength() <= current) {
      console.log('Event log completely read');
      return {state, current};
    }

    const eventComponent = eventList.getComponent(current);
    const event = eventList.getEvent(current);

    let newState = Object.assign({}, state);

    if (current === 0 && state === null) {
      newState = executor.getInitialState(editor.getValue());
    }

    if (executor.filter(editor.getValue(), event)) {
      // visual transform and emit effect
      eventComponent
        .moveShadowFromEventTo($state)
        .then(fadeOutShadow)
        .then(() => { currentState.emit(); });
      newState = executor.handleEvent(editor.getValue(), event, newState);
    } else {
      eventComponent
        .moveShadowFromEventTo($state)
        .then(addFilteredMessage)
        .then(fadeOutShadow)
        .then(() => { currentState.emit();})
    }


    // data transform
    return {
      state: newState,
      current: current + 1
    }
  });
};


commands.onCommand = (command, e) => {
  const persist = (event) => {
    const newEvent = Object.assign({}, event, {source: [e.pageX, e.pageY]});
    eventList.addEvent(newEvent);
  };
  executor.handleCommand(editor.getValue(), command, currentState.state, persist);
};

debug.addCommand({
  caption: 'Consume next event!',
  execute: consumeNextEvent
});


debug.addCommand({
  caption: 'Reset current state',
  execute: () => { currentState.clear();}
});


editorButtons.addCommand({
  caption: 'ff',
  execute: () => editor.format()
});

editorButtons.addCommand({
  caption: '+',
  execute: () => editor.incFontSize()
});

editorButtons.addCommand({
  caption: '-',
  execute: () => editor.decFontSize()
});


editor.format();




