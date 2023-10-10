import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

function ToggleableComponent({ children, showButtonLabel, closeButtonLabel }) {
  const [formVisible, setFormVisible] = useState(false);
  const showForm = () => setFormVisible(true);
  const closeForm = () => setFormVisible(false);
  const showWhenVisible = { display: formVisible ? "" : "none" };
  const showWhenNotVisible = { display: formVisible ? "none" : "" };

  return (
    <div className="mt-2 mb-2">
      <div style={showWhenNotVisible}>
        <Button onClick={showForm} className="show-button" variant="primary">
          {showButtonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="toggleable-component">
        <Button onClick={closeForm} variant="warning">
          {closeButtonLabel}
        </Button>
        {children}
      </div>
    </div>
  );
}

// defining the proptypes
ToggleableComponent.propTypes = {
  showButtonLabel: PropTypes.string.isRequired,
  closeButtonLabel: PropTypes.string.isRequired,
};

export default ToggleableComponent;
