//Imports
import { useState, useEffect } from "react";
import MailCard from "./components/MailCards";
import Timetable from "./components/Timetable";

//App Component
function App() {
  //initizing UseStates
  const [selectedEvents, setSelectedEvents] = useState([]); //Array of user selected events [Obtain from MailCard.jsx]
  const [showTimeTable, setShowTimeTable] = useState(false); //Toggle between mailCard and Timetable

  //Send the selectedEvents and emailJson to Timetable.jsx + Toggle mailCard off to show Timetable
  const handleDoneButtonClick = (eventArr) => {
    setSelectedEvents(eventArr);
    setShowTimeTable(true);
  };

  //Email Data Fecthing
  const [data, setData]= useState({
    lassondeData: {},
    bethuneData: {},
    yorkData: {},
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {
  const fetchData = async () => {
    try {
      const [lassondeEmail, bethuneEmail, yorkEmail] = await Promise.all([
        fetch(`http://localhost:3001/lassonde.json`),
        fetch(`http://localhost:3001/bethune.json`),
        fetch(`http://localhost:3001/york.json`),
      ]);

      let lassondeData = await lassondeEmail.json();
      let bethuneData = await bethuneEmail.json();
      let yorkData = await yorkEmail.json();

      setData({
        lassondeData: lassondeData,
        bethuneData: bethuneData,
        yorkData: yorkData,
      });

      setIsLoading(false);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);

  return (
    <div>
      {isLoading ? (<p>Loading...</p>) :(
        <>
      {/* Show MailCard if timetable is not visible */}
      {!showTimeTable && (
        <MailCard emailData={data} onDone={handleDoneButtonClick} />
      )}

      {/* Show Timetable component when "Done" is clicked */}
      {showTimeTable && (
        <Timetable eventsIdArr={selectedEvents} emailData={data} />
      )}
      </>
      )}
    </div>
  );
}

//Exports
export default App;
