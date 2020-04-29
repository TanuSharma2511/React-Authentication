import React,{useEffect , useState , useContext} from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Front from "./components/Front";
import Dashboard from "./components/Dashboard"
import { GlobalProvider } from './context/GlobalState';
import { GlobalContext } from './context/GlobalState';

import {BrowserRouter as Router , Switch , Route} from "react-router-dom";
import "./App.css";

const App = () =>{

    return(
    <GlobalProvider>
        <Router>
        <div className="Appjs">
          
            <Switch>
            <Route path ="/register" exact component={Register}/>
            <Route path ="/login" component={Login}/>
            <Route path ="/" exact component={Front}/>
            <Route path ="/dashboard" component={Dashboard}/>
            </Switch>
        </div>
        </Router>
        </GlobalProvider>
    );
}

export default App;
