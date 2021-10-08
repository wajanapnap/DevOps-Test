import { useState } from "react";
import Axios from "axios";
import tiles from "../images/tiles.jpg";
import Logo from "./Logo.js";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
Axios.defaults.withCredentials = true;
const ModalLogin = styled.div`
  height: fit-content;
`;

const FormEditUser = (props) => {
  const closeEditUser = () => {
    props.setIsEdit(false);
  };

  const [values, setValues] = useState({
    id: props.editUser.id,
    username: props.editUser.username,
    email: props.editUser.email,
    mobile: props.editUser.mobile,
    role: props.editUser.role,
  });
  const [errors] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  // const mailFormat = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
  const usernameFormat = new RegExp(
    /(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
  );
  // const moblieFormat = new RegExp(/^(0[689]{1})+([0-9]{8})+$/g);
  const getUser = () => {
    Axios.get("/api/users")
      .then((response) => {
        props.setUserData(response.data);
      })
      .catch((error) => {
        if (!error.response || error.response.status === 401) {
          console.log(error.response);
        }
      });
  };
  const getLoginUser = () => {
    Axios.get("/api/users/login")
      .then((response) => {
        props.setUsername(response.data.user);
      })
      .catch((error) => {
        if (!error.response || error.response.status === 401) {
          console.log(error.response);
        }
      });
  };
  const editUser = (event) => {
    console.log(values.role);
    console.log(values.username);
    event.preventDefault();
    //Username validation
    // if (!values.username.trim()) {
    //   errors.username = "This field is required";
    // } else
    if (values.username.trim().length > 25) {
      errors.username = "Your username must be only 25 characters";
    } else if (!usernameFormat.test(values.username)) {
      errors.username = "Your username must contain only alphanumerics";
    } else if (values.username.trim().length < 6) {
      errors.username = "Your username must be at least 6 characters";
    } else {
      errors.username = "";
    }
    // if (!mailFormat.test(values.email)) {
    //   errors.email = "Enter your email only";
    // } else {
    //   errors.email = "";
    // }
    // if (!moblieFormat.test(values.mobile)) {
    //   errors.mobile = "Enter your mobile only";
    // } else {
    //   errors.mobile = "";
    // }
    if (errors.message || errors.username || errors.email || errors.mobile) {
      errors.message = "";
      setValues({
        ...values,
        username: values.username,
        email: values.email,
        mobile: values.mobile,
        role: values.role,
      });
    }
    if (errors.username === "") {
      Axios.put("/api/users/userAndUpload", {
        id: values.id,
        username: values.username,
        email: values.email,
        mobile: values.mobile,
        role: values.role,
      })
        .then(() => {
          getLoginUser();
          getUser();
          closeEditUser();
        })
        .catch((error) => {
          errors.message = error.response.data.message;
          setValues({
            ...values,
            username: values.username,
            email: values.email,
            mobile: values.mobile,
            role: values.role,
          });
        });
    }
  };

  return (
    <div className="BaseLogin w-screen h-screen flex justify-center overflow-auto absolute bg-black bg-opacity-50 top-0 pt-14 z-10">
      <ModalLogin className="Login-modal bg-snow w-64 md:w-104 shadow-xl rounded-xl relative pb-52 md:pb-32">
        {/* <Logo position="absolute" w="w-24" h="h-24" /> */}
        <div className="font-semibold text-base md:text-lg absolute left-24 top-8 md:left-74 md:top-10 z-10">Edit User</div>
        <div className="absolute right-5 top-5">
          <CloseIcon onClick={closeEditUser} className="cursor-pointer" />
        </div>
        <form onSubmit={editUser} className="w-full h-full">
          <div className="form-content w-full md:w-64 md:ml-52 md:mt-28 text-sm flex flex-col mt-20 px-4 space-y-1.5">
            <input
              className="border border-gray-300 rounded-md text-center py-1.5 focus:outline-none "
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={values.username}
            />
            <div className="text-red-600 self-start text-xs mt-0.5 text-left">
              {errors.username}
            </div>
            <input
              className="border border-gray-300 rounded-md text-center py-1.5 focus:outline-none"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={values.email ? values.email : ""}
            />
            <div className="text-red-600 self-start text-xs mt-0.5 text-left">
              {errors.email}
            </div>
            <input
              className="border border-gray-300 rounded-md text-center py-1.5 focus:outline-none"
              type="mobile"
              name="mobile"
              placeholder="Mobile"
              onChange={handleChange}
              value={values.mobile ? values.mobile : ""}
            />
            <div className="text-red-600 self-start text-xs mt-0.5 text-left">
              {errors.mobile}
            </div>
            {/* <input
              className="border border-gray-300 rounded-md text-center py-1.5 mt-2 focus:outline-none"
              type="role"
              name="role"
              placeholder="role"
              onChange={handleChange}
              value={values.role}
            /> */}
            <select
              name="role"
              type="role"
              value={values.role}
              onChange={handleChange}
              className="border border-gray-300 rounded-md text-center py-1.5 focus:outline-none"
            >
              <option value="Staff" className="py-1">
                Staff
              </option>
              <option value="Admin" className="py-1">
                Admin
              </option>
            </select>
            <div className="text-red-600 self-start text-xs mt-0.5 text-left">
              {errors.role}
            </div>
            <div className="text-red-600 self-start text-xs mt-0.5 text-left">
              {errors.message}
            </div>
            <button className="bg-cyan-blue text-white border py-1.5 px-4 rounded-md text-center mt-3 hover:bg-blue-200 hover:text-cyan-blue">
              Submit
            </button>
          </div>
        </form>
        <div className="md:float-left">
          <img
            src={tiles}
            alt="Tiles"
            className="object-cover rounded-b-xl md:rounded-l-xl md:rounded-br-none md:h-full md:w-2/6 absolute bottom-0"
          />
        </div>
      </ModalLogin>
    </div>
  );
};
export default FormEditUser;
