import React from "react";
import { SimpleButton } from "./SimpleButton";
import { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Simple Button",
  component: SimpleButton,
} as Meta<typeof SimpleButton>;

const Template: StoryFn<typeof SimpleButton> = (args) => <SimpleButton {...args} />;

export const ButtonDefault = Template.bind({});
ButtonDefault.args = {
  children: <p>Hello</p>,
  onClick: () => console.log("hello"),
};
