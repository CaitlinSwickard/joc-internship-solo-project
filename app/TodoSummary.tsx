import { Priority } from "@prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  high: number;
  medium: number;
  low: number;
}

const TodoSummary = ({ high, medium, low }: Props) => {
  const containers: {
    label: string;
    value: number;
    priority: Priority;
  }[] = [
    { label: "High Priority", value: high, priority: "HIGH" },
    { label: "Medium Priority", value: medium, priority: "MEDIUM" },
    { label: "Low Priority", value: low, priority: "LOW" },
  ];
  return (
    <Card>
      <Heading size='4' mb='5' >Todo's Priority Summary:</Heading>
      <Flex gap="4">
        {containers.map((container) => (
          <Card key={container.label}>
            <Flex direction="column" gap="1">
              <Link
                className="text-sm font-medium"
                href={`/todos/list?priority${container.priority}`}
              >
                {container.label}
              </Link>
              <Text size="5" className="font-bold">
                {container.value}
              </Text>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Card>
  );
};

export default TodoSummary;
