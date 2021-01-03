class ApiClient {
    
    getMovies() {
        return fetch("http://localhost:3001/peliculas", {
            headers: {
                'Content-Type': 'application/json'
              },
        })
    }

    createMovie(movie) {
        return fetch("http://localhost:3001/peliculas/", {
            method: "POST",
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
              }
        })
    }

    updateMovie(movie) {
        return fetch("http://localhost:3001/peliculas/" + movie.id, {
            method: "PUT",
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json'
              }
        })
    }

    deleteMovie(id) {
        return fetch("http://localhost:3001/peliculas/" + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
              }
        })
    }

}

export default ApiClient;