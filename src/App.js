import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import MyButton from './MyButton';
import Todos from './Todos';
import CreateTask from './createTask';
import CreateItemForm from './CreateItemForm';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        todos: [],
        title: 'Here\'s the To-Do\'s list!',
        message: null,
    }
    this.handleClick=this.handleClick.bind(this)
    this.handleCreateTask=this.handleCreateTask.bind(this)
    this.handleItemComplete=this.handleItemComplete.bind(this)
  }

  componentDidMount() {
    fetch(`http://127.0.0.1:8000/todos/json/`)
    .then((response)=>{
        return response.json()
    }).then((jsonObject)=>{
        setTimeout(()=>{
            this.setState({todos: jsonObject})
        }, 1000);
  //         this.setState({poll: jsonObject})
    })
  }

  handleClick(event){
    this.setState({counter: this.state.counter + 1})
  }

  handleCreateTask(task){
    this.setState({todos: this.state.todos.concat([task])})
  }

  handleCreateItem(name, id){
    var data = {list_item_text: name}
    fetch(`http://127.0.0.1:8000/todos/${id}/create_item/`,{
      method: 'POST',
      body:JSON.stringify(data)
    })
  }

  handleItemComplete(item, task){
    fetch(`http://127.0.0.1:8000/todos/${task.id}/item/${item.id}/completed/`)
    .then(response => response.json())
    .then(jsonObject => {
      // updateWithNewTodo(json)
      var foundIndex = null
      this.state.todos.forEach((todo, index)=>{
        if (todo.id === jsonObject.id){
          foundIndex = index
        }
      })
      var oldTodos = this.state.todos
      oldTodos[foundIndex] = jsonObject

      this.setState({todos: oldTodos, message: "Thanks for completing that task!"})
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>{this.state.title}</h2>
          <h3>{this.state.message}</h3>
        </div>
            {/* <Todos id={1}/>
            <hr/>
            <Todos id={2}/>
            <hr/>
            <Todos id={3}/>
            <hr/> */}
            {this.state.todos.map((todo)=> {
              return (
                <div key={todo.id}>
                  <Todos todo={todo} onItemComplete={this.handleItemComplete}/>
                  <hr/>
                </div>
              )
            })}
            <CreateItemForm todos= {this.state.todos} onSubmit={this.handleCreateItem}/>
            <CreateTask id={1} onCreateTask={this.handleCreateTask}/>
            {/* <MyButton onClick={this.handleClick}>
                    {this.state.counter}
                      <img src={logo} className="App-logo" alt="logo" />
            </MyButton> */}
      </div>
    );
  }
}

export default App;
