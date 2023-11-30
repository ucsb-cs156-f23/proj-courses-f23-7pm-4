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
    // {
    //   Header: "Enrolled",
    //   accessor: (row) => row.classSections[0].enrolledTotal,
    //   id: "enrolledTotal",
    // },
    // {
    //   Header: "Location",
    //   accessor: (row) => row.classSections[0].timeLocations[0].building,
    //   id: "building",
    // },
    // {
    //   Header: "Days",
    //   accessor: (row) => row.classSections[0].timeLocations[0].days,
    //   id: "days",
    // },
    // {
    //   Header: "Time",
    //   accessor: (row) =>
    //     row.classSections[0].timeLocations[0].beginTime +
    //     "-" +
    //     row.classSections[0].timeLocations[0].endTime,
    //   id: "time",
    // },
    // {
    //   Header: "Instructor",
    //   accessor: (row) => row.classSections[0].instructors[0].instructor,
    //   id: "instructor",
    // },
    // {
    //   Header: "Enroll Code",
    //   accessor: (row) => row.classSections[0].enrollCode,
    //   id: "enrollCode",
    // },
  ];

  const testid = "CourseDetailsTable";

  const columnsToDisplay = columns;

  return <OurTable data={course} columns={columnsToDisplay} testid={testid} />;
}
