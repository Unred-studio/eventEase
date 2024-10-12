import React, { useState } from "react";

function MailCards() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {/* Bootstrap for the card and button */}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          <div className="card h-100">
            <img src="..." className="card-img-top" alt="Lassonde Events" />
            <div className="card-body">
              <h5 className="card-title">Lassonde Events</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
            <div className="card-footer">
              {/* Removed Bootstrap's data-bs-toggle */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={toggleModal}
              >
                Launch demo modal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
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
                {/* here goes the content of model */}
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Modal title
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  onClick={toggleModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <ul class="list-group">
                  <li class="list-group-item">
                    <input
                      class="form-check-input me-1"
                      type="checkbox"
                      value=""
                      id="firstCheckboxStretched"
                    />
                    <label
                      class="form-check-label stretched-link"
                      for="firstCheckboxStretched"
                    >
                      First checkbox
                    </label>
                  </li>
                  <li class="list-group-item">
                    <input
                      class="form-check-input me-1"
                      type="checkbox"
                      value=""
                      id="secondCheckboxStretched"
                    />
                    <label
                      class="form-check-label stretched-link"
                      for="secondCheckboxStretched"
                    >
                      Second checkbox
                    </label>
                  </li>
                  <li class="list-group-item">
                    <input
                      class="form-check-input me-1"
                      type="checkbox"
                      value=""
                      id="thirdCheckboxStretched"
                    />
                    <label
                      class="form-check-label stretched-link"
                      for="thirdCheckboxStretched"
                    >
                      Third checkbox
                    </label>
                  </li>
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={toggleModal}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MailCards;
