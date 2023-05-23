import { useState, useEffect, createContext } from 'react';
import { getUserProfile } from '../api/v1/functions';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return async () => {
      await getUserProfile()
        .then((data) => {
          setAuth(data);
          setLoading(false);
        })
        .catch((err) => setAuth({}));
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
