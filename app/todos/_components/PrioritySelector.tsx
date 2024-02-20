import { Select } from "@radix-ui/themes";

import React from "react";

const PrioritySelector = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Priority... " />
      <Select.Content>
        <Select.Item value="high">HIGH</Select.Item>
        <Select.Item value="medium">MEDIUM</Select.Item>
        <Select.Item value="low">LOW</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default PrioritySelector;
