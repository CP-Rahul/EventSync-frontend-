import axios from "axios";
import { useRef, useEffect, useState } from "react";
import { baseUrl } from "../constants";
import toast from "react-hot-toast";

const EventForm = ({ onClose, setRefetch, event }) => {
  const title = useRef(null);
  const description = useRef(null);
  const date = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (event) {
      title.current.value = event.title;
      description.current.value = event.description;
      date.current.value = new Date(event.date).toISOString().slice(0, 16);
    }
  }, [event]);

  const submitEventHandler = async (e) => {
    e.preventDefault();

    if (
      !title.current.value ||
      !description.current.value ||
      !date.current.value
    ) {
      toast.error("All fields are mandatory");
      return;
    }

    const formData = {
      title: title.current.value,
      description: description.current.value,
      date: new Date(date.current.value),
    };
    const token = localStorage.getItem("x-access-token");
    setLoading(true);
    try {
      if (event) {
        const response = await axios.patch(
          `${baseUrl}/event/${event.id}`,
          formData,
          {
            headers: {
              "x-access-token": token,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Event updated successfully");
          setRefetch((prev) => !prev);
        }
      } else {
        const response = await axios.post(`${baseUrl}/event`, formData, {
          headers: {
            "x-access-token": token,
          },
        });
        if (response.status === 201) {
          toast.success("Event created successfully");
          setRefetch((prev) => !prev);
        }
      }
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md relative">
        <form className="flex flex-col gap-4" onSubmit={submitEventHandler}>
          <button
            type="button"
            onClick={onClose}
            className={`absolute top-4 right-4 text-black text-xl${
              loading ? "cursor-not-allowed" : ""
            } text-white`}
            disabled={loading}
          >
            X
          </button>
          <h1 className="text-xl font-medium mb-4">
            {event ? "Update Event" : "Add new Event"}
          </h1>
          <input
            ref={title}
            type="text"
            placeholder="Title"
            className="focus:outline-none border-2 p-2"
            required
          />
          <textarea
            ref={description}
            placeholder="Description"
            required
            className="focus:outline-none border-2 p-2 max-h-32 min-h-32"
          />
          <input
            ref={date}
            type="datetime-local"
            placeholder="Date & Time"
            required
            className="focus:outline-none border-2 p-2"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className={`text-white rounded py-2 px-3 ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-500"
              } `}
              disabled={loading}
            >
              {event ? "Update Event" : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
