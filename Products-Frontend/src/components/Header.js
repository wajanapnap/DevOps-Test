import { BrowserRouter as Switch, Link} from "react-router-dom";
import Logo from "./Logo.js";
import Axios from "axios";
import SearchIcon from '@material-ui/icons/Search';
import { useState, useEffect } from "react";
const Header = (props) => {
  const logOut = () => {
    if (window.confirm("Do you want to logout?") === true) {
      Axios.get("/api/users/logout");
      localStorage.removeItem('isLoggedIn')
      window.location = "/login";
    }
  };
  // const [showResults, setShowResults] = useState(false)
  const Search = () => {
    return (
      <div className="Search flex items-center text-xs flex-grow relative">
        <SearchIcon className="material-icons absolute pl-2 text-gray-400"/>
        <input
          type="text"
          placeholder="ค้นหาสินค้า"
          className="bg-transparent flex flex-grow h-8 pl-7 border-2 border-gray-300 rounded-3xl focus:outline-none"
        />
      </div>
    );
  };

  const LoginButton = () => {
    // const onClickForLogin = () => setShowResults(true)
    return (
      <Link to={`/login`}>
        <button className="LoginButton text-xs border-2 mb-1 border-gray-400 md:w-16 md:h-8 w-14 h-6 text-gray-400 rounded-md font-semibold flex-shrink-0 md:text-base">
          Log in
        </button>
      </Link>
    );
  };

  return (
    // <Router>
    <>
      <div className="Header overflow-hidden w-screen border-none py-5 px-5 space-x-3 flex justify-center items-center">
        <Link to="/">
          <Logo
            position="static"
            w="w-14"
            h="h-14"
          />
        </Link>
        <Search />
        {localStorage.getItem('isLoggedIn') ? (
          <div className="loggedIn text-xs flex flex-col items-end break-all text-right">
            <div className="profile-pic rounded-full bg-gray-200 w-10 h-10"></div>
            <div>{props.username}</div>
            <div
              className="text-red-500 cursor-pointer hover:underline"
              onClick={logOut}
            >
              Log out
            </div>
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </>
    // {/* </Router> */}
  );
};
export default Header;
