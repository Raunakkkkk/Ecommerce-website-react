import { useState, useEffect, useContext, createContext } from "react";
const AuthContext = createContext();

const AuthProvider = (props) => {
  const [auth, setAuth] = useState({
    // user:null,    
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        // user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};
//custom hook

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
