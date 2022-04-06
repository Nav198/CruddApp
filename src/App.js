
import { Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import AddUser from './components/AddUser';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
function App() {
  return (
    <div className="App">
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/newuser" element={<AddUser/>}></Route>
        <Route path="/edituser/:id" element={<AddUser/>}></Route>
        <Route path="/edituser" element={<AddUser/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
