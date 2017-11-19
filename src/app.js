import ace from 'brace';

import 'spectre.css';
import 'spectre.css/dist/spectre-icons.css';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import beautify from 'js-beautify';

import './js/comp/Event';
import eventList from './js/comp/EventList';
import executor from './js/Executor';
import rawState from './js/comp/RawState';
import commands from './js/comp/Commands';

import {Map} from 'immutable';


console.log("adsf", beautify);
const editor = ace.edit("editor");
//editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");
editor.setOptions({
  tabSize: 2,
  fontSize: "20pt"
});
/*
var actor = eval(editor.getValue());
*/
const eventStore = [];
let state = Map();

commands.eventStore=eventStore;
commands.eventList=eventList;
console.log(eventStore);

const $controls = document.querySelector('#controls');

const pay_in_10 = $controls.appendChild(document.createElement('button'));
pay_in_10.innerHTML = 'Pay in 10€!';
pay_in_10.addEventListener('click', (e) => {

  const newEvent = {
    type: 'PAYED_IN',
    amount: 10,
    caption: "PAYED_IN 10€"
  };

  eventStore.push(newEvent);
  eventList.addEvent(Object.assign({}, newEvent, {source: [e.pageX, e.pageY]}));

});


const $pay_out_3 = $controls.appendChild(document.createElement('button'));
$pay_out_3.innerHTML = 'Pay out 3€!';
$pay_out_3.classList.add('btn');

$pay_out_3.addEventListener('click', (e) => {

  const newEvent = {
    type: 'PAYED_OUT',
    amount: 10,
    caption: "PAYED_OUT 10€",
  };
  eventStore.push(newEvent);
  eventList.addEvent(Object.assign({}, newEvent, {source: [e.pageX, e.pageY]}));

});


let current = 0;
const $consume_event = $controls.appendChild(document.createElement('button'));
$consume_event.innerHTML = 'Consume next event!';
$consume_event.addEventListener('click', function () {

  //Fake mail
  //var notification = new Notification("You have a mail",{body: "Hey there! You've been notified!"});


  if (eventStore.length > current) {
    console.log("execute");
    state = executor.execute(editor.getValue(), eventStore[current], state);
    current++;
    eventList.setCurrent(current);
  }else{
    console.log('log complettely read.');
  }
  console.log("state",  state.toJSON());
  rawState.value = state.toJSON();

});


const format = function () {



  console.log(beautify);
  editor.setValue(beautify(editor.getValue(), {indent_size: 1}));
  editor.clearSelection();
};


const $beautify = $controls.appendChild(document.createElement('button'));
$beautify.innerHTML = 'Format code!';
$beautify.addEventListener('click',format);
format();



//Fake mail
//var notification = new Notification("You have a mail",{body: "Hey there! You've been notified!"});

