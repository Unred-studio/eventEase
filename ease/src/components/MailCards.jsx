import React, { useState } from "react";

function MailCards() {
  const [selectedEvents, setSelectedEvents] = useState({
    lassonde: [],
    bethune: [],
    york: [],
  });

  //Example Event data for each email
  const eventData = {
    lassonde: [
      { id: 1, title: "Lassonde Hackathon", summary: "A 24-hour coding challenge." },
      { id: 2, title: "AI Workshop", summary: "Intro to AI tools and practices." }
    ],
    bethune: [
      { id: 1, title: "Bethune Science Talk", summary: "Latest research in molecular biology." },
      { id: 2, title: "Robotics Fair", summary: "Showcase of student robotics projects." }
    ],
    york: [
      { id: 1, title: "York Sports Meet", summary: "Annual sports events." },
      { id: 2, title: "Cultural Fest", summary: "Celebration of diverse cultures at York." }
    ],
  };

  
  
  // Toggle modal visibility based on the card selected
  const [activeModal, setActiveModal] = useState(null); // To track which modal is open
  const toggleModal = (modalType) => {
    setActiveModal(modalType);
  };

  // Handle checkbox changes
  const handleCheckboxChange = (emailType, eventId) => {
    setSelectedEvents((prevState) => {
      const isChecked = prevState[emailType].includes(eventId);
      const updatedEvents = isChecked
        ? prevState[emailType].filter((id) => id !== eventId)
        : [...prevState[emailType], eventId];

      return { ...prevState, [emailType]: updatedEvents };
    });
  };

  // Render modal for each email type
  const renderModal = (emailType) => {
    const events = eventData[emailType] || [];

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
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {emailType.charAt(0).toUpperCase() + emailType.slice(1)} Events
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={() => toggleModal(null)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ul className="list-group">
                {events.map((event) => (
                  <li key={event.id} className="list-group-item">
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      value={event.id}
                      checked={selectedEvents[emailType].includes(event.id)}
                      onChange={() => handleCheckboxChange(emailType, event.id)}
                    />
                    <label className="form-check-label">
                      {event.title} - {event.summary}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => toggleModal(null)}
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
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {/* Lassonde Card */}
        <div className="col">
          <div className="card h-100">
            <img src="..." className="card-img-top" alt="Lassonde Events" />
            <div className="card-body">
              <h5 className="card-title">Lassonde Events</h5>
              <p className="card-text">
                Check out the latest events happening at Lassonde School of Engineering.
              </p>
            </div>
            <div className="card-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => toggleModal("lassonde")}
              >
                View Events
              </button>
            </div>
          </div>
        </div>

        {/* Bethune Card */}
        <div className="col">
          <div className="card h-100">
            <img src="..." className="card-img-top" alt="Bethune Events" />
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
                View Events
              </button>
            </div>
          </div>
        </div>

        {/* York Card */}
        <div className="col">
          <div className="card h-100">
            <img src="..." className="card-img-top" alt="York Events" />
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
                View Events
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render Modal for Active Card */}
      {activeModal && renderModal(activeModal)}
    </>
  );
}

export default MailCards;
