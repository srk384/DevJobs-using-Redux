import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="h-20 flex justify-around items-center ">
        <div>
            <img src="/images/logo2.png" alt="" />
        </div>
        <ul className="flex gap-8 font-semibold dark:text-gray-100">
            <li className='cursor-pointer hover:underline underline-offset-4 transition'>Home</li>
            <Link to={"/alljobs"}><li className='cursor-pointer hover:underline underline-offset-4 transition'>Jobs</li></Link>
            <li className='cursor-pointer hover:underline underline-offset-4 transition'>About</li>
            <li className='cursor-pointer hover:underline underline-offset-4 transition'>Contact Us</li>
        </ul>
    </div>
  )
} 

export default Navbar