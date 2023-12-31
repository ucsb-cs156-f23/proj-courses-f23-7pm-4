import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import {
  fiveSections,
  sixSections,
  gigaSections,
} from "fixtures/sectionOverTimeFixtures";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import SectionsOverTimeTable from "main/components/Sections/SectionsOverTimeTable";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Section tests", () => {
  const queryClient = new QueryClient();

  test("renders without crashing for empty table", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SectionsOverTimeTable sections={[]} />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  });

  test("Has the expected cell values when expanded", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SectionsOverTimeTable sections={sixSections} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const expectedHeaders = [
      "Quarter",
      "Course ID",
      "Title",
      "Enrolled",
      "Status",
      "Location",
      "Days",
      "Time",
      "Instructor",
      "Enroll Code",
    ];
    const expectedFields = [
      "quarter",
      "courseInfo.courseId",
      "courseInfo.title",
      "enrolled",
      "status",
      "location",
      "days",
      "time",
      "instructor",
      "enrollCode",
    ];
    const testId = "SectionsOverTimeTable";

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    const expandRow = screen.getByTestId(
      `${testId}-cell-row-1-col-quarter-expand-symbols`,
    );
    fireEvent.click(expandRow);

    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-quarter`),
    ).toHaveTextContent("S22");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-time`),
    ).toHaveTextContent("9:30 AM - 10:45 AM");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-days`),
    ).toHaveTextContent("T R");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-enrolled`),
    ).toHaveTextContent("51/77");
    expect(
      screen.getByTestId(`${testId}-cell-row-5-col-location`),
    ).toHaveTextContent("PHELP 1448");
    expect(
      screen.getByTestId(`${testId}-cell-row-5-col-instructor`),
    ).toHaveTextContent("DANESHAMOOZ J, KILGORE J D, YANG YIFAN");
    expect(
      screen.getByTestId(`${testId}-cell-row-5-col-courseInfo.courseId`),
    ).not.toHaveTextContent("CMPSC 130A -1");
  });

  test("Has the expected column headers and content", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SectionsOverTimeTable sections={sixSections} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const expectedHeaders = [
      "Quarter",
      "Course ID",
      "Title",
      "Enrolled",
      "Status",
      "Location",
      "Days",
      "Time",
      "Instructor",
      "Enroll Code",
    ];
    const expectedFields = [
      "quarter",
      "courseInfo.courseId",
      "courseInfo.title",
      "enrolled",
      "status",
      "location",
      "days",
      "time",
      "instructor",
      "enrollCode",
    ];
    const testId = "SectionsOverTimeTable";

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-courseInfo.courseId`),
    ).toHaveTextContent("CMPSC 130A");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-courseInfo.courseId`),
    ).not.toHaveTextContent("CMPSC 130A -1");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-courseInfo.title`),
    ).toHaveTextContent("DATA STRUCT ALGOR");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-quarter`),
    ).toHaveTextContent("S22");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-time`),
    ).toHaveTextContent("9:30 AM - 10:45 AM");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-days`),
    ).toHaveTextContent("T R");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-enrolled`),
    ).toHaveTextContent("51/77");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-location`),
    ).toHaveTextContent("PSYCH 1902");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-instructor`),
    ).toHaveTextContent("LOKSHTANOV D");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-enrollCode`),
    ).toHaveTextContent("08078");
    const detailsButton = screen.getByTestId(
      `${testId}-cell-row-0-col-ⓘ-button`,
    );
    expect(detailsButton).toBeInTheDocument();
    expect(detailsButton).toHaveClass("btn-primary");
  });

  test("Correctly groups separate quarters of the same class", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SectionsOverTimeTable sections={gigaSections} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const testId = "SectionsOverTimeTable";

    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-quarter`),
    ).toHaveTextContent("W22");
    expect(
      screen.getByTestId(`${testId}-cell-row-3-col-quarter`),
    ).toHaveTextContent("S21");

    const expandRow = screen.getByTestId(
      `${testId}-cell-row-1-col-quarter-expand-symbols`,
    );
    fireEvent.click(expandRow);

    expect(
      screen.getByTestId(`${testId}-cell-row-1-col-quarter`),
    ).toHaveTextContent("S22");
  });

  test("First dropdown is different than last dropdown", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SectionsOverTimeTable sections={fiveSections} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const testId = "SectionsOverTimeTable";

    const expandRow = screen.getByTestId(
      `${testId}-cell-row-1-col-quarter-expand-symbols`,
    );
    fireEvent.click(expandRow);

    expect(
      screen.getByTestId(`${testId}-cell-row-1-col-enrolled`),
    ).toHaveTextContent("84/80");
    expect(
      screen.getByTestId(`${testId}-cell-row-2-col-enrolled`),
    ).toHaveTextContent("21/21");
  });

  test("Details button navigates to the details page", async () => {
    const testId = "SectionsOverTimeTable";
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SectionsOverTimeTable sections={fiveSections} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(
      await screen.findByTestId(`${testId}-cell-row-0-col-courseInfo.courseId`),
    ).toHaveTextContent("ECE 5");

    const detailsButton = screen.getByTestId(
      `${testId}-cell-row-0-col-ⓘ-button`,
    );
    expect(detailsButton).toBeInTheDocument();

    fireEvent.click(detailsButton);

    await waitFor(() =>
      expect(mockedNavigate).toHaveBeenCalledWith("/coursedetails/S22/12591"),
    );
  });

  test("all course statuses", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SectionsOverTimeTable sections={fiveSections} />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const testId = "SectionsOverTimeTable";

    const expandRow = screen.getByTestId(
      `${testId}-cell-row-1-col-quarter-expand-symbols`,
    );
    fireEvent.click(expandRow);

    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-status`),
    ).toHaveTextContent("Full");
    expect(
      screen.getByTestId(`${testId}-cell-row-1-col-status`),
    ).toHaveTextContent("Closed");
    expect(
      screen.getByTestId(`${testId}-cell-row-2-col-status`),
    ).toHaveTextContent("Cancelled");
    expect(
      screen.getByTestId(`${testId}-cell-row-3-col-status`),
    ).toHaveTextContent("Open");
  });
});
