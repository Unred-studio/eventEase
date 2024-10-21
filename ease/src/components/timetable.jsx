import React, { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function Timetable({ eventsIdArr, emailData }) {
  const [activeTabContent, setActiveTabContent] = useState(null);

  function getDatesInRange(edition) {
    let [startDate, endDate] = edition.split("-");
    startDate = startDate.charAt(0).toUpperCase() + startDate.slice(1);
    endDate = endDate.charAt(0).toUpperCase() + endDate.slice(1);

    startDate = dayjs(startDate + "2024", "MMMDDYYYY");
    endDate = dayjs(endDate + "2024", "MMMDDYYYY");
    let dates = [];
    let currentDate = dayjs(startDate);

    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, "day")) {
      dates.push(currentDate);
      currentDate = currentDate.add(1, "day");
    }

    return dates;
  }

  const datesArr = getDatesInRange(emailData.edition);

  const toggleTabContent = (date) => {
    setActiveTabContent(date);
  };

  const renderTabContent = () => {
    if (!activeTabContent) return null;

    const renderEvents = emailData.events.filter((event) => {
      return (
        event.date === activeTabContent.format("YYYY-MM-DD") && 
        eventsIdArr.includes(event.id)
      );
    });

    return (
      <div className="col-lg-7 col-xl-6">
        <div className="tab-content aos-init aos-animate" id="myTabContent">
          <div className="tab-pane fade active show">
            <ul className="pt-4 list-unstyled mb-0">
              {renderEvents.map((event) => (
                <li className="d-flex py-4 w-100" key={event.id}>
                  {/* Left Side: Time and Location */}
                  <div className="d-flex flex-column me-4" style={{ flexShrink: 0 }}>
                    <span className="small text-muted mb-1">
                      {event.time || "Time Not Detected"}
                    </span>
                    <span className="small text-muted">
                      {event.location || "Location Not Detected"}
                    </span>
                  </div>

                  {/* Separator Bar */}
                  <div className="border-start border-3 me-4" style={{ height: 'auto' }}></div>

                  {/* Right Side: Name and Summary */}
                  <div className="flex-grow-1">
                    <h4 className="mb-1">{event.name}</h4>
                    <p className="mb-0">{event.summary}</p>
                  </div>
                </li>
              ))}
            </ul>
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
          <div className="nav nav-pills flex-column aos-init aos-animate" id="myTab" role="tablist">
            {datesArr.map((date, index) => (
              <button
                key={index}
                className={`nav-link px-4 text-start mb-3 ${activeTabContent && activeTabContent.isSame(date, "day") ? "active" : ""}`}
                id={`day${index + 1}-tab`}
                onClick={() => toggleTabContent(date)}
              >
                <span className="d-block fs-5 fw-bold">Day {index + 1}</span>
                <span className="small">{date.format("ddd, MMM D")}</span>
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
