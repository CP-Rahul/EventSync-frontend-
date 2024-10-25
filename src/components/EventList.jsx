import axios from "axios";
import { baseUrl } from "../constants";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import toast from "react-hot-toast";

const EventList = ({ refetch, setRefetch }) => {
  const [events, setEvents] = useState([]);
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${baseUrl}/event/`, {
        headers: {
          "x-access-token": localStorage.getItem("x-access-token"),
        },
      });
      if (response.status === 200) {
        setEvents(response.data.data);
      } else {
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong while fetching event"); 
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [refetch]);

  return (
    <div className="grid gap-5 p-8 sm:grid-cols-2 md:grid-cols-3">
      {events && events.length > 0 ? (
        events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            date={new Date(event.date).toLocaleDateString()}
            description={event.description}
            setRefetch={setRefetch}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EventList;
