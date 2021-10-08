import "./App.css";
import "./styles/output.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Brands from "./pages/Brands";
import Header from "./components/Header.js";
import Navbar from "./components/Navbar.js";
import { useState, useEffect } from "react";
import FormLogin from "./components/FormLogin.js";
import UserManage from "./pages/UsersManage.js";
import PrivateRoute from "./components/PrivateRoute";
import Axios from "axios";
const App = () => {

  const [username, setUsername] = useState("");
  useEffect(() => {
    Axios.get("/api/users/login")
    .then((response) => {
      setUsername(response.data.user);
    })
    .catch((error) => {
      if (!error.response || error.response.status === 401) {
        console.log(error.response);
      }
    });
  }, []);
  return (
    <div className="App w-screen h-screen overflow-x-hidden">
       <Router>
        <Header
          username={username}
        />
        <Navbar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/brands" component={Brands} />
          <Route path="/login" component={() => <FormLogin/>} />
          <PrivateRoute path="/users" component={() => <UserManage setUsername={setUsername} />}/>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
