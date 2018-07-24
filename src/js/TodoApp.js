import React, { Component } from 'react';
// import { render } from 'react-dom';
import TodoItems from "./TodoItems";

export default class TodoApp extends Component {
    constructor() {
        super();
        this.state = {
            items: []
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.checkItem = this.checkItem.bind(this)
    }

    componentDidMount() {
        fetch('/api/todos')
            .then(function (data) {
                return data.json();
            })
            .then((myJson) => {
                this.setState({
                    items: myJson
                })
            })
    }

    addItem(e) {
        if (this.inputElement.value !== "") {
            var newItem = {
                text: this.inputElement.value,
                key: Date.now(),
                isDone: false
            };
            this.setState((prevState) => {
                return {
                    items: prevState.items.concat(newItem)
                };
            }, function () {
                //mongodb add item part
                fetch('/api/todos', {
                    method: 'POST',
                    body: JSON.stringify(this.state.items),
                    headers: { 'Content-Type': 'application/json' }
                })
            });
            this.inputElement.value = "";
        }
        e.preventDefault();
    }

    deleteItem(key) {
        // var temp = this.state.items;
        // var filteredItems = temp.filter(function (item) {
        var filteredItems = this.state.items.filter(function (item) {
            return (item.key !== key);
        });
        // var temp = this.state.items
        // for (var i = 0; i < temp.length; i++) {
        //     if (temp[i].key === key) {
        //         temp.splice(i, 1)
        //         break;
        //     }
        // }
        // console.log(temp)
        this.setState({
            // items: temp
            items: filteredItems
        }, function () {
            //delete item from mongodb
            fetch('/api/todos/' + key, {
                method: 'DELETE'
            })
                .then(response => response.json());
        });
    }

    checkItem(childItem, e) {
        var itemChecked = this.state.items.map((item) => {
            if (item.key === childItem.key) {
                item.isDone = !item.isDone;
                // item.isDone = e.target.checked;
            }
            return item
        });
        this.setState({
            items: itemChecked
        }, function () {
            //check and update item into mongodb
            fetch('/api/todos/' + childItem.key, {
                method: 'PUT',
                body: JSON.stringify(this.state.items),
                headers: { 'Content-Type': 'application/json' }
            })
            // .then(response => response.json());
        });
    }

    render() {
        return (
            <div className="todoListMain">
                <div className="header">
                    <form onSubmit={this.addItem} method="POST">
                        <input type="text" ref={(item) => this.inputElement = item} placeholder="Enter your todo" />
                        <button type="submit">Add</button>
                    </form>
                </div>
                <TodoItems entries={this.state.items} delete={this.deleteItem} checkItem={this.checkItem} />
            </div>
        );
    }
}