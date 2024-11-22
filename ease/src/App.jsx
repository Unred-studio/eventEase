//Imports 
import { useState } from "react";
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


  return (
    <div>
      {/* Show MailCard if timetable is not visible */}
      {!showTimeTable && <MailCard onDone={handleDoneButtonClick} />}

      {/* Show Timetable component when "Done" is clicked */}
      {showTimeTable && <Timetable eventsIdArr={selectedEvents} emailData={emailJson} />}
    </div>
  );
}

//Exports
export default App; 
