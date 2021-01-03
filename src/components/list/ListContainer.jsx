import React, {Component} from 'react'
import List from "./list"
import ApiClient from '../../ApiClient'

class ListContainer extends Component {
    constructor(props) {
        super(props)
        this.apiClient = new ApiClient();
        this.state = {
            data: [],
            error: false
        }
    }

    componentDidMount() {
        this.refreshMovieList();
    }

    refreshMovieList() {
        return this.apiClient.getMovies()
            .then((response) => response.json())
            .then((movies => this.setState({data: movies})));
    }

    onCreateCard(movie) {
        this.apiClient.createMovie(movie)
            .then(() => this.refreshMovieList());
    }

    onUpdateCard(movie) {
        this.apiClient.updateMovie(movie)
            .then(response => {
                if (response.ok) {
                    return;
                }
                throw new Error();
            })
            .then(() => this.refreshMovieList())
            .catch(e => this.setState({error: true}));
    }

    onDeleteCard(id) {
        this.apiClient.deleteMovie(id)
            .then(() => this.refreshMovieList())
    }

    render() {
        return (<div>
                    <List 
                        data={this.state.data}
                        handleUpdate={(movie) => this.onUpdateCard(movie)}
                        handleDelete={(movie) => this.onDeleteCard(movie)}
                        handleCreate={(movie) => this.onCreateCard(movie)}
                    />
                    {this.state.error && <p>Error updating movie</p>}
                </div>)
    }
}

export default ListContainer;