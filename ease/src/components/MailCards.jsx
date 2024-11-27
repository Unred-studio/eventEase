//Imports
import React, { useState, useEffect } from "react";

//MailCards Component
function MailCards({ emailData, onDone }) {
  //Initializing UseStates
  const [emailJson, setEmailJson] = useState({ events: [] }); //Whole email Data
  const [activeModal, setActiveModal] = useState(null); // To track which modal is open
  const [selectedEvents, setSelectedEvents] = useState([[], [], []]); //Array of user selected events

  // Fetch data for the active modal
  useEffect(() => {
    if (!activeModal) return; // dont fetch if activeModal is null
    if (activeModal === "lassonde") {
      setEmailJson(emailData.lassondeData);
    } else if (activeModal === "bethune") {
      setEmailJson(emailData.bethuneData);
    } else {
      setEmailJson(emailData.yorkData);
    }
  }, [activeModal]); // ActiveModal is a dependency

  //Functions

  //Added user selected event's ID to selectedEvents
  const handleCheckboxChange = (eventId) => {
    console.log("Event ID:", eventId);
    setSelectedEvents((prevSelected) => {
      // Map activeModal to array indices
      const modalIndexMap = {
        lassonde: 0,
        bethune: 1,
        york: 2,
      };

      // Get the active modal's index
      const modalIndex = modalIndexMap[activeModal];

      if (modalIndex === undefined) {
        console.error("Unknown modal:", activeModal);
        return prevSelected; // Return previous state if activeModal is invalid
      }

      // Ensure the structure is correct (initialize missing subarrays)
      const newSelected = [...prevSelected];
      while (newSelected.length <= modalIndex) {
        newSelected.push([]); // Add empty arrays if missing
      }

      // Add or remove the eventId in the corresponding subarray
      const modalEvents = newSelected[modalIndex];
      if (modalEvents.includes(eventId)) {
        newSelected[modalIndex] = modalEvents.filter((id) => id !== eventId); // Remove the eventId
      } else {
        newSelected[modalIndex] = [...modalEvents, eventId]; // Add the eventId
      }

      console.log("Selected events:", newSelected);
      return newSelected;
    });
  };

  const checkIfEventSelected = (eventId) => {
    if (activeModal === "lassonde") {
      return selectedEvents[0].includes(eventId); // Check if the event ID is in the first subarray
    } else if (activeModal === "bethune") {
      return selectedEvents[1].includes(eventId); // Check if the event ID is in the second subarray
    } else {
      return selectedEvents[2].includes(eventId); // Check if the event ID is in the third subarray
    }
  };

  //Toggle modals Functions
  const toggleModal = (modalType) => {
    //Set Active Modal
    setActiveModal(modalType);
  };

  const handleModalClose = () => {
    //Close Modal [Reset states]
    // setSelectedEvents([]); // Reset selected events
    toggleModal(null);
  };

  //Button Functions
  const handleDoneClick = () => {
    //Send the selectedEvents and emailJson to Timetable.jsx
    toggleModal(null);
  };

  // Rendering

  //modal for each email type
  const renderModal = (emailJson) => {
    const events = emailJson.events;
  
    return (
      <div
        className="modal fade show"
        tabIndex="-1"
        style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {emailJson.sender &&
                  emailJson.sender.charAt(0).toUpperCase() +
                    emailJson.sender.slice(1)}{" "}
                Events
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={handleModalClose}
                aria-label="Close"
              ></button>
            </div>
  
            {/* Modal Body */}
            <div className="modal-body">
              <ul className="list-group">
                {events.map((event) => (
                  <li
                    key={event.id}
                    className={`list-group-item d-flex align-items-center justify-content-start ${
                      checkIfEventSelected(event.id) ? "bg-light text-primary" : ""
                    }`}
                    onClick={() => handleCheckboxChange(event.id)}
                    style={{
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                  >
                    {/* Custom Checkbox */}
                    <span
                      className="custom-checkbox"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "24px",
                        minHeight: "24px",
                        border: "2px solid #007bff",
                        borderRadius: "3px",
                        marginRight: "10px",
                        position: "relative",
                        backgroundColor: checkIfEventSelected(event.id)
                          ? "#007bff"
                          : "transparent",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      {checkIfEventSelected(event.id) && (
                        <span
                          style={{
                            position: "absolute",
                            top: "2px",
                            left: "6px",
                            color: "#fff",
                            fontSize: "16px",
                            fontWeight: "bold",
                            lineHeight: "1",
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </span>
  
                    {/* Event Details */}
                    <span
                      className={`form-check-label ${
                        checkIfEventSelected(event.id) ? "text-primary" : ""
                      }`}
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "calc(100% - 40px)",
                      }}
                      title={event.name + " - " + event.summary}
                    >
                      {event.name} - {event.summary}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Modal Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleModalClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDoneClick}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

  // Render the Cards
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        {/* Cards Container */}
        <div className="row row-cols-1 row-cols-md-3 g-4 w-100 mx-auto">
          {/* Lassonde Card */}
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Lassonde Events</h5>
                <p className="card-text">
                  Check out the latest events happening at Lassonde School of
                  Engineering.
                </p>
              </div>
              <div className="card-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => toggleModal("lassonde")}
                >
                  Lassonde Events
                </button>
              </div>
            </div>
          </div>
  
          {/* Bethune Card */}
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Bethune Events</h5>
                <p className="card-text">
                  Discover what's going on at Bethune College this week.
                </p>
              </div>
              <div className="card-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => toggleModal("bethune")}
                >
                  Bethune Events
                </button>
              </div>
            </div>
          </div>
  
          {/* York Card */}
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">York Events</h5>
                <p className="card-text">
                  Explore the upcoming events across York University.
                </p>
              </div>
              <div className="card-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => toggleModal("york")}
                >
                  York Events
                </button>
              </div>
            </div>
          </div>
        </div>
  
        {/* Create Schedule Button */}
        <div className="mt-4">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => {
              onDone(selectedEvents);
            }}
          >
            Create Schedule
          </button>
        </div>
      </div>
  
      {/* Check and Render Modal for Active Card */}
      {activeModal && renderModal(emailJson)}
    </>
  );
  
}

//Exports
export default MailCards;
