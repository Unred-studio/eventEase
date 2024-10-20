import { useState } from "react";
import MailCard from "./components/MailCards";
import Timetable from "./components/timetable";

function App() {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [emailJson, setEmailJson] = useState({});
  const [showTimeTable, setShowTimeTable] = useState(false);

  const handleDoneButtonClick = (eventArr, emailJson) => {
    setSelectedEvents(eventArr);
    setEmailJson(emailJson);
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

export default App;
