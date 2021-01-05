import  React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

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

class CreateForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: "",
            image: "",
            ranking: "",
            type: "",
            director: "",
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
        return this.props.cancelClick()
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
                            placeholder="title"
                            onChange={(e) => this.handleChange(e, "title")}
                            value={this.state.title}/>
                            {errors.title && <p>{errors.title}</p>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="input" 
                            placeholder="image"
                            onChange={(e) => this.handleChange(e, "image")}
                            value={this.state.image}/>
                            {errors.image && <p>{errors.image}</p>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="number" 
                            max="10" min="1"
                            placeholder="ranking" 
                            onChange={(e) => this.handleChange(e, "ranking")}
                            value={this.state.ranking}/>
                             {errors.ranking && <p>{errors.ranking}</p>}
                    </Form.Group>                
                    <Form.Group>
                        <Form.Control type="input" 
                            placeholder="type"
                            onChange={(e) => this.handleChange(e, "type")}
                            value={this.state.type}/>
                             {errors.type && <p>{errors.type}</p>}
                    </Form.Group>
                    <Form.Group>
                            <Form.Control type="input"  
                            placeholder="director"
                            onChange={(e) => this.handleChange(e, "director")}
                            value={this.state.director}/> 
                             {errors.director && <p>{errors.director}</p>}               
                    </Form.Group>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="success" type="submit" onClick={(e) => this.handleClick(e)}>Submit</Button>
                        <Button variant="info" onClick={(e) => this.handleCancelClick(e)}>Cancel</Button>
                    </ButtonGroup>
                </Form>
            </div>
        )
    }
};

export default CreateForm;