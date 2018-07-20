import React, { Component } from 'react';

export default class TodoItems extends Component {

    createTasks(item) {
        return (
            <li key={item.key}>
                <input type="checkbox" /><span style={{ 'textDecoration': item.isCompleted ? 'line-through' : 'none' }}>
                    {item.text}
                </span>
                <button onClick={(e)=>{e.target.parentNode.remove(); item.splice(item.key,0); console.log(item)}}>X</button>
            </li>
        )
    }

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