import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from "axios";

// Initial state
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  success:false,
  msg: "",
  status: null,
  id: null
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
 async function register(user) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
       }
  

    const res= await axios.post("http://localhost:4000/auth/register",user,config);
     
      dispatch({
        type: 'REGISTER',
        payload: res.data
      });
    } catch (err) {

      console.log(err.response.data.msg);
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.response.data.msg
      });
    }
  }

  async function login(user) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
       }
  

    const res= await axios.post("http://localhost:4000/auth/login",user,config);
    console.log(res.data);
     
      dispatch({
        type: 'LOGIN',
        payload: res.data
      });
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.response.data.msg
      });
    }
  }

//CLEAR ERRORS
async function clearErrors() {
  dispatch({
    type: 'CLEAR_ERRORS',
    payload:""
    
  });
};  

// LOGOUT FUNCTION
async function logout() {
  dispatch({
    type: 'LOGOUT',
    payload:""
    
  });
};

  return (<GlobalContext.Provider value={{
    token:state.token,
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    success:state.success,
    msg:state.msg,
    status:state.status,
    id:state.status,
    register,
    login,
    logout,
    clearErrors
  }}>
    {children}
  </GlobalContext.Provider>);
}