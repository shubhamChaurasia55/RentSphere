import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import useAuthStore from "./features/auth/authStore";
import {Toaster} from "react-hot-toast";

const App = () => {

  const {fetchCurrentUser} = useAuthStore();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

    return (
        <>
          <Toaster /> 
          <AppRoutes />
        </>
    );

};

export default App;