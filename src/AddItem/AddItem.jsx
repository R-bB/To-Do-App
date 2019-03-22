import React, { Component } from 'react';
import './AddItem.css';


function validate(newItemContent) {
    return {
        newItemContent: newItemContent.length === 0,
    };
  }
class AddItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            newItemContent: '',
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeItem = this.writeItem.bind(this);
    }

    handleUserInput(e){
        this.setState({
            newItemContent: e.target.value,
        })
        
    }

    writeItem(e){
        if (!this.canBeSubmitted()) {
            e.preventDefault();
            return;
        }
        this.props.addItem(this.state.newItemContent);
        this.setState({
            newItemContent: '',
        })
        e.preventDefault();
    }

    canBeSubmitted() {
        const errors = validate(this.state.newItemContent);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
      }

    render(){
        const errors = validate(this.state.newItemContent);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return(
            <form className="formWrapper">
            <div class='addItem'>
                <input className="itemInput" 
                placeholder="To-Do!"
                value={this.state.newItemContent}
                onChange={this.handleUserInput} />
                <button disabled={isDisabled} className="itemButton"
                onClick={(e) => {this.writeItem(e)}}>Add</button>
            </div>
            </form>
        )
    }

}

export default AddItem;
