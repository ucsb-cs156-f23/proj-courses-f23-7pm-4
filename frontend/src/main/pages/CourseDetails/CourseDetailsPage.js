import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useBackend } from "main/utils/useBackend";
import CourseDetailsTable from "main/components/Courses/CourseDetailsTable";
import { useParams } from "react-router-dom";

export default function CourseDetailsPage() {
  const { qyy, enrollCd } = useParams();

  const {
    data: personalSection,
    error: _error,
    status: _status,
  } = useBackend(
    // Stryker disable all : hard to test for query caching
    [`/api/sections/sectionsearch?qtr=${qyy}&enrollCode=${enrollCd}`],
    {
      // Stryker disable next-line all : GET is the default, so changing this to "" doesn't introduce a bug
      method: "GET",
      url: `/api/sections/sectionsearch`,
      params: {
        qtr: qyy,
        enrollCode: enrollCd,
      },
    },
    [],
  );

  return (
    <BasicLayout>
      <div>
        <h1>Course Details Placeholder Page</h1>
        {personalSection && <CourseDetailsTable course={[personalSection]} />}
      </div>
    </BasicLayout>
  );
}
