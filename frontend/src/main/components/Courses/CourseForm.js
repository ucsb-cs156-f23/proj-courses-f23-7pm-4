
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import SingleQuarterDropdown from "../Quarters/SingleQuarterDropdown";
import { quartersNewRange } from "main/utils/quarterUtilities";


function CourseForm({ initialCourse, submitAction, buttonLabel = "Create" }) {
  // Stryker disable all
  const {
    register,
    formState: { errors },
    data: systemInfo,
    handleSubmit,
  } = useForm({ defaultValues: initialCourse || {} });
  // Stryker enable all
  
  const startQtr = systemInfo?.startQtrYYYYQ || "20211";
  const endQtr = systemInfo?.endQtrYYYYQ || "20222";
  const quarters = quartersNewRange(startQtr, endQtr);

  const navigate = useNavigate();
  const [quarter, setQuarter] = useState(
    {
      quarters: quarters,
    }.quarters[0],
  );

  return (
    <Form onSubmit={handleSubmit(submitAction)}>
      {initialCourse && (
        <Form.Group className="mb-3">
          <Form.Label htmlFor="id">Id</Form.Label>
          <Form.Control
            data-testid="CourseForm-id"
            id="id"
            type="text"
            {...register("id")}
            value={initialCourse.id}
            disabled
          />
        </Form.Group>
      )}

      <Form.Group className="mb-3">
        <Form.Label htmlFor="enrollCd">Enrollment Code</Form.Label>
        <Form.Control
          data-testid="CourseForm-enrollCd"
          id="enrollCd"
          type="text"
          isInvalid={Boolean(errors.enrollCd)}
          {...register("enrollCd", {
            required: "Enroll Code is required.",
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.enrollCd?.message}
        </Form.Control.Feedback>
      </Form.Group>

      
      {/* <Form.Group className="mb-3"> 
        <Form.Label htmlFor="psId">Personal Schedule ID</Form.Label>
        <Form.Control
          data-testid="CourseForm-psId"
          id="psId"
          type="text"
          isInvalid={Boolean(errors.psId)}
          {...register("psId", {
            required: "Personal Schedule ID is required.",
          })}
        />
        <Form.Control.Feedback type="invalid">
          {errors.psId?.message}
        </Form.Control.Feedback>
      </Form.Group> */}
      <Form.Group className="mb-3" data-testid="CourseForm-psId">
        <SingleQuarterDropdown
          psId={quarter}
          setQuarter={setQuarter}
          controlId={"CourseForm-psId"}
          label={"Schedule"}
          quarters={quarters}
        />
        
        
      </Form.Group>
      {/* <Form.Group className="mb-3">
      <Form.Label htmlFor="psId">Personal Schedule ID</Form.Label>
      <SingleQuarterDropdown
          psId={psId}
          setQuarter={setQuarter}
          controlId={"PersonalScheduleForm-quarter"}
          label={"Quarter"}
          quarters={quarters}
        />
      </Form.Group> */}

      <Button type="submit" data-testid="CourseForm-submit">
        {buttonLabel}
      </Button>
      <Button
        variant="Secondary"
        onClick={() => navigate(-1)}
        data-testid="CourseForm-cancel"
      >
        Cancel
      </Button>
    </Form>
  );
}
// CHANGETHIS: line 50-64 FOLLOWING PERSONALSCHEDULEFORM
export default CourseForm;
