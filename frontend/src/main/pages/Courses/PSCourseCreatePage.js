import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CourseForm from "main/components/Courses/CourseForm";
import { Navigate } from "react-router-dom";
import { useBackendMutation, useBackend } from "main/utils/useBackend";

import { useState } from "react";

export default function PSCourseCreatePage() {
  const controlId = "PSCourseCreatePage";
  
  const {
    data: schedules,
    error: _error,
    status: _status,
  } = useBackend(
    // Stryker disable next-line all : don't test internal caching of React Query
    ["/api/personalschedules/all"],
    { method: "GET", url: "/api/personalschedules/all" },
    [],
  );

  const onSuccess = (_course) => {
    
  };
  const localSearchSchedule = localStorage.getItem(controlId);
  console.log("localSearchSchedule", localSearchSchedule);
  const defaultSchedule = (schedules && schedules.length >= 1 );
  console.log("defaultSchedule", defaultSchedule);
  const [schedule, setSchedule] = useState(defaultSchedule);
  console.log("right after useState, schedule=", schedule);
  const onScheduleChange = (event) => {
    const selectedSchedule = event.target.value;
    setSchedule(selectedSchedule);
    console.log("selectedSchedule", selectedSchedule);
    console.log("schedule", schedule);
  }
  const objectToAxiosParams = (course) => ({
    url: "/api/courses/post",
    method: "POST",
    params: {
      enrollCd: course.enrollCd,
      psId: schedule,
    },
  });
  const mutation = useBackendMutation(
    objectToAxiosParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    ["/api/courses/user/all"],
  );

  const { isSuccess } = mutation;

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  if (isSuccess) {
    return <Navigate to="/courses/list" />;
  }
  if (schedules == null || schedules.length === 0)  {
    return (
      <BasicLayout>
        <div className="pt-2">
          <h1>Create New Course</h1>
          <p data-testid="PSCourseCreate-Error">
            Error: No Personal Schedules found. Please create a Personal Schedule first.
          </p>
        </div>
      </BasicLayout>
    );
  }
  console.log("right before render, schedule =", schedule);
    return (
      <BasicLayout>
        <div className="pt-2">
          <h1>Create New Course</h1>

          <CourseForm 
            submitAction={onSubmit} 
            setSchedule = {setSchedule}
            schedules = {schedules}
            controlId = {controlId}
            onChange = {onScheduleChange}
          />
          {mutation.isError && (
            <p data-testid="PSCourseCreate-Error">
              Error: {mutation.error.response.data?.message}
            </p>
          
          )}
        </div>
      </BasicLayout>
    );

  
}
