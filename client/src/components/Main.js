import React , {useContext} from 'react';
import "../main.css";
import {Link} from "react-router-dom";
import { GlobalContext } from '../context/GlobalState';

export default function Main() {
    return (
        <div>
            <Link to={`/`}> <div className="linking"><p className="text">Back to Main Page</p></div></Link>  
        </div>
    )
}
