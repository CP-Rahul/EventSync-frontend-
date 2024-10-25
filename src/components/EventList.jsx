import axios from "axios";
import { baseUrl } from "../constants";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { dateTimeFormater } from "../utils/dateTimeFormater";
import toast from "react-hot-toast";

const EventList = ({ refetch, setRefetch }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchEvents = async () => {
    try {
      setLoading(true);
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
      toast.error(
        error.response?.data?.error ||
          "Something went wrong while fetching event"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [refetch]);

  return (
    <>
      <div className="grid gap-5 p-8 sm:grid-cols-2 md:grid-cols-3">
        {loading ? (
          <p>Loading...</p>
        ) : events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={dateTimeFormater(event.date)}
              description={event.description}
              setRefetch={setRefetch}
            />
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>
    </>
  );
};

export default EventList;
