import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../utils/validators";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

import { loginUser } from "../services/auth.service";

import useAuthStore from "../features/auth/authStore";

const Login = () => {

  const navigate = useNavigate();

  const { login } = useAuthStore();

  const {

    register,

    handleSubmit,

    formState: { errors, isSubmitting }

  } = useForm({

    resolver: zodResolver(loginSchema)

  });

  const onSubmit = async (formData) => {

    try {

      const data = await loginUser(formData);

      login(data.user);

      if (data.user.role === "landlord") {

        navigate("/landlord/dashboard");

      } else {

        navigate("/");

      }

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center">

      <form

        onSubmit={handleSubmit(onSubmit)}

        className="w-full max-w-md border rounded-2xl p-8 flex flex-col gap-5"

      >

        <h1 className="text-3xl font-bold">

          Login

        </h1>

        <Input

          label="Email"

          type="email"

          placeholder="Enter email"

          error={errors.email?.message}

          {...register("email")}

        />

        <Input

          label="Password"

          type="password"

          placeholder="Enter password"

          error={errors.password?.message}

          {...register("password")}

        />

        <Button loading={isSubmitting}>
          Login
        </Button>

      </form>

    </div>

  );

};

export default Login;