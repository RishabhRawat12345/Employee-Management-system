
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
  const navigate=useNavigate();
  const handleClick=()=>{
      navigate("/");
  }
  return (
    <div className="bg-black fixed top-0 left-0 right-0 z-20 flex justify-between items-center h-[4rem] px-4 sm:px-6 lg:px-8">
      <div className="left">
      </div>
      <div className="right text-white">
        <button onClick={handleClick} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm sm:text-[14px] font-bold tracking-wide shadow-md w-fit mt-1">
          Log out
        </button>
      </div>
    </div>
  );
};
export default Navbar;
