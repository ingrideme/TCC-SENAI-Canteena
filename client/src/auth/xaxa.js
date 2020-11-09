import { logout } from '../auth/autenticacao';
import { useHistory } from 'react-router-dom';

export  default  function Xaxa() {
    const history = useHistory(null)
  
    const handleLogout = () => {
      logout()
      localStorage.removeItem('infos')
      history.push("/")
    }
  };
  

  

  
