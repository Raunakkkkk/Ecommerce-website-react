import { Navigate, Outlet, Route } from 'react-router-dom';
import { useAuth } from './components/context/auth';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
const PrivateRoute = () => {
  const [auth] = useAuth();
  const navigate=useNavigate();

  const isLoggedIn = auth ;
  let l=localStorage.getItem('auth'); 

if(l!=null){
  l=true;
  
}
else
l=false;


  
    return isLoggedIn && l ? <Outlet /> :<>
    {/* <h1>Please Login in</h1> */}


  {              window.location.href="http://localhost:3000/"//redirecting to login page
}
    </>

};
export default PrivateRoute;
