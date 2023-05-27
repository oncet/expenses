import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useActionData, Form } from "@remix-run/react";

import { db } from "~/utils/db";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();

  console.log("formData", formData);

  return redirect(`/payments`);
};

export const loader = async () => {
  const categories = await db.query.category.findMany();

  return json({
    categories,
  });
};

export default function Add() {
  const { categories } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  console.log("actionData", actionData);

  return (
    <Stack spacing="4">
      <Heading as="h2">Add new payment</Heading>
      <Form method="post">
        <Stack spacing="4">
          <FormControl>
            <FormLabel>Select category</FormLabel>
            <Select>
              {categories.map((category) => (
                <option key={category.id}>{category.description}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Or enter new one</FormLabel>
            <Input />
          </FormControl>
          <FormControl>
            <FormLabel>Payment amount</FormLabel>
            <Input type="number" />
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input type="date" />
          </FormControl>
          <FormControl>
            <FormLabel>Details</FormLabel>
            <Textarea />
            <FormHelperText>Enter additional details.</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Files</FormLabel>
            <Input
              type="file"
              multiple
              sx={{
                "::file-selector-button": {
                  height: 10,
                  padding: 0,
                  mr: 4,
                  background: "none",
                  border: "none",
                  fontWeight: "bold",
                },
              }}
            />
            <FormHelperText>Attach any related documents.</FormHelperText>
          </FormControl>
          <Button colorScheme="green" type="submit">
            Save payment
          </Button>
          <Button colorScheme="red" type="reset">
            Reset form
          </Button>
        </Stack>
      </Form>
    </Stack>
  );
}
