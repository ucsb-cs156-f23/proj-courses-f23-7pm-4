import SectionsOverTimeTableBase from "main/components/SectionsOverTimeTableBase";
import { ButtonColumn } from "main/components/OurTable";
import { useNavigate } from "react-router-dom";
import { yyyyqToQyy } from "main/utils/quarterUtilities.js";
import {
  convertToFraction,
  formatDays,
  formatInstructors,
  formatLocation,
  formatTime,
  isSection,
  formatStatus,
} from "main/utils/sectionUtils.js";

function getFirstVal(values) {
  return values[0];
}

function getCourseId(courseIds) {
  return courseIds[0].substring(0, courseIds[0].length - 2);
}

export default function SectionsOverTimeTable({ sections }) {
  const navigate = useNavigate();
  const detailsCallback = (cell) => {
    navigate(
      `/coursedetails/${cell.row.values.quarter}/${cell.row.values.enrollCode}`,
    );
  };
  const columns = [
    {
      Header: "Quarter",
      accessor: (row) => yyyyqToQyy(row.courseInfo.quarter),
      id: "quarter",

      Cell: ({ cell: { value } }) => value,
    },
    {
      Header: "Course ID",
      accessor: "courseInfo.courseId",

      aggregate: getCourseId,
      Aggregated: ({ cell: { value } }) => `${value}`,

      Cell: ({ cell: { value } }) => value.substring(0, value.length - 2),
    },
    {
      Header: "Title",
      accessor: "courseInfo.title",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      // Stryker disable next-line StringLiteral: this column is hidden, very hard to test
      Header: "Is Section?",
      accessor: (row) => isSection(row.section.section),
      // Stryker disable next-line StringLiteral: this column is hidden, very hard to test
      id: "isSection",
    },
    {
      Header: "Enrolled",
      accessor: (row) =>
        convertToFraction(row.section.enrolledTotal, row.section.maxEnroll),
      id: "enrolled",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Status",
      accessor: (row) => formatStatus(row.section),
      id: "status",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Location",
      accessor: (row) => formatLocation(row.section.timeLocations),
      id: "location",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Days",
      accessor: (row) => formatDays(row.section.timeLocations),
      id: "days",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Time",
      accessor: (row) => formatTime(row.section.timeLocations),
      id: "time",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Instructor",
      accessor: (row) => formatInstructors(row.section.instructors),
      id: "instructor",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Enroll Code",
      accessor: "section.enrollCode",
      id: "enrollCode",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
  ];

  const testid = "SectionsOverTimeTable";

  const buttonColumns = [
    ...columns,
    ButtonColumn("ⓘ", "primary", detailsCallback, "SectionsOverTimeTable"),
  ];

  const columnsToDisplay = buttonColumns;

  return (
    <SectionsOverTimeTableBase
      data={sections}
      columns={columnsToDisplay}
      testid={testid}
    />
  );
}
