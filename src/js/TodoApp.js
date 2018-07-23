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
        this.deleteItem = this.deleteItem.bind(this);
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
                console.log(this.state.items);
            });
            this.inputElement.value = "";
        }
        // console.log(this.state.items);
        e.preventDefault();
    }

    deleteItem(key) {
        // var filteredItems = this.state.items.filter(function (item) {
        //   return (item.key !== key);
        // });
        var temp = this.state.items
        for(var i=0;i<temp.length;i++)
        {   
            if(temp[i].key===key)
                {
                    temp.splice(i, 1)
                    break;
                }
        }
        console.log(temp)
        this.setState({
            items: temp
            // items: filteredItems
        });
    }

    checkItem(e) {

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
                <TodoItems entries={this.state.items} delete={this.deleteItem} checkItem={this.checkItem} />
            </div>
        );
    }
}