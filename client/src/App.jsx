import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import useAuthStore from "./features/auth/authStore";

const App = () => {

  const {fetchCurrentUser} = useAuthStore();

  useEffect(() => {
    fetchCurrentUser();
  }, []);

    return <AppRoutes />;

};

export default App;