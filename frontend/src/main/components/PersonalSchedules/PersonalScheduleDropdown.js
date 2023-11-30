import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { yyyyqToQyy } from "main/utils/quarterUtilities.js";

const PersonalScheduleDropdown = ({
  setSchedule,
  schedules,
  controlId,
  onChange = null,
  label = "Schedule",
}) => {
  const localSearchSchedule = localStorage.getItem(controlId);

  const [scheduleState, setScheduleState] = useState(
    // Stryker disable next-line all : not sure how to test/mock local storage
    localSearchSchedule || (schedules.length > 0 ? schedules[0].id : null),
  );

  const handleScheduleOnChange = (event) => {
    const selectedSchedule = event.target.value;
    localStorage.setItem(controlId, selectedSchedule);
    setScheduleState(selectedSchedule);
    setSchedule(selectedSchedule);
    if (onChange != null) {
      onChange(event);
    }
  };

  console.log("schedules", schedules);

  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        value={scheduleState}
        onChange={handleScheduleOnChange}
      >
        {schedules.map(function (object, i) {
          const key = `${controlId}-option-${i}`;
          return (
            <option key={key} data-testid={key} value={object.id}>
              {yyyyqToQyy(object.quarter)} {object.name}
            </option>
          );
        })}
      </Form.Control>
    </Form.Group>
  );
};

export default PersonalScheduleDropdown;
