import { BrowserRouter as Route, Link} from "react-router-dom";
const Navbar = () => {
    return (
      <div className="Navbar w-full h-12 md:h-14 lg:h-16 relative flex flex-row shadow-xl z-10 justify-center items-center space-x-5 xs:space-x-8 xsm:space-x-10 text-xs md:text-base md:space-x-16 font-medium text-gray-500">
        <Link to="/">
          <div className="cursor-pointer">หน้าแรก</div>
        </Link>
        <Link to="/brands">
          <div>สินค้าทุกแบรนด์</div>
        </Link>
        <Link to="#">
          <div>จัดการสินค้า</div>
        </Link>
        <Link to="/users">
          <div>จัดการผู้ใช้</div>
        </Link>
        <Link to="#">
          <div>เกี่ยวกับเรา</div>
        </Link>
      </div>
    );
  };
export default Navbar;
