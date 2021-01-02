import 'bootstrap/dist/css/bootstrap.min.css';
import List from "./components/list/list"
import './App.css';

function App() {
  return (
    <List data={[
      { title:'tenet',
      id: "10"},
      {title: 'amelie',
       id: "11"},        
  ]} />
  );
}

export default App;
