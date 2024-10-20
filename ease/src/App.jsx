import { useState } from "react";
import MailCard from "./components/MailCards";
import Timetable from "./components/timetable";

function App() {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showTimeTable, setShowTimeTable] = useState(false);

  const handleDoneButtonClick = (eventArr) => {
    setSelectedEvents(eventArr);
    setShowTimeTable(true);
  };

  return (
    <div>
      {/* Show MailCard if timetable is not visible */}
      {!showTimeTable && <MailCard onDone={handleDoneButtonClick} />}

      {/* Show Timetable component when "Done" is clicked */}
      {showTimeTable && <Timetable events={selectedEvents} />}
    </div>
  );
}

export default App;
