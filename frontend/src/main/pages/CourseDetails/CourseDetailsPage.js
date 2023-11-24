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
    [`/api/sections/sectionsearch?qtr=${qyy}&enrollCode=${enrollCd}`],
    {
      method: "GET",
      url: `/api/sections/sectionsearch?qtr=${qyy}&enrollCode=${enrollCd}`,
      params: {
        qtr: qyy,
        enrollCode: enrollCd,
      },
    },
    [],
  );

  console.log(personalSection.title);

  return (
    <BasicLayout>
      <div>
        <h1>Course Details Placeholder Page</h1>
        { personalSection && (<CourseDetailsTable course={[personalSection]} />)}
      </div>
    </BasicLayout>
  );
}