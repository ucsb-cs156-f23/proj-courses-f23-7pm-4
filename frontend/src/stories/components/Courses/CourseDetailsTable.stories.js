import React from "react";

import CourseDetailsTable from "main/components/Courses/CourseDetailsTable";
import { personalSectionsFixtures } from "fixtures/personalSectionsFixtures";

export default {
  title: "components/Courses/CourseDetailsTable",
  component: CourseDetailsTable,
};

const Template = (args) => {
  return <CourseDetailsTable {...args} />;
};

export const Empty = Template.bind({});
Empty.args = {
  course: [],
};

export const OneSection = Template.bind({});

OneSection.args = {
  course: [personalSectionsFixtures.threePersonalSections[0]],
};
