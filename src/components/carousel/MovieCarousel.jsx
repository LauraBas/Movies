import Carousel from 'react-bootstrap/Carousel'

function MovieCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL + "/img/slider/movie.jpeg"}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Movies</h3>
          <p>Your favourites films</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL + "/img/slider/movie1.jpeg"}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Movies</h3>
          <p>Your favourites films</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={process.env.PUBLIC_URL + "/img/slider/movie2.jpg"}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Movies</h3>
          <p>Your favourites films</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MovieCarousel;
