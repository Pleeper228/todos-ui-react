import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CreateItemForm extends Component{
  static propTypes = {
    todos: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired
  }
  constructor(props){
    super(props)
    this.state = {
      itemName:'',
      taskId: null
    }
    this.handleItemNameChange=this.handleItemNameChange.bind(this)
    this.handleTaskChange=this.handleTaskChange.bind(this)
    this.handleSumbit=this.handleSumbit.bind(this)

  }

  handleItemNameChange(event) {
    console.log(event)
    this.setState({itemName: event.target.value})
  }

  handleTaskChange(event) {
    this.setState({taskId: event.target.value})
  }

  handleSumbit(event){
    event.preventDefault()
    this.props.onSubmit(this.state.itemName, this.state.taskId)
  }

  render(){
    var selectOptions;
    var defaultSelectOptions = [<option value={-1}>Select a Todo!</option>];
    var todoSelectOptions = this.props.todos.map((todo)=> {
      return <option key={todo.id} value={todo.id}>{todo.list_task_text}</option>;
    });
    selectOptions = defaultSelectOptions.concat(todoSelectOptions)

    return(
      <form onSubmit={this.handleSumbit}>
        <input type="text" value={this.state.itemName} onChange={this.handleItemNameChange}></input>
        <select value={this.state.taskId} onChange={this.handleTaskChange}>
          {selectOptions}
          {/* {this.props.todos.map((todo)=> {
            return <option key={todo.id} value={todo.id}>{todo.list_task_text}</option>;
          })} */}
        </select>
        <input type="submit" value="Create!"></input>
      </form>

    )
  }
}

export default CreateItemForm;
