import React, { Component } from 'react';
// import { render } from 'react-dom';
import TodoItems from "./TodoItems"

export default class TodoApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
        this.addItem = this.addItem.bind(this);
    }

    addItem(e) {
        if (this.inputElement.value !== "") {
            var newItem = {
                text: this.inputElement.value,
                key: Date.now(),
                isCompleted: false
            };
            console.log(newItem)
            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            }, function () {
                console.log(this.state.items);
            });
            this.inputElement.value = "";
        }

        // console.log(this.state);
        e.preventDefault();
    }

    render() {
        return (
            <div className="todoListMain">
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input type="text" ref={(item) => this.inputElement = item} placeholder="Enter your todo" />
                        <button type="submit">Add</button>
                    </form>
                </div>
                <TodoItems entries={this.state.items} />
            </div>
        );
    }
}