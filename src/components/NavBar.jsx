import { Link } from "react-router-dom";
import { useState } from "react";
import EventForm from "./EventForm";

const Navbar = ({ setRefetch }) => {
  const [isFormShown, setIsFormShown] = useState(false);
  const handleClick = () => {
    setIsFormShown((prev) => !prev);
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
          <button className=" bg-indigo-600 text-white text-center px-4 py-2 rounded">
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
