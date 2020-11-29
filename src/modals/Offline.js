import React from 'react';

const Offline = ({closeModal}) => (
  <>
    <div className="modal-backdrop fade show"></div>
    <div className="modal" style={{display:"block"}}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">Oops!</div>
            <button type="button" className="close" onClick={closeModal}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            Your Connection Appears to be Offline!
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Offline;