import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {auth} from "../config/firebase.config";
import {login, logout, setError, setLoading} from "../redux/authSlice";
import {signOut} from "firebase/auth";

function AuthInitialization() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const parsedUser = JSON.parse(JSON.stringify(user));
      if (user) {
        dispatch(login({user: parsedUser, token: user.uid}));
        dispatch(setLoading(false));
      } else {
        dispatch(logout());
        signOut(auth)
          .then((res) => console.log(res))
          .catch((err) => dispatch(setError(err.message)));
      }
    });
    return () => unsubscribe();
  }, []);

  return null;
}

export default AuthInitialization;