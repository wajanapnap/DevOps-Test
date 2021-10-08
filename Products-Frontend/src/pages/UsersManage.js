import { useState, useEffect } from "react";
import Axios from "axios";
import FormEditUser from "../components/FormEditUser";
import FormAddUser from "../components/FormAddUser";
const UsersManage = (props) => {
  useEffect(() => {
    getUser()
  }, []);
  // const history = useHistory();
  // const [values, setValues] = useState({
  //   username: "",
  //   password: "",
  //   emailOrMobile: "",
  //   rePassword: "",
  // });
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [userData, setUserData] = useState([]);
  const [editUser, setEditUser] =useState({})
  const getUser = () =>{
    Axios.get("/api/users")
    .then((response) => {
      setUserData(response.data);
    })
    .catch((error) => {
      if (!error.response || error.response.status === 401) {
        console.log(error.response);
      }
    });
  }
  const deleteUser = (id) =>{
    Axios.delete(`/api/users/delete/${id}`).
      then((response)=>{
        getUser()
        localStorage.removeItem('isLoggedIn')
      })
      .catch((error) => {
        if (!error.response) {
          console.log(error.response);
        }
      });
  }
  return (

    // <table>
    //     <thead>
    //       <tr>
    //         <th scope="col">id</th>
    //         <th scope="col">username</th>
    //         <th scope="col">moblie</th>
    //         <th scope="col">email</th>
    //         <th scope="col">role</th>
    //         <th scope="col">action</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {userData.map((user, index) => {
    //         return (
    //           <tr key={index}>
    //             <td>{user.id}</td>
    //             <td>{user.username}</td>
    //             <td>{user.moblie ? user.moblie : "-"}</td>
    //             <td>{user.email ? user.email : "-"}</td>
    //             <td>{user.role}</td>
    //             <td>
    //               <MoreVertIcon
    //                 style={{ cursor: "pointer" }}
    //               />
    //             </td>
    //           </tr>
    //         );
    //       })}
    //     </tbody>
    //   </table>

    <>
    

    {isEdit === false ? null : <FormEditUser setUsername={props.setUsername} editUser={editUser} setUserData={setUserData} userData={userData} setIsEdit={setIsEdit}></FormEditUser>}
    {isAdd === false ? null : <FormAddUser setUserData={setUserData} userData={userData} setIsAdd={setIsAdd}></FormAddUser>}
      <section className=" container mx-auto pr-14 pl-14 pt-14 font-mono ">
      
        <div className="flex justify-end ">
      <button onClick={()=>{setIsAdd(true) }} className="w-32 mb-2 bg-cyan-blue text-white border py-1.5 px-4 rounded-md text-center mt-3 hover:bg-blue-200 hover:text-cyan-blue">
          Add User
        </button>
        </div>
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto">

            <table className="w-full">
              <thead>
                <tr className="text-center text-md font-semibold tracking-wide text-gray-900 bg-red-600 uppercase border-gray-600 ">

                </tr>
                <tr className="text-center text-md font-semibold tracking-wide text-gray-900 bg-gray-100 uppercase  border-gray-600">
                  {/* <th className="px-4 py-3">id</th> */}
                  <th className="px-4 py-3">username</th>
                  <th className="px-4 py-3">mobile</th>
                  <th className="px-4 py-3">email</th>
                  <th className="px-4 py-3">role</th>
                  <th className="px-4 py-3">action</th>
                </tr>

              </thead>
              <tbody className="bg-white">
                {userData.map((user) => {
                  return (
                    <tr key={user.id} className="text-gray-700">
                      {/* <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                            <img className="object-cover w-full h-full rounded-full" src="https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt="" loading="lazy" />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                          </div>
                          <div>
                            <p className="font-semibold text-black">{user.id}</p>
                            <p class="text-xs text-gray-600">Developer</p>
                          </div>
                        </div>
                      </td> */}
                      <td className="px-4 py-3 text-ms font-semibold border">{user.username}</td>
                      {/* <td class="px-4 py-3 text-xs border">
              <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">{user.moblie ? user.moblie : "-"}</span>
            </td> */}
                      <td className="px-4 py-3 text-sm border">{user.mobile ? user.mobile : "-"}</td>
                      <td className="px-4 py-3 text-sm border">{user.email ? user.email : "-"}</td>
                      <td className="px-4 py-3 text-sm border">{user.role}</td>
                      <td className="py-4 px-6 border-b border-grey-light">
                        <button onClick={()=>{setIsEdit(true);setEditUser(user)}} className="cursor-pointer font-semibold leading-tight text-green-700 bg-green-100 rounded-sm py-1 px-3 mx-2">Edit</button>
                        <button onClick={()=>{if(window.confirm(`Do you want to delete user ${user.username} ? `) === true) deleteUser(user.id)}} className="font-semibold leading-tight text-red-700 bg-red-100 rounded-sm py-1 px-3 mx-2">Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
     
    </>


  );
};
export default UsersManage;
