import axios from "axios";
import { baseUrl } from "../constants";
import toast from "react-hot-toast";
import { useState } from "react";

const EventDeleteModal = ({ onClose, id, setRefetch }) => {
  const [loading, setLoading] = useState(null);
  const eventDeleteHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.delete(`${baseUrl}/event/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("x-access-token"),
        },
      });
      if (response.status === 200) {
        toast.success(
          response?.data?.data?.message || "Event successfully deleted"
        );
        setRefetch((prev) => !prev);
      }
    } catch (error) {
      toast.error("Something went wrong please try again latterdsaffasf");
    } finally {
      setLoading(false);
      onClose();
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md relative">
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-4 right-8 text-gray-500 hover:text-gray-700 text-lg${
            loading ? "cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          X
        </button>
        <h1 className="text-xl mt-3">Confirm event deletion</h1>
        <p className="mt-2 text-lg">
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div className="flex justify-end mt-5">
          <button
            className={`text-white text-center px-6 py-2 rounded ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-red-500"
            }`}
            disabled={loading}
            type="submit"
            onClick={eventDeleteHandler}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDeleteModal;
