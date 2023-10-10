import React, { useState } from "react";
import PropTypes from "prop-types";

function ToggleableComponent({ children, showButtonLabel, closeButtonLabel }) {
  const [formVisible, setFormVisible] = useState(false);
  const showForm = () => setFormVisible(true);
  const closeForm = () => setFormVisible(false);
  const showWhenVisible = { display: formVisible ? "" : "none" };
  const showWhenNotVisible = { display: formVisible ? "none" : "" };

  return (
    <>
      <div style={showWhenNotVisible}>
        <button onClick={showForm} className="show-button">
          {showButtonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="toggleable-component">
        <button onClick={closeForm}>{closeButtonLabel}</button>
        {children}
      </div>
    </>
  );
}

// defining the proptypes
ToggleableComponent.propTypes = {
  showButtonLabel: PropTypes.string.isRequired,
  closeButtonLabel: PropTypes.string.isRequired,
};

export default ToggleableComponent;
