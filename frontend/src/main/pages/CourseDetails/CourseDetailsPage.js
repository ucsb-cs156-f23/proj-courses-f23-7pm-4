import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";

export default function CourseDetailsPage() {
  const { qyy, enrollCd } = useParams();

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Course Details Placeholder Page</h1>
        <p>Quarter in qyy format: {qyy} </p>
        <p>EnrollCd: {enrollCd} </p>
      </div>
    </BasicLayout>
  );
}
