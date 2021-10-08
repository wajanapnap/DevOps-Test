import { BrowserRouter as Route} from "react-router-dom";
import FormLogin from "../components/FormLogin.js";
import FormRegister from "./UsersManage.js";
import homeBanner from "../images/homeBanner.jpg";
import ads1 from "../images/ads1.jpg";
import ads2 from "../images/ads2.jpg";
import ads3 from "../images/ads3.jpg";
import ads4 from "../images/ads4.jpg";

const Home = () => {
  const HomeBanner = () => {
    return (
      <div className="HomeBanner">
        <img
          src={homeBanner}
          alt="HomeBanner"
          className="object-fill w-full h-full"
        />
        {/* <button className="text-white bg-black text-xs w-24 h-7 rounded-3xl font-medium absolute right-12 bottom-2 uppercase tracking-wide">shop now</button> */}
      </div>
    );
  };
  const HomeBanner2 = () => {
    const adsCollection = [ads1, ads2, ads3, ads4];
    return (
      <div className="HomeBanner2 grid grid-cols-2 lg:grid-cols-4 justify-items-center px-4 md:px-28">
        {adsCollection.map((ads, index) => {
          return (
            <img key={index} src={ads} alt={`${ads}`} className="w-40 h-40 md:w-48 md:h-48" />
          );
        })}
      </div>
    );
  };
  return (
    <div className="Home">
      <HomeBanner />
      <HomeBanner2 />
        {/* <Switch> */}
          <Route path="/login" component={FormLogin}/>
        {/* </Switch> */}
    </div>
  );
};
export default Home;
