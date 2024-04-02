import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ onLogin }) {
  const [form, setForm] = useState("SignIn");
  const {
    register,
    formState: { errors, isSubmitted },
    handleSubmit,
    setError,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormChange = (newForm) => {
    setForm(newForm);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    if (form === "Register") {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/user/register",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success(
          `${response.data.message}. Redirecting you to the Login screen`,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          }
        );
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 5000);
      } catch (error) {
        toast.error(`${error.response.data.error}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      }
    } else {
      try {
        await axios.post(
          "http://localhost:3000/api/user/login",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        onLogin();
      } catch (error) {
        toast.error(`${error.response.data.message}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      }
    }
  };

  const clearErrorsOnRetypePassword = () => {
    setError("password", { message: "" });
  };

  return (
    <section className="w-full border-8 border-cod-gray-950 flex flex-col justify-center items-center bg-shark-200 dark:bg-darkBg rounded-2xl">
      <ToastContainer />
      <h1 className="text-7xl text-darkBg dark:text-white font-bold tracking-tighter mb-4">
        chappy.
      </h1>
      <div className="min-w-36 max-w-96">
        {form === "SignIn" ? (
          <SignIn
            handleFormChange={handleFormChange}
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isSubmitted={isSubmitted}
            loading={loading}
          />
        ) : (
          <Register
            handleFormChange={handleFormChange}
            onSubmit={handleSubmit(onSubmit)}
            register={register}
            errors={errors}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isSubmitted={isSubmitted}
            clearErrorsOnRetypePassword={clearErrorsOnRetypePassword}
            loading={loading}
          />
        )}
      </div>
    </section>
  );
}

const SignIn = ({
  handleFormChange,
  onSubmit,
  register,
  errors,
  showPassword,
  setShowPassword,
  isSubmitted,
  loading
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center items-center w-full mx-auto gap-2 text-white"
    >
      <input
        type="text"
        className="input"
        placeholder="Username"
        {...register("username", { required: true })}
      />
      {isSubmitted && errors.username && (
        <span className="text-red-500">Username is required</span>
      )}
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          className="input"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <button
          type="button"
          className="absolute top-4 right-2 px-2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <span className="material-symbols-outlined filled text-shark-400">
              visibility_off
            </span>
          ) : (
            <span className="material-symbols-outlined filled text-shark-400">
              visibility
            </span>
          )}
        </button>
      </div>
      {isSubmitted && errors.password && (
        <span className="text-red-500">Password is required</span>
      )}
      <p className="text-centerm text-black dark:text-white">
        If you don't have an account you can create it{" "}
        <button
          className="text-accent"
          onClick={() => handleFormChange("Register")}
        >
          here
        </button>
        .
      </p>
      <button className="button border-none disabled:bg-opacity-75" {...(loading && { disabled: true })} >
        Login
        {loading && <span className="loading loading-ring loading-xs"></span>}
      </button>
    </form>
  );
};

const Register = ({
  handleFormChange,
  onSubmit,
  register,
  errors,
  showPassword,
  setShowPassword,
  isSubmitted,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center items-center w-full mx-auto gap-2 dark:text-white"
    >
      <div className="flex items-center w-full gap-1">
        <input
          type="email"
          className="input"
          placeholder="Email"
          {...register("email", {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
        />
        {isSubmitted && errors.email && errorMessage("Invalid email address")}
      </div>
      <div className="flex w-full gap-1 items-center">
        <input
          type="text"
          className="input"
          placeholder="Desired Username"
          {...register("username", {
            required: true,
            maxLength: 16,
            minLength: 5,
          })}
        />
        {isSubmitted && errors.username && errorMessage("Username is required")}
      </div>
      <div className="flex items-center gap-1 w-full">
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            className="input"
            placeholder="Password"
            {...register("password", {
              required: true,
              maxLength: 20,
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*[Il10O]).{12,}/,
                message:
                  "Password must be at least 12 characters long and contain at least one letter, one digit, and one special character (such as -+_!@#$%^&*.,?)",
              },
            })}
          />
          <button
            type="button"
            className="absolute top-4 right-2 px-2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <span className="material-symbols-outlined filled text-shark-400">
                visibility_off
              </span>
            ) : (
              <span className="material-symbols-outlined filled text-shark-400">
                visibility
              </span>
            )}
          </button>
        </div>
        {isSubmitted &&
          errors.password &&
          errors.password.type === "required" &&
          errorMessage("Password is required")}
        {isSubmitted &&
          errors.password &&
          errors.password.type === "pattern" &&
          errorMessage(errors.password.message)}
      </div>
      <p className="text-centerm text-black dark:text-white">
        If you don't have an account you can create it{" "}
        <button
          className="text-accent"
          onClick={() => handleFormChange("SignIn")}
        >
          here
        </button>
        .
      </p>
      <button type="submit" className="button border-none disabled:bg-opacity-75" {...(loading && { disabled: true })} >
        Register
        {loading && <span className="loading loading-ring loading-xs"></span>}
      </button>
    </form>
  );
};

const errorMessage = (error) => {
  return (
    <div className="tooltip tooltip-right tooltip-error" data-tip={error}>
      <span className="material-symbols-outlined text-red-400">error</span>
    </div>
  );
};
