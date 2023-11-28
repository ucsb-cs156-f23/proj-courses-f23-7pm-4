import React from "react";
import OurTable from "main/components/OurTable";

export default function CourseDetailsTable({ course }) {
  const columns = [
    {
      Header: "Course ID",
      accessor: "courseId",
    },
    {
      Header: "Quarter",
      accessor: "quarter",
    },
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Enrolled",
      accessor: "classSections[1].enrolled",
    },
    {
      Header: "Location",
      accessor: "location",
    },
    {
      Header: "Days",
      accessor: "days",
    },
    {
      Header: "Time",
      accessor: "time",
    },
    {
      Header: "Instructor",
      accessor: "instructor",
    },
    {
      Header: "Enroll Code",
      accessor: "classSections[0].enrollCode",
      id: "enrollCode",
    }
  ];

  const testid = "CourseDetailsTable";

  const columnsToDisplay = columns;

  return <OurTable data={course} columns={columnsToDisplay} testid={testid} />;
}
