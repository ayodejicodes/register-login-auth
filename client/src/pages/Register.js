import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // console.log(formData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isLoading, isSuccess, isError, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="global-container text-xl ">
      <h1 className="text-center font-semibold m-12">
        Register to get started
      </h1>

      <div className="flex justify-center items-center">
        <div className=" flex border-2 rounded-lg  ">
          {/* left */}

          <img
            src="https://source.unsplash.com/kUqqaRjJuw0"
            className="object-cover h-100 w-96 rounded-xl flex-1 "
            alt=""
          />

          {/* right */}
          <form onSubmit={onSubmit} className="flex-1 p-7 flex flex-col gap-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="text-lg ">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Please enter your name"
                className=" placeholder-style input-style"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-lg ">
                Email
              </label>
              <input
                type="email"
                placeholder="Please enter your email"
                id="email"
                className="placeholder-style input-style "
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="text-lg ">
                Password
              </label>
              <input
                type="password"
                placeholder="Please enter a passowrd"
                id="password"
                className="placeholder-style input-style "
                name="password"
                value={password}
                onChange={onChange}
                autoComplete="on"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="text-lg ">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                className="placeholder-style input-style "
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                autoComplete="on"
              />
            </div>
            <div>
              <button type="submit" className="btn-submit mt-2">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
