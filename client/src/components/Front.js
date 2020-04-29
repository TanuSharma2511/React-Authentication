import React , {useContext} from 'react';
import {BrowserRouter as Router , Switch , Route} from "react-router-dom";
import {Link} from "react-router-dom";
import { GlobalContext } from '../context/GlobalState';
import "../front.css";

export default function Front() {
  const {logout,isAuthenticated ,msg} = useContext(GlobalContext);
  console.log(isAuthenticated);
    return (
       <React.Fragment>
        <div className="container">
        <div className="jumbotron">
  <h1 className="display-4">Authentication of User using ReactJS and NodeJS</h1>
  <p className="lead">This is a simple and small project in which we authenticate user for access the specific webpages or information.</p>
  <hr className="my-4" />
  <p>It uses ReactJS as front end and NodeJS as back end.</p>
  <div className="lead">
  <Link to={`/register`}> <button className="links">Register</button></Link>
  <Link to={`/login`}> <button className="links">Login</button></Link>
  </div>
</div>
</div>
       </React.Fragment>
    )
}
