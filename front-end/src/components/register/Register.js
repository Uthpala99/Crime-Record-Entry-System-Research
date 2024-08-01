import { useContext, useState } from "react";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialState = {
  name:"",
  gender:"",
  role:"",
  email: "",
  password: "",
  confirmPassword:"",
};

function Register() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(initialState);
  const { name, email, password, confirmPassword } = data;
  const [isLoading, setisLoading] = useState(false);
  const [role, setRole] = useState('normalUser');
  console.log("🚀 ~ file: Register.js ~ line 23 ~ Register ~ role", role)
  const [gender, setGender] = useState('');
  console.log("🚀 ~ file: Register.js ~ line 25 ~ Register ~ gender", gender)

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRole = e => {
    setRole(e.target.value)
  }

  const handleGender = e => {
    setGender(e.target.value)
  }

  const handleClick = () => {
    setVisible(!visible);
  };


  const register = async (e) => {
    e.preventDefault();

    // check fields
    if (!email || !password || !name || !gender || !role || !confirmPassword )
      return toast("Please fill in all fields.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });

    if (password != confirmPassword )
      return toast("Password is not match", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });

      try {
        setisLoading(true);
        const res = await axios.post("/api/auth/register", { email, password, role, gender, name });
  
        setisLoading(false);
        toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        window.location.href = "/signin";
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  
    }
  };


  return (
    <div className="layout">
      <ToastContainer />
      <form class="max-w-sm mx-auto">
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input type="name" name="name" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
          <select name="gender" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={gender} required onChange={handleGender}>
            <option value="" >-- Select Your Gender --</option>
            <option  value="male">Male</option>
            <option  value="female">Female</option>
          </select>
        </div>
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
          <select name="role" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={role} required onChange={handleRole}>
            <option value="normalUser" selected>Normal User</option>
            <option  value="admin">Admin</option>
          </select>
        </div>
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input type="email" name="email" onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@email.com" required />
        </div>
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input name="password" type={visible ? "text" : "password"} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /> 
        </div>
        <div class="mb-5">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
          <input name="confirmPassword" type={visible ? "text" : "password"} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required /> 
        </div>
        <button type="submit" onClick={register} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
        <br />
        <br />
        <a class="" href="/signin">Sign In</a>
      </form>
    </div>
  )
}

export default Register