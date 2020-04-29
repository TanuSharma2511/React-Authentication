import React,{useContext,useState,useEffect} from 'react';
import "../register.css";
import {BrowserRouter as Router , Switch , Route} from "react-router-dom";
import {Link} from "react-router-dom";
import { GlobalContext } from '../context/GlobalState';
import Main from "./Main";

export default function Register() {
    const { register , isAuthenticated ,msg ,clearErrors} = useContext(GlobalContext);
    const [name,setName]=useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword]=useState("");

    useEffect(()=>{
        clearErrors();
    },[]);


   console.log(msg);
    const onName = e =>{
        setName(e.target.value);
     }
     const onEmail = e =>{
        setEmail(e.target.value);
     }
     const onPassword = e =>{
        setPassword(e.target.value);
     }

    const onSubmit = async(e) => {
        e.preventDefault();
    
        const newUser = {
         name,
         email,
         password
        }
    
     await register(newUser);
      console.log(msg);
      console.log(isAuthenticated);
      }
    
    return (
       <React.Fragment>
            <div class="tops">
                <Main />
            </div>
           <div class="wrapper">
    <div class="top">
  
    {isAuthenticated ? <h6 className="alert alert-success">User Registered successfully </h6> : null}
    {msg ? <h6 className="alert alert-danger">{msg} </h6> : null}
        <h1>Sign Up</h1>
        <form onSubmit={onSubmit}>
        <div className="form">
            <div className="input_field">
                 <input type="text" placeholder="USERNAME" name="name" onChange={onName} value={name} />  
            </div>  
            <div className="input_field">
                 <input type="text" placeholder="E-MAIL" name="email" onChange={onEmail} value={email} />  
            </div>
            <div className="input_field">
                 <input type="password" placeholder="PASSWORD" name="password" onChange={onPassword} value={password} />  
            </div>  
            <div className="btn">
               <button>Sign Up</button>
            </div>
            {isAuthenticated ?  <div className="btn">
       <Link to={`/dashboard`} ><button>Click here to view Dashboard</button></Link>
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
        <h3>Already have an account?</h3>
        <div className="social_icons">
        <Link to={`/login`}> <div className="link">Login</div></Link>

        </div>
    </div>
</div>
       </React.Fragment>
    )
}
