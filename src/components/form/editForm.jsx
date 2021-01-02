import  React, { Component } from 'react';

class EditForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            title: props.title
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        return this.props.submitClick({title: this.state.title, id: this.props.id})
    }
    handleChange(e) {
        e.preventDefault();
        this.setState({
            title: e.target.value
        })
    }

    render() {
        return (
            <div>
                <form>
                    <input 
                        placeholder={this.props.title} 
                        onChange={this.handleChange}
                        value={this.state.title}/>
                    <button type="submit" onClick={(e) => this.handleClick(e)}>Submit</button>
                </form>
            </div>
        )
    }
};

export default EditForm;