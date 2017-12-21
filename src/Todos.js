import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Todos extends Component {
  static propTypes = {
    // id: PropTypes.number.isRequired,
    todo: PropTypes.object.isRequired,
    onItemComplete: PropTypes.func.isRequired
  }
  constructor(props){
    super(props)
    this.state = {
        // todos: false,
        message: null
    }
  }

//   componentDidMount() {
//     fetch(`http://127.0.0.1:8000/todos/${this.props.id}/json/`)
//     .then((response)=>{
//         return response.json()
//     }).then((jsonObject)=>{
//         setTimeout(()=>{
//             this.setState({todos: jsonObject})
//         }, 1000);
// //         this.setState({poll: jsonObject})
//     })
//   }

  // handleClick(list_item){
  //   fetch(`http://127.0.0.1:8000/todos/${this.props.id}/item/${list_item.id}/completed/`)
  //   .then(response => response.json())
  //   .then(jsonObject => this.setState({todos: jsonObject, message: "Thanks for completing that task!"}))
  // }


  render() {
    if (this.props.todo) {
        // var choices = this.state.poll.choices.map(choice => {
        //   return <button>{choice.choice_text}({choice.votes})</button>
        // })
        return (
          <div>
            <h2>{this.props.todo.list_task_text}</h2>
            <div>
            {
              this.props.todo.items.map(list_item => {
                if (!list_item.completed) {
                  return (
                    <button onClick={() => {this.props.onItemComplete(list_item, this.props.todo)}}
                            key = {list_item.id}>
                              {list_item.list_item_text}
                    </button>

                  );
                }
                else {
                  return null
                }
              })
            }
            </div>
          </div>
        );
    }
    else {
        return (
            <div>Loading...</div>
        );
    }
  }
}

export default Todos;
