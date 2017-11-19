import './css/slides.css';
import './css/styles.css';
import './css/twemoji-awesome.css';
//import 'font-awesome/css/font-awesome.min.css';
import 'spectre.css';
import 'spectre.css/dist/spectre-icons.css';


import './js/comp/Event';
import './js/comp/ExampleSettings';
import './js/comp/Tabs';

import './js/slides/Slide';
import './js/slides/Slides';

import Editor from './js/comp/Editor';
import eventList from './js/comp/EventList';
import exampleSelect from './js/comp/ExampleSelect';
import executor from './js/Executor';
import rawState from './js/comp/RawState';
import view from './js/comp/View';
import commands from './js/comp/Commands';
import debug  from './js/comp/Debugger';
import editorButtons  from './js/comp/EditorButtons';

const editor = new Editor(document.querySelector('#editorPane'));


let state = {};
let current = 0;

commands.eventList=eventList;


const consumeNextEvent = function () {

  //Fake mail
  //var notification = new Notification("You have a mail",{body: "Hey there! You've been notified!"});


  if (eventList.getLength() > current) {
    console.log("execute");
    const $state = document.querySelector('#state');

    const target_rect = $state.getBoundingClientRect();
    const target = [target_rect.left, target_rect.top, target_rect.width, target_rect.height];
    const currentEventComponent = eventList.getComponent(current);

    state = executor.handleEvent(editor.getValue(), eventList.getEvent(current), state);
    current++;
    eventList.setCurrent(current);

    currentEventComponent.moveShadowFromEventTo(target).then(($shadow)=>{
        console.log($shadow.style + "opacity: 0.3;");
        $shadow.style.opacity = 0;
        const listener = () => {
          $shadow.removeEventListener("transitionend",listener);
          rawState.value = Object.assign({},state);
          view.value = Object.assign({},state);
          document.body.removeChild($shadow);
        };
        $shadow.addEventListener("transitionend", listener, false);
    });

  }else{
    console.log('log complettely read.');
  }
};

debug.addCommand({
  caption: 'Consume next event!',
  execute : consumeNextEvent
});

editorButtons.addCommand({
  caption: 'ff',
  execute : ()=>editor.format()
});

editorButtons.addCommand({
  caption: '+',
  execute : ()=>editor.incFontSize()
});

editorButtons.addCommand({
  caption: '-',
  execute : ()=>editor.decFontSize()
});


editor.format();




//Fake mail
//var notification = new Notification("You have a mail",{body: "Hey there! You've been notified!"});

