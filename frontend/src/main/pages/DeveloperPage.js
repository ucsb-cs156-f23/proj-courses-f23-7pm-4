import React from "react";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { Row } from "react-bootstrap";
import ReactJson from "react-json-view";
import { useSystemInfo } from "main/utils/systemInfo";

const DeveloperPage = () => {
  const { data: systemInfo } = useSystemInfo();

  return (
    <BasicLayout>
      <h2>Welcome to the Developer Page!</h2>
      <hr></hr>
      <Row className="text-left">
        <ReactJson src={systemInfo} />
      </Row>
    </BasicLayout>
  );
};

export default DeveloperPage;
