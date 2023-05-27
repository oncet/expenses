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
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db";

export const loader = async () => {
  const categories = await db.query.category.findMany();

  return json({
    categories,
  });
};

export default function Add() {
  const { categories } = useLoaderData<typeof loader>();

  return (
    <Stack spacing="4">
      <Heading as="h2">Add new payment</Heading>
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
      <Button colorScheme="green">Save payment</Button>
      <Button colorScheme="red">Reset form</Button>
    </Stack>
  );
}
