import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';

const CardMovie = function(props) {
    function handleDelete(e) {
        e.preventDefault();        
        props.deleteClick(props.id);
    }

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Header>{props.ranking}</Card.Header>
                <Card.Img variant="top" src={process.env.PUBLIC_URL + '/img/' + props.title + ".jpg"} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.type}</Card.Subtitle>
                    <Card.Text>{props.director}</Card.Text>
                </Card.Body>   
                <ButtonGroup aria-label="Basic example">
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    <Button variant="info" onClick={() => props.editClick(props.id)}>Edit</Button>
                </ButtonGroup>     
            </Card>    
        </div>
    )
};

export default CardMovie;