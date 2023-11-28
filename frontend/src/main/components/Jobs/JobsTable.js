import React from "react";
import OurTable, {
  PlaintextColumn,
  DateColumn,
} from "main/components/OurTable";

export default function JobsTable({ jobs }) {
  const testid = "JobsTable";

  const columns = [
    {
      Header: "id",
      accessor: "id", // accessor is the "key" in the data
    },
    DateColumn("Created", (cell) => cell.row.original.createdAt),
    DateColumn("Updated", (cell) => cell.row.original.updatedAt),
    {
      Header: "Status",
      accessor: "status",
    },
    PlaintextColumn("Log", (cell) => {
      const logLines = cell.row.original.log.split("\n");
      const truncatedLog = logLines.length > 10 ? logLines.slice(0, 10).join("\n") + "\n..." : cell.row.original.log;
      return truncatedLog;
    }),
  ];

  const sortees = React.useMemo(
    () => [
      {
        id: "id",
        desc: true,
      },
    ],
    // Stryker disable next-line all
    [],
  );

  return (
    <OurTable
      data={jobs}
      columns={columns}
      testid={testid}
      initialState={{ sortBy: sortees }}
    />
  );
}
