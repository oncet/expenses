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
import { payment } from "~/schemas";

export const action = async ({ request }: ActionArgs) => {
  const formData = Object.fromEntries(await request.formData());

  await db.insert(payment).values({
    categoryId: Number(formData.category),
    paidOn: new Date(formData.paidOn as string),
    amount: formData.amount as string,
    description: formData.description as string,
  });

  // return redirect(`/payments`);

  return true;
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
            <Select name="category">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.description}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Or enter new one</FormLabel>
            <Input name="newCategory" />
          </FormControl>
          <FormControl>
            <FormLabel>Payment amount</FormLabel>
            <Input name="amount" type="number" required />
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input name="paidOn" type="date" required />
          </FormControl>
          <FormControl>
            <FormLabel>Details</FormLabel>
            <Textarea name="description" />
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
