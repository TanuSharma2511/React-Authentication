import React,{useContext,useState,useEffect} from 'react';
import {BrowserRouter as Router , Switch , Route} from "react-router-dom";
import {Link} from "react-router-dom";
import { GlobalContext } from '../context/GlobalState';
import Main from "./Main";
import Dashboard from "./Dashboard";

export default function Login() {

    const { login ,isAuthenticated ,msg,clearErrors} = useContext(GlobalContext);
    const [email,setEmail] = useState("");
    const [password,setPassword]=useState("");

     const onEmail = e =>{
        setEmail(e.target.value);
     }
     const onPassword = e =>{
        setPassword(e.target.value);
     }
     
     useEffect(()=>{
         clearErrors();
     },[]);

    const onSubmit = async(e) => {
        e.preventDefault();
        const registerUser = {
            email,
            password
           }
       await login(registerUser);
       console.log(isAuthenticated);
    //    console.log(msg);
      }
    return (
        <React.Fragment>

           <div class="tops">
                <Main />
            </div>
        <div class="wrapper">
 <div class="top">
     <h1>Sign In</h1>
     {isAuthenticated ? <div className="alert alert-success">User Login Successfuly</div> : null}
    {msg ? <div className="alert alert-danger">{msg}</div> : null}
     <form onSubmit={onSubmit}>
     <div className="form">
         <div className="input_field">
              <input type="text" placeholder="E-MAIL" name="email" onChange={onEmail} value={email} />  
         </div>
         <div className="input_field">
              <input type="password" placeholder="PASSWORD" name="password" onChange={onPassword} value={password} />  
         </div>  
         <div className="btn">
             <button>Sign In</button>
         </div>
       {isAuthenticated ?  <div className="btn">
       <Link to={`/dashboard`} ><button>Click here to view Dashboard</button></Link>
       {/* <Link class="btn btn-primary btn-xs" to={{
             pathname: `/dashboard`,
             state: {
             isAuthenticated: isAuthenticated
             }
             }}><button>Click here to view Dashboard</button></Link> */}
         </div> 
         : 
         null} 
     </div>
     </form>
     <div className="or">
         or  
     </div>
 </div>
 <div className="bottom">
     <h3>Don't have an account ?</h3>
     <div className="social_icons">
         <Link to={`/register`}> <div className="link">Register</div></Link> 
     </div>
 </div>
</div>
    </React.Fragment>
    )
}
