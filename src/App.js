
import "./App.css";

import {BrowserRouter as Router,Switch,  Route,} from "react-router-dom";
import Home from './components/Home'
import About from './components/About'
import Navbar from './components/Navbar'
import NoteState from "./context/Notes/NotesState";
import Alert from "./components/Alert";

function App() {
  return (
    <>
    <NoteState>
    <Router>
      <Navbar/>
      <Alert msg = "msg"/>
    <Switch>
          <Route exact path="/">
           <Home/>
          </Route>
          <Route exact path="/about">
            <About/>
          </Route>
        </Switch>

    </Router>
    </NoteState>
    </>
  );
}

export default App;
