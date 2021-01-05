import  React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = "Required field"
    }
    if (!values.image) {
        errors.image = "Required field"
    }
    if (!values.ranking) {
        errors.ranking = "Required field"
    }
    if (!values.type) {
        errors.type = "Required field"
    }
    if (!values.director) {
        errors.director = "Required field"
    }
    return errors
}

class EditForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            title: props.title,
            image: props.image,
            ranking: props.ranking,
            type: props.type,
            director: props.director,
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        const { errors, ...withoutErrors } = this.state
        const result = validate(withoutErrors)
        this.setState({errors: result})

        if (Object.keys(result).length == 0){
            return this.props.submitClick({
                id: this.props.id,
                title: this.state.title,
                image: this.state.image,
                ranking: this.state.ranking,
                type: this.state.type,
                director: this.state.director,    
            })
        }
    }

    handleCancelClick(e){
        e.preventDefault();
        return this.props.cancelEditClick()
    }

    handleChange(e, field) {
        e.preventDefault();
        this.setState({
            [field]: e.target.value,
        })
    }

    render() {
        const { errors } = this.state
        return (
            <div>
                 <Form style={{ width: '18rem' }}>   
                    <Form.Group>
                        <Form.Control type="input" 
                        placeholder={this.props.title} 
                        onChange={(e) => this.handleChange(e, "title")}
                        value={this.state.title}/>
                        {errors.title && <p>{errors.title}</p>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="input" 
                        placeholder={this.props.image} 
                        onChange={(e) => this.handleChange(e, "image")}
                        value={this.state.image}/>
                        {errors.image && <p>{errors.image}</p>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="number" 
                        max="10" min="1" 
                        placeholder={this.props.ranking} 
                        onChange={(e) => this.handleChange(e, "ranking")}
                        value={this.state.ranking}/>
                        {errors.ranking && <p>{errors.ranking}</p>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="input" 
                        placeholder={this.props.type} 
                        onChange={(e) => this.handleChange(e, "type")}
                        value={this.state.type}/>
                        {errors.type && <p>{errors.type}</p>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="input" 
                        placeholder={this.props.director} 
                        onChange={(e) => this.handleChange(e, "director")}
                        value={this.state.director}/>
                        {errors.director && <p>{errors.director}</p>}
                    </Form.Group>
                    <Button variant="success" type="submit" onClick={(e) => this.handleClick(e)}>Submit</Button>
                    <Button variant="info" onClick={(e) => this.handleCancelClick(e)}>Cancel</Button>
                </Form>
            </div>
        )
    }
};

export default EditForm;