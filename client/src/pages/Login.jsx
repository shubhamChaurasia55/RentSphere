import { loginUser } from "../services/auth.service";

const Login = () => {

  const handleLogin = async () => {

    try {

      const data = await loginUser({

        email: "test@gmail.com",

        password: "123456"

      });

      console.log(data);

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