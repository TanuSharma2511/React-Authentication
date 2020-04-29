export default (state, action) => {
  switch(action.type) {
   
      case 'REGISTER':
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false,
          msg:""
               }
        case 'LOGIN':
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false,
          msg:""
        }
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        msg:action.payload
      };
     case 'CLEAR_ERRORS': 
     return {
        
      ...state,
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      msg:action.payload
    }; 
    default:
      return state;
  }
}