import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import EventForm from "./EventForm";
import toast from "react-hot-toast";

const Navbar = ({ setRefetch }) => {
  const [isFormShown, setIsFormShown] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    setIsFormShown((prev) => !prev);
  };
  const handleLogout = () => {
    localStorage.removeItem("x-access-token");
    toast.success('Logout Successfull');
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-gray-200 p-4 flex justify-between gap-5">
        <Link href={"/"} className="text-center text-2xl font-bold">
          EventSync
        </Link>
        <div className="flex gap-4">
          <button
            className="bg-white text-center border border-violet-300 text-violet-400 px-4 py-2 rounded "
            onClick={handleClick}
            disabled={isFormShown}
          >
            Add Event
          </button>
          <button
            className=" bg-indigo-600 text-white text-center px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
      {isFormShown && (
        <EventForm onClose={handleClick} setRefetch={setRefetch} />
      )}
    </>
  );
};

export default Navbar;
