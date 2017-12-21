import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CreateTask extends Component {
  static propTypes = {
    onCreateTask: PropTypes.func.isRequired
   // id: PropTypes.number.isRequired,
  }
  constructor(props){
    super(props)
    this.state = {
        create_task: null,
        taskname: ""
    }
    this.handleChange=this.handleChange.bind(this)
  }

  handleClick(value) {
    // var data = {list_task_text: this.refs.taskname.value}

    var data = {list_task_text: value}
    fetch(`http://127.0.0.1:8000/todos/create_task_json/`, {
        method: 'POST',
        body:JSON.stringify(data)
        })
        .then((response)=>{
            return response.json()
        })
        // .then(response => response.json())
        .then((json)=>{
          this.setState({taskname: ""})
          this.props.onCreateTask(json)
        })


  }

  handleChange(event) {
    console.log(event)
    this.setState({taskname: event.target.value})
  }

  getAction() {
    return 'action';
  }

  render() {

    var formHandleSubmit = event => {
      event.preventDefault();
      this.handleClick(this.state.taskname);
    }

    return (
      <div>
        <h2>{"Create Task"}</h2>
        <div>
          <form onSubmit={formHandleSubmit}>
          {/* <form onSubmit={ (event) => { event.preventDefault(); this.handleClick(this.state.taskname)}}> */}

          {/* <form onSubmit={this.handleClick}> */}
            {"Task Name:"}
            <input type="text" name="taskname" ref="taskname" value={this.state.taskname} onChange={this.handleChange}></input>
            <input type="submit" value="Submit" disabled={this.state.taskname.length === 0}></input>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateTask;
