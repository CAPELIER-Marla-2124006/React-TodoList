import './App.css';
import React, { Component, useState } from 'react';


function App() {

    let storage = localStorage;
    let storageArray = JSON.parse(storage.getItem("data"))
    if(storageArray == null){
        storageArray = {};
        storageArray["todos"] = [];
        storage.setItem("data",JSON.stringify(storageArray));
    }

    function Todo({name,state}) {
        const [checked, setChecked] = useState(state);
        const [title, setTitle] = useState(name);

        const toggle = () => {
            setChecked(!checked);
            for (let i = 0; i < storageArray["todos"].length; i++) {
                const todoEl = storageArray["todos"][i];
                console.log(todoEl);
                if(todoEl["title"] == title){
                    todoEl["state"] = !checked;
                }
            }
            storage.setItem("data",JSON.stringify(storageArray));
        };

        return (
            <div>
                    <li>{title}<input name type="checkbox" checked={checked} onChange={toggle}></input></li>
            </div>
        );
    };

    class TodoList extends Component{
        constructor(props){
            super(props);
            this.state = {
                todolist : [],
                textIntput : ''
            }
            this.updateInput = this.updateInput.bind(this);

            if (storageArray != null){
                storageArray["todos"].forEach(element =>{
                    let todo = <Todo name={element["title"]} state={element["state"]} />
                    this.state.todolist.push(todo);
                })
            }
        }

        add(title,state){
            let todo = <Todo name={title} state={state} />
            this.state.todolist.push(todo);
            storageArray["todos"].push({"title": title,"state" : state});
            storage.setItem("data",JSON.stringify(storageArray));
            this.forceUpdate();
        }

        updateInput(event){
            this.setState({textIntput : event.target.value})
            //console.log(this.state["textIntput"]);
        }

        render() {
            return (
                <>
                <ul>
                    {this.state.todolist}
                </ul>
                <div>
                    <input type='text' onChange={this.updateInput}></input>
                    <button onClick={() => this.add(this.state["textIntput"],false)}>Ajouter</button>
                </div>
                </>
            );
        }
    }

    return (
        <>
        <h1>TodoList</h1>
        <TodoList/>
        </>
    );
}

export default App;
