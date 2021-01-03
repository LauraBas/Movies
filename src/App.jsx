import 'bootstrap/dist/css/bootstrap.min.css'
import ListContainer from "./components/list/ListContainer"
import './App.css';
import MovieCarousel from './components/carousel/MovieCarousel';

function App() {
  return (   
    <div>
      <MovieCarousel />                
      <ListContainer />    
    </div>
  );
}

export default App;
