import { useState, useEffect} from "react";
import Axios from "axios";
import { BrowserRouter as  Switch, Link, useHistory} from "react-router-dom";
import tiles from "../images/tiles.jpg";
import Logo from "./Logo.js";
import CloseIcon from '@material-ui/icons/Close';
import styled from "styled-components"
Axios.defaults.withCredentials = true;
const ModalLogin = styled.div`
    height: fit-content;
`;
const FormLogin = (props) => {
  const history = useHistory()
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const loginAccount = (event) => {
    event.preventDefault();
    //Username, Email and Phone validation

    if (!values.username.trim()) {
      errors.username = "This field is required";
    } else {
      errors.username = "";
    }
    //Password validation
    if (!values.password.trim()) {
      errors.password = "This field is required";
    } else {
      errors.password = "";
    }

    if (errors.message || errors.password || errors.username) {
      errors.message = "";
      setValues({
        ...values,
        username: values.username,
        password: values.password,
      });
    }
    if (errors.username === "" && errors.password === "") {
      Axios.post("/api/users/login", {
        username: values.username,
        password: values.password,
      })
        .then((res) => {
          localStorage.setItem('isLoggedIn', true);
          setValues({
            ...values,
            username: "",
            password: "",
          });
          window.location ="/"
        })
        .catch((error) => {
          errors.message = error.response.data.message;
          setValues({
            ...values,
            username: values.username,
            password: values.password,
          });
        });
    }
  };
  return (
    <div className="BaseLogin w-screen h-screen flex justify-center overflow-auto absolute top-0 pt-14 bg-cyan-blue z-10">
      <ModalLogin className="Login-modal bg-snow w-64 md:w-104 shadow-xl rounded-xl relative pb-52 md:pb-32">
      <Logo
        position="absolute"
        w="w-24"
        h="h-24"
      />
        <div className="absolute right-5 top-5">
          <Link to="/">
            <CloseIcon className="cursor-pointer"/>
          </Link>
        </div>
          <form onSubmit={loginAccount} className="w-full h-full">
            <div className="form-content w-full md:w-64 md:ml-52 md:mt-28 text-sm flex flex-col mt-20 px-4">
              <input
                className="border border-gray-300 rounded-md text-center py-1.5 focus:outline-none "
                type="text"
                placeholder="Username, Email or Phone"
                name="username"
                onChange={handleChange}
                value={values.username}
              />
              <div className="text-red-600 self-start text-xs mt-0.5 text-left">
                {errors.username}
              </div>
              <input
                className="border border-gray-300 rounded-md text-center py-1.5 mt-2 focus:outline-none"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
              />
              <div className="text-red-600 self-start text-xs mt-0.5 text-left">
                {errors.password}
              </div>
              <div className="text-red-600 self-start text-xs mt-0.5 text-left">
                {errors.message}
              </div>
              <button className="bg-cyan-blue text-white border py-1.5 px-4 rounded-md text-center mt-3 hover:bg-blue-200 hover:text-cyan-blue">
                Sign in
              </button>
            </div>
          </form>
          <div className="md:float-left">
           <img src={tiles} alt="Tiles" className="object-cover rounded-b-xl md:rounded-l-xl md:rounded-br-none md:h-full md:w-2/6 absolute bottom-0" />
          </div>
        </ModalLogin> 
    </div>
  );
};
export default FormLogin;
