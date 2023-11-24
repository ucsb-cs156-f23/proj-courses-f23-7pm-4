import React from "react";
import OurTable from "main/components/OurTable";
import { yyyyqToQyy } from "main/utils/quarterUtilities.js";

export default function CourseDetailsTable({ course }) {
  const columns = [
    {
      Header: "Course ID",
      accessor: "courseId",
    },
    {
      Header: "Quarter",
      accessor: (row) => (row.quarter ? yyyyqToQyy(row.quarter) : ""),
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

  return (
    <OurTable
      data={course}
      columns={columnsToDisplay}
      testid={testid}
    />
  );
}