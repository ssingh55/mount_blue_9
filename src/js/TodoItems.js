import React, { Component } from 'react';

export default class TodoItems extends Component {
    constructor(props) {
        super(props);
        this.createTasks = this.createTasks.bind(this)
    }
    delete(key) {
        this.props.delete(key);
    }
    checkItem(item, e) {
        this.props.checkItem(item, e);
    }
    createTasks(item) {
        return (
            <li key={item.key}>
                <input type='checkbox' onChange={(e) => this.checkItem(item, e)} />
                <span /*onClick={(e) => this.checkItem(item,e)}*/ style={{ 'textDecoration': item.isDone ? 'line-through' : 'none' }}>
                    {item.text}
                </span>
                <button onClick={() => this.delete(item.key)}>X</button>
            </li>
        )
    }
    // onClick={(e)=>{e.target.parentNode.remove();}}
    render() {
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);
        return (
            <ul className="itemList">
                {listItems}
            </ul>
        );
    }
};