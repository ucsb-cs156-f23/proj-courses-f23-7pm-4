import { render, screen } from "@testing-library/react";
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
      qyy: "W22",
      enrollCd: 12583,
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
    axiosMock
      .onGet(`/api/sections/sectionsearch?qtr=20221&enrollCode=12583`)
      .reply(200, {
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
            session: null,
            classClosed: null,
            courseCancelled: null,
            gradingOptionCode: null,
            enrolledTotal: 84,
            maxEnroll: 100,
            secondaryStatus: null,
            departmentApprovalRequired: false,
            instructorApprovalRequired: false,
            restrictionLevel: null,
            restrictionMajor: "+PRCME+CMPEN",
            restrictionMajorPass: null,
            restrictionMinor: null,
            restrictionMinorPass: null,
            concurrentCourses: [],
            timeLocations: [
              {
                room: "1930",
                building: "BUCHN",
                roomCapacity: 100,
                days: "M      ",
                beginTime: "15:00",
                endTime: "15:50",
              },
            ],
            instructors: [
              {
                instructor: "WANG L C",
                functionCode: "Teaching and in charge",
              },
            ],
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

    await screen.findByTestId(`${testId}-cell-row-0-col-courseId`);

    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-courseId`),
    ).toHaveTextContent("ECE 1A");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-quarter`),
    ).toHaveTextContent("W22");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-enrollCode`),
    ).toHaveTextContent("12583");
    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-title`),
    ).toHaveTextContent("COMP ENGR SEMINAR");
  });
});
