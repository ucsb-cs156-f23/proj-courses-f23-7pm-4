import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import CourseDetailsPage from "main/pages/CourseDetails/CourseDetailsPage";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useParams: () => ({
      qyy: "20221",
      enrollCd: "12583",
    }),
    Navigate: (x) => {
      mockNavigate(x);
      return null;
    },
  };
});

describe("CourseDetailsPage tests", () => {
  const axiosMock = new AxiosMockAdapter(axios);

  const testId = "CourseDetailsTable";

  const setupAdminUser = () => {
    axiosMock.reset();
    axiosMock.resetHistory();
    axiosMock
      .onGet("/api/currentUser")
      .reply(200, apiCurrentUserFixtures.adminUser);
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, systemInfoFixtures.showingNeither);
  };

  beforeEach(() => {
    jest.spyOn(console, "error");
    console.error.mockImplementation(() => null);
  });

  afterEach(() => {
    console.error.mockRestore();
  });

  test("shows the correct info for admin users", async () => {
    setupAdminUser();
    const queryClient = new QueryClient();
    axiosMock.onGet(`/api/sections/sectionsearch`).reply(200, {
      quarter: "20221",
      courseId: "ECE       1A ",
      title: "COMP ENGR SEMINAR",
      contactHours: 10,
      description:
        "Introductory seminar to expose students to a broad range of topics in computer   engineering.",
      college: "ENGR",
      objLevelCode: "U",
      subjectArea: "ECE     ",
      unitsFixed: 1,
      unitsVariableHigh: null,
      unitsVariableLow: null,
      delayedSectioning: null,
      inProgressCourse: null,
      gradingOption: "P",
      instructionType: "SEM",
      onLineCourse: false,
      deptCode: "ECE  ",
      generalEducation: [],
      classSections: [
        {
          enrollCode: "12583",
          section: "0100",
        },
      ],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CourseDetailsPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    // assert
    const expectedHeaders = ["Quarter", "Course ID", "Title", "Enroll Code"];
    const expectedFields = ["quarter", "courseId", "title", "enrollCode"];

    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });

    expectedFields.forEach((field) => {
      const header = screen.getByTestId(`${testId}-cell-row-0-col-${field}`);
      expect(header).toBeInTheDocument();
    });

    await waitFor(() =>
      expect(
        screen.getByTestId(`${testId}-cell-row-0-col-courseId`),
      ).toHaveTextContent("ECE 1A"),
    );
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-quarter`),
    ).toHaveTextContent("20221");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-enrollCode`),
    ).toHaveTextContent("12583");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-title`),
    ).toHaveTextContent("COMP ENGR SEMINAR");
  });
});
