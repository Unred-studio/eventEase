import React, { useState, useEffect } from "react";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc'; // Import the UTC plugin

dayjs.extend(customParseFormat); // Extend with customParseFormat
dayjs.extend(utc); // Extend with UTC plugin

function Timetable({ eventsIdArr, emailData }) {
  const [activeTabContent, setActiveTabContent] = useState(null);

  useEffect(() => {
    // Automatically preselect the first available day
    if (datesArr.length > 0) {
      setActiveTabContent(datesArr[0]);
    }
  }, []);

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

  const datesArr = getDatesInRange(emailData.edition);

  const toggleTabContent = (date) => {
    setActiveTabContent(date);
  };

  const formatDateTime = (date, time) => {
    if (!date) return null;

    const eventDate = dayjs(date);

    if (time) {
      const [startTime, endTime] = time.split(' - ');

      // Combine date and time, then convert to UTC
      const startDateTime = dayjs(`${date} ${startTime.trim()}`, 'YYYY-MM-DD hh:mm A').utc();
      const endDateTime = dayjs(`${date} ${endTime.trim()}`, 'YYYY-MM-DD hh:mm A').utc();

      // Format for Google Calendar: YYYYMMDDTHHmmssZ
      return `${startDateTime.format('YYYYMMDDTHHmmss')}Z/${endDateTime.format('YYYYMMDDTHHmmss')}Z`;
    } else {
      const formattedDate = eventDate.format('YYYYMMDD');
      return `${formattedDate}/${formattedDate}`; // All-day event
    }
  };

  const renderTabContent = () => {
    if (!activeTabContent) return null;
  
    // Events within the selected day range
    const renderEvents = emailData.events.filter((event) => {
      return (
        event.date === activeTabContent.format("YYYY-MM-DD") &&
        eventsIdArr.includes(event.id)
      );
    });
  
    // Events outside the selected day range
    const outOfRangeEvents = emailData.events.filter((event) => {
      const eventDate = dayjs(event.date);
      return !datesArr.some((date) => date.isSame(eventDate, 'day'));
    });
  
    return (
      <div className="col-lg-7 col-xl-6">
        <div className="tab-content aos-init aos-animate" id="myTabContent">
          <div className="tab-pane fade active show">
            <ul className="pt-4 list-unstyled mb-0">
              {renderEvents.map((event) => (
                <li className="d-flex py-4 w-100" key={event.id}>
                  {/* Left Side: Time and Location */}
                  <div
                    className="d-flex flex-column me-4"
                    style={{ flexShrink: 0 }}
                  >
                    <span className="small text-muted mb-1">
                      {event.time || "Time Not Detected"}
                    </span>
                    <span className="small text-muted">
                      {event.location || "Location Not Detected"}
                    </span>
                  </div>
  
                  {/* Separator Bar */}
                  <div
                    className="border-start border-3 me-4"
                    style={{ height: "auto" }}
                  ></div>
  
                  {/* Right Side: Name and Summary */}
                  <div className="flex-grow-1">
                    <h4 className="mb-1">{event.name}</h4>
                    <p className="mb-0">{event.summary}</p>
                    <a
                      href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                        event.name
                      )}&details=${encodeURIComponent(
                        event.summary
                      )}&location=${encodeURIComponent(
                        event.location === "Online" ? "" : event.location || ""
                      )}&dates=${formatDateTime(event.date, event.time)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Add to Google Calendar
                    </a>
                  </div>
                </li>
              ))}
            </ul>
  
            {/* Render out-of-range events below the main list */}
            {outOfRangeEvents.length > 0 && (
              <>
                <h5 className="mt-5">Events Outside Selected Range</h5>
                <ul className="pt-4 list-unstyled mb-0">
                  {outOfRangeEvents.map((event) => (
                    <li className="d-flex py-4 w-100" key={event.id}>
                      {/* Left Side: Time and Location */}
                      <div
                        className="d-flex flex-column me-4"
                        style={{ flexShrink: 0 }}
                      >
                        <span className="small text-muted mb-1">
                          {event.time || "Time Not Detected"}
                        </span>
                        <span className="small text-muted">
                          {event.location || "Location Not Detected"}
                        </span>
                      </div>
  
                      {/* Separator Bar */}
                      <div
                        className="border-start border-3 me-4"
                        style={{ height: "auto" }}
                      ></div>
  
                      {/* Right Side: Name and Summary */}
                      <div className="flex-grow-1">
                        <h4 className="mb-1">{event.name}</h4>
                        <p className="mb-0">{event.summary}</p>
                        <a
                          href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                            event.name
                          )}&details=${encodeURIComponent(
                            event.summary
                          )}&location=${encodeURIComponent(
                            event.location || ""
                          )}&dates=${formatDateTime(event.date, event.time)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                        >
                          Add to Google Calendar
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };
  

  return (
    <div className="container py-9 py-lg-11 position-relative z-index-1">
      <div className="row">
        {/* Tab Navigation */}
        <div className="col-lg-5 mb-5 mb-lg-0 d-flex flex-column align-items-start">
          <div
            className="nav nav-pills flex-column"
            id="myTab"
            role="tablist"
          >
            {datesArr.map((date, index) => (
              <button
                key={index}
                className={`nav-link px-4 text-start mb-3 btn ${
                  activeTabContent && activeTabContent.isSame(date, "day")
                    ? "active"
                    : ""
                }`}
                id={`day${index + 1}-tab`}
                onClick={() => toggleTabContent(date)}
              >
                <span className="d-block fs-5 fw-bold">Day {index + 1}</span>
                <span className="small">Check out events for {date.format("ddd, MMM D")}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Tab Content */}
        <div className="col-lg-7 mb-5 mb-lg-0">{renderTabContent()}</div>
      </div>
    </div>
  );
}

export default Timetable;
