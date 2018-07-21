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

render(<TodoListApp />, document.getElementById('container'));