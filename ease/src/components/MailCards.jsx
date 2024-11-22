//Imports
import React, { useState, useEffect } from "react";

//MailCards Component
function MailCards({ onDone }) {
  //Initializing UseStates
  const [emailJson, setEmailJson] = useState({ events: [] }); //Whole email Data
  const [activeModal, setActiveModal] = useState(null); // To track which modal is open
  const [selectedEvents, setSelectedEvents] = useState([]); //Array of user selected events

  // Fetch data for the active modal
  useEffect(() => {
    const fetchData = async () => {
      if (!activeModal) return; // dont fetch if activeModal is null
      try {
        const response = await fetch(
          `http://localhost:3001/${activeModal}.json`
        );
        const data = await response.json();
        setEmailJson(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [activeModal]); // ActiveModal is a dependency


  //Functions

  //Added user selected event's ID to selectedEvents
  const handleCheckboxChange = (eventId) => {
    setSelectedEvents((prevSelected) => {
      // Map activeModal to array indices
      const modalIndexMap = {
        Lassonde: 0,
        Bethune: 1,
        York: 2,
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

      return newSelected;
    });
  };


  //Toggle modals Functions
  const toggleModal = (modalType) => { //Set Active Modal
    setActiveModal(modalType);
  };

  const handleModalClose = () => { //Close Modal [Reset states]
    setSelectedEvents([]); // Reset selected events
    toggleModal(null);
  };


  //Button Functions
  const handleDoneClick = () => { //Send the selectedEvents and emailJson to Timetable.jsx
    onDone(selectedEvents);
    toggleModal(null);
  };


  // Rendering 

  //modal for each email type
  const renderModal = (emailJson) => {
    const events = emailJson.events;

    return (
      <div className="modal fade show" tabIndex="-1" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            {/* Modal Header Start Here */}
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {/* The Heading over every Modal */}
                {emailJson.sender && emailJson.sender.charAt(0).toUpperCase() + emailJson.sender.slice(1)}{" "} Events:{" "}
                {emailJson.edition && emailJson.edition.split("-").map((part, index) => index === 0 ? part.charAt(0).toUpperCase() + part.slice(1) : part).join(" to ")}
              </h1>
              <button type="button" className="btn-close" onClick={handleModalClose} aria-label="Close"></button>
            </div>
            {/* Modal Header End Here */}


            {/* Modal Body Start Here */}
            <div className="modal-body">
              <ul className="list-group">
                {/* Loops through each event */}
                {events.map((event) => (
                  <li
                    key={event.id}
                    className="list-group-item d-flex align-items-center justify-content-start"
                    onClick={() => handleCheckboxChange(event.id)} // Click anywhere on the list item to toggle
                    style={{ cursor: "pointer", transition: "background-color 0.3s ease", overflow: "hidden", }}>
                    <span className="custom-checkbox" style={{ display: "flex", alignItems: "center", justifyContent: "center", minWidth: "24px", minHeight: "24px", width: "24px", height: "24px", border: "2px solid #007bff", borderRadius: "3px", marginRight: "10px", position: "relative", transition: "border-color 0.3s ease", }}>
                      {/* IMP INPUT: Checkbox */}
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        checked={selectedEvents.includes(event.id)} //if the event is selected then the checkbox will act as if it is check already
                        onChange={() => handleCheckboxChange(event.id)} // When clicked on the checkbox it will send the Id of the selected event
                        style={{ display: "none" }} // Hide default checkbox
                      />
                      {selectedEvents.includes(event.id) && ( //if the checkbox is selected then it will have following style
                        <span style={{ position: "absolute", top: "2px", left: "6px", color: "#007bff", fontSize: "16px", fontWeight: "bold", lineHeight: "1", }}>
                          ✓
                        </span>
                      )}
                    </span>
                    <span className={`form-check-label ${selectedEvents.includes(event.id) ? "text-primary" : ""}`} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "calc(100% - 40px)", }} title={event.name + " - " + event.summary}>
                      {event.name} - {event.summary}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Modal Body End Here */}

            {/* Modal Footer Start Here */}
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
                onClick={() => {
                  toggleModal(null);
                  // TODO: Handle 'Done' action (e.g., navigate to timetable)
                }}
              >
                Done
              </button>
            </div>
            {/* Modal Footer End Here */}

          </div>
        </div>
      </div>
    );
  };


  // Render the Cards
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
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
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => {
              handleDoneClick();
            }} // Pass an example event ID here
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
