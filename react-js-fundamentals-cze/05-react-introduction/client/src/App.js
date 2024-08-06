import logo from './logo.svg';
import './App.css';

const classroom = {
  name: "Septima"
};

function App() {
  return (
      <div className="App">
        <h1>Třída</h1>
        <h2>Classroom {classroom.name}</h2>
      </div>
  );
}

export default App;
