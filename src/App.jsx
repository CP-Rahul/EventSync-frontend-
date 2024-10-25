import EventList from "./components/EventList";
import Navbar from "./components/NavBar"
import { useState } from "react";

const App = () => {
  const [refetch, setRefetch] = useState(false); 
  return(
    <>
    <Navbar setRefetch={setRefetch}/>
    <EventList refetch={refetch} setRefetch={setRefetch}/>
    </>
  )
}

export default App;
