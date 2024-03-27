import React, { useState } from "react";
import { useForm } from 'react-hook-form';

export default function Login() {
  const [form, setForm] = useState("SignIn");
  
  const handleFormChange = (newForm) => {
    setForm(newForm);
  };

  return (
    <section className="window-size flex flex-col justify-center items-center mt-4 bg-shark-200 dark:bg-darkBg rounded-2xl">
      <h1 className="text-7xl text-darkBg dark:text-white font-bold tracking-tighter mb-4">
        chappy.
      </h1>
      <div className="min-w-36 max-w-96">
          {form === "SignIn" ? (
            <SignIn handleFormChange={handleFormChange} />
          ) : (
            <Register handleFormChange={handleFormChange} />
          )}
      </div>
    </section>
  );
}

const SignIn = ({ handleFormChange }) => {
  
    return (
    <form className="flex flex-col justify-center items-center w-full mx-auto gap-2 text-white">
      <input type="text" className="input" placeholder="Username" />
      <input type="password" className="input" placeholder="Password" />
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
      <button className="button border-none">Login</button>
    </form>
  );
};

const Register = ({ handleFormChange }) => {
  return (
    <form className="flex flex-col justify-center items-center w-full mx-auto gap-2 dark:text-white">
      <input type="text" className="input" placeholder="Desired Username" />
      <div className="flex gap-2">
        <input type="password" className="input" placeholder="Password" />
        <input
          type="password"
          className="input"
          placeholder="Retype Password"
        />
      </div>
      <input type="email" className="input" placeholder="Email" />
      <input type="email" className="input" placeholder="Confirm Email" />
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
      <button className="button border-none">Register</button>
    </form>
  );
};
