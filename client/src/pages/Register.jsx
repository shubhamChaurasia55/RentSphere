import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema } from "../utils/validators";

import Input from "../components/common/Input";
import Button from "../components/common/Button";

import { registerUser } from "../services/auth.service";

import useAuthStore from "../features/auth/authStore";

const Register = () => {

  const navigate = useNavigate();

  const { register: registerStore } = useAuthStore();

  const {

    register,

    handleSubmit,

    formState: { errors, isSubmitting }

  } = useForm({

    resolver: zodResolver(registerSchema)

  });

  const onSubmit = async (formData) => {

    try {

      const data = await registerUser(formData);

      registerStore(data.user);

      if (data.user.role === "landlord") {

        navigate("/landlord/dashboard");

      } else {

        navigate("/tenant/dashboard");

      }

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center px-4">

      <form

        onSubmit={handleSubmit(onSubmit)}

        className="w-full max-w-md border rounded-2xl p-8 flex flex-col gap-5"

      >

        <h1 className="text-3xl font-bold">

          Register

        </h1>

        <Input

          label="Name"

          placeholder="Enter name"

          error={errors.name?.message}

          {...register("name")}

        />

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

        <div className="flex flex-col gap-2">

          <label className="text-sm font-medium">

            Role

          </label>

          <select

            className="border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"

            {...register("role")}

          >

            <option value="">

              Select role

            </option>

            <option value="tenant">

              Tenant

            </option>

            <option value="landlord">

              Landlord

            </option>

          </select>

          {

            errors.role && (

              <p className="text-red-500 text-sm">

                {errors.role.message}

              </p>

            )

          }

        </div>

        <Button loading={isSubmitting}>

          Register

        </Button>

      </form>

    </div>

  );

};

export default Register;