import { loginUser } from "../services/auth.service";

import useAuthStore from "../features/auth/authStore";

const Login = () => {

  const {login} = useAuthStore();

  const handleLogin = async () => {

    try {

      const data = await loginUser({

        email: "test@gmail.com",

        password: "123456"

      });

      console.log(data);

      login(data)

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <button onClick={handleLogin}>

      Test Login

    </button>

  );

};

export default Login;