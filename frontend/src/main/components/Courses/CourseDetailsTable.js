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
      accessor: (row, _rowIndex) => yyyyqToQyy(row.quarter),
      id: "quarter",
    },
    {
      Header: "Enroll Code",
      accessor: "classSections[0].enrollCode",
      id: "enrollCode",
    },
    {
      Header: "Title",
      accessor: "title",
    },
  ];

  const testid = "CourseDetailsTable";

  const columnsToDisplay = columns;

  return <OurTable data={course} columns={columnsToDisplay} testid={testid} />;
}
