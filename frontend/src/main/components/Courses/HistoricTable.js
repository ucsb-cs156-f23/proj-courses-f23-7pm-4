import React from "react";
import OurTable from "main/components/OurTable";

export default function HistoricTable({ course }) {
  const columns = [
    {
      Header: "Historic Grade Data",
      accessor: "historicData",
    },
  ];

  const testid = "HistoricTable";

  const columnsToDisplay = columns;

  return <OurTable data={course} columns={columnsToDisplay} testid={testid} />;
}
