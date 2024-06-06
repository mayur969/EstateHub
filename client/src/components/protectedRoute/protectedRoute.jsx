import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({children}) => {

  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(currentUser === null){
      navigate("/login", {replace: true});
    }
  }, [currentUser, navigate])

  return children;
}
