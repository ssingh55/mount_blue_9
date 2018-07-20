import React, { Component } from 'react';
import { render } from 'react-dom';
import Todo from './TodoApp'

import '../css/style.css';

export default class TodoListApp extends Component {
  render() {
    return (
      <div>
        <Todo />
      </div>
    );
  }
}



/*
function AddItem(){
  return (
    React.createElement(
      "form",
      { className: "form" },
      React.createElement("input", { type: "text", placeholder: "enter your todo" }),
      React.createElement("input", { type: "submit", value: "Add", onClick: add })
    )
  )
}

function add(){
  return(
    React.createElement(
      "ul",
      null,
      React.createElement(
        "li",
        null,
        "redhat"
      )
    )
  )
}
*/


render(<TodoListApp />, document.getElementById('container'));