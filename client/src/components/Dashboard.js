import React ,{useContext} from 'react';
import {Link} from "react-router-dom";
import { GlobalContext } from '../context/GlobalState';

export default function Dashboard() {
    const {logout,isAuthenticated ,msg} = useContext(GlobalContext);
    const onSubmit = e =>{
        logout();
     }
    
     console.log(isAuthenticated);
    
    return (
        <React.Fragment>
            
            {isAuthenticated ?   <div>
            <h1 className="text-center text-primary">Welcome User</h1>
            <hr />
            <Link to={`/`} >  <button onClick={onSubmit} className="btn btn-primary btn-block"> Logout</button></Link>
            </div>
            :
            <div>
       <h2 className="text-center text-primary"> Please authenticate before viewing dashboard page</h2>
       <div className="text-center">
  <Link to={`/register`}> <button className="links">Register</button></Link>
  <Link to={`/login`}> <button className="links">Login</button></Link>
  </div>
         </div> 
         } 
                    </React.Fragment>
    )
}
