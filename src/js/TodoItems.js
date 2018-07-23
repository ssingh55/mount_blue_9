import React, { Component } from 'react';

export default class TodoItems extends Component {
    constructor(props){
        super(props);

        this.createTasks = this.createTasks.bind(this)
    }

    delete(key){
        this.props.delete(key);
    }

    checkItem(child,e){
        let itemChecked = this.state.itemChecked;
        itemChecked[child.id] = e.target.checked;
        this.setStart({itemChecked:itemChecked})
    }

    renderItem(child){
        .
        .
        let renderedChildren;
        if(this.state.itemChecked[child.id]){
            renderedChildren = this.renderChildren(child.children);
        }
        return (<li> .....{renderedChildren})
    }
    

    createTasks(item) {
        return (
            <li key={item.key}>
                <input type='checkbox' onchange={(e) => this.checkItem(item,e)} />
                <span style={{ 'textDecoration': item.isDone ? 'line-through' : 'none' }}>
                    {item.text}
                </span>
                <button onClick={()=>this.delete(item.key)}>X</button>
            </li>
        )
    }
    // onClick={(e)=>{e.target.parentNode.remove();}}
    render() {
        var todoEntries = this.props.entries;
        // console.log(todoEntries)
        var listItems = todoEntries.map(this.createTasks);
        return (
            <ul className="itemList">
                {listItems}
            </ul>
        );
    }
};