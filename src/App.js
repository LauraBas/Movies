import 'bootstrap/dist/css/bootstrap.min.css';
import List from "./components/list/list"
import './App.css';

function App() {
  return (
    <List data={[
      {title: 'tenet', id:"0", ranking: 10, type:"accion", director:"Nollan"},
      {title: 'amelie', id:"2" , ranking: 10, type:"romantic", director:"Tiersen"},      
  ]} />
  );
}

export default App;
