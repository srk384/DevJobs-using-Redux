import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="h-20 flex justify-around items-center ">
        <div>
            <img src="/images/logo2.png" alt="" />
        </div>
        <ul className="flex gap-8 font-semibold dark:text-gray-100">
            <Link to={"/jobs"}><li className='cursor-pointer hover:underline underline-offset-4 transition'>Jobs</li></Link>
            <Link to={"/applied-jobs"}><li className='cursor-pointer hover:underline underline-offset-4 transition'>Applied Jobs</li></Link>
            <li className='cursor-pointer hover:underline underline-offset-4 transition'>About Us</li>
        </ul>
    </div>
  )
} 

export default Navbar