// Imports
import React, { useState, useEffect } from "react";
//Dayjs Imports and Extensions start Here
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc"; // Import the UTC plugin

dayjs.extend(customParseFormat); // Extend with customParseFormat
dayjs.extend(utc); // Extend with UTC plugin
// Dayjs Imports and Extensions end Here

// The Timetable component takes the array of event IDs and the email data as props
function Timetable({ eventsIdArr, emailData }) {
  console.log("Email Data:", emailData);
  console.log("Events ID Array:", eventsIdArr);


  //Initializing UseStates
  const [activeTabContent, setActiveTabContent] = useState(null); // Show the Tab Content of selected date; array of dates
  const [activeTab, setActiveTab] = useState(0); // Toggle to selected date Tab; array of index of dates


  useEffect(() => {
    if (datesArr.length > 0) {
      setActiveTabContent(datesArr[0]); //Automatically preselect the first available day
    }
  }, []); //Help to toggle the date tabs


  //FUNCTIONS

  //create an array of dates between startDate and endDate
  function getDatesInRange(edition) {
    let [startDate, endDate] = edition.split("-");
    startDate = startDate.charAt(0).toUpperCase() + startDate.slice(1);
    endDate = endDate.charAt(0).toUpperCase() + endDate.slice(1);

    startDate = dayjs(startDate + "2024", "MMMDDYYYY");
    endDate = dayjs(endDate + "2024", "MMMDDYYYY");
    let dates = [];
    let currentDate = dayjs(startDate);

    while (
      currentDate.isBefore(endDate) ||
      currentDate.isSame(endDate, "day")
    ) {
      dates.push(currentDate);
      currentDate = currentDate.add(1, "day");
    }

    return dates;
  }
  const datesArr = getDatesInRange(emailData.edition); //create an array of dates and assign it to datesArr
  // getDatesInRange end Here



  // Format date and time for Google Calendar
  const formatDateTime = (date, time) => {
    if (!date) return null;

    const eventDate = dayjs(date);

    if (time) {
      const [startTime, endTime] = time.split(" - ");

      // Combine date and time, then convert to UTC
      const startDateTime = dayjs(
        `${date} ${startTime.trim()}`,
        "YYYY-MM-DD hh:mm A"
      ).utc();
      const endDateTime = dayjs(
        `${date} ${endTime.trim()}`,
        "YYYY-MM-DD hh:mm A"
      ).utc();

      // Format for Google Calendar: YYYYMMDDTHHmmssZ
      return `${startDateTime.format("YYYYMMDDTHHmmss")}Z/${endDateTime.format(
        "YYYYMMDDTHHmmss"
      )}Z`;
    } else {
      const formattedDate = eventDate.format("YYYYMMDD");
      return `${formattedDate}/${formattedDate}`; // All-day event
    }
  };
  // formateDateTime end Here

  //onCLick Function

  const toggleTabContent = (date, index) => {   // Change the active tab and tab content on click
    setActiveTabContent(date);
    setActiveTab(index);
  };


  //RENDER TAB CONTENT

  // Filter events in range of selected date
  const renderTabContent = () => {
    if (!activeTabContent) return null;

    const renderEvents = emailData.events.filter((event) => { //Filters the events which are on the selected date and store them in renderEvents
      return (event.date === activeTabContent.format("YYYY-MM-DD") && eventsIdArr.includes(event.id));
    });

    return (
      <div className="row g-4">
        {renderEvents.length > 0 ? (
          renderEvents.map((event) => (
            <div className="col-lg-4 col-md-6 mb-4" key={event.id}>
              <div className="single-schedules-inner shadow p-3 h-100 d-flex flex-column">
                <div className="date">{event.time || "No specific time mentioned"}</div>
                <div className="location">{event.location || "Location details not provided"}</div>
                <h5>{event.name}</h5>
                <p>{event.summary}</p>
                <a href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&details=${encodeURIComponent(event.summary)}&location=${encodeURIComponent(event.location || "")}&dates=${formatDateTime(event.date, event.time)}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-auto">
                  Add to Google Calendar
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No events for this day.</p>
        )}
      </div>
    );
  };

  // Filter out-of-range events
  const renderOutOfRangeEvents = () => {
    const outOfRangeEvents = emailData.events.filter((event) => {
      const eventDate = dayjs(event.date);
      return !datesArr.some((date) => date.isSame(eventDate, "day"));
    });

    return (
      <div className="row g-4">
        {outOfRangeEvents.length > 0 ? (
          outOfRangeEvents.map((event) => (
            <div className="col-lg-4 col-md-6 mb-4" key={event.id}>
              <div className="single-schedules-inner shadow p-3 h-100 d-flex flex-column">
                <div className="date">{event.time || "No specific time mentioned"}</div>
                <div className="location">{event.location || "Location details not provided"}</div>
                <div className="date">{(dayjs(event.date).format("ddd, MMM DD") != "Invalid Date" && dayjs(event.date).format("ddd, MMM DD")) || "No date provided"}</div>
                <h5>{event.name}</h5>
                <p>{event.summary}</p>
                <a href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&details=${encodeURIComponent(event.summary)}&location=${encodeURIComponent(event.location || "")}&dates=${formatDateTime(event.date, event.time)}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-auto">
                  Add to Google Calendar
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No out-of-range events.</p>
        )}
      </div>
    );
  };

  //Render the timetable component
  return (
    <div className="schedules-area pd-top-110 pd-bottom-120">
      <div className="container">

        {length(eventsIdArr.flat()) === 0 ? <h1 className="text-center">No events found</h1> : null}

        {/* Rendering the section title */}
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-8">
            <div className="section-title text-center">
              <h2>Event Schedules</h2>
              <p>Check out the event schedules and add them to your calendar.</p>
            </div>
          </div>
        </div>
        {/* Rendering the section title End Here */}

        {/* Rendering the tab navigation */}
        <div className="evt-tab-inner text-center mb-4">
          <ul className="nav nav-tabs" role="tablist">
            {/* Rendering the date tabs based on the datesArr */}
            {datesArr.map((date, index) => (
              <li className="nav-item" role="presentation" key={index}>
                <a className={`nav-link ${activeTab === index ? "active" : ""}`} data-toggle="pill" role="tab" aria-selected={activeTab === index ? "true" : "false"} onClick={() => toggleTabContent(date, index)}>
                  <span>Day {index + 1} </span>
                  {date.format("ddd, MMM DD")}
                </a>
              </li>
            ))}
            {/* Rendering the "Others" tab */}
            <li className="nav-item" role="presentation">
              <a className={`nav-link ${activeTab === "outOfRange" ? "active" : ""}`} id="ex1-tab-outOfRange" data-toggle="pill" href="#ex1-tabs-outOfRange" role="tab" aria-selected={activeTab === "outOfRange" ? "true" : "false"} onClick={() => setActiveTab("outOfRange")}>
                <span>Others</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Render Tab content */}
        <div className="tab-content" id="ex1-content" style={{ marginTop: '20px' }}>
          {activeTab !== "outOfRange" && (
            <div className="tab-pane fade active show" id={`ex1-tabs-${activeTab + 1}`} role="tabpanel">
              {renderTabContent()}
            </div>
          )}
          {activeTab === "outOfRange" && (
            <div className="tab-pane fade active show" id="ex1-tabs-outOfRange" role="tabpanel">
              {renderOutOfRangeEvents()}
            </div>
          )}
        </div>
        {/* Render Tab content end Here */}
      </div>
    </div>
  );

}

export default Timetable;
