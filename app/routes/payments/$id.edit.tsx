import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link as RemixLink, useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import { eq } from "drizzle-orm";

import { category, payment } from "~/schemas";
import { db } from "~/utils/db";

const findOrCreateCategory = async (description: string) => {
  const existingCategory = await db.query.category.findFirst({
    where: eq(category.description, description),
  });

  if (existingCategory) return existingCategory.id;

  const [results] = await db
    .insert(category)
    .values({
      description,
    })
    .returning({ newCategoryId: category.id });

  return results.newCategoryId;
};

export const action = async ({ request, params }: ActionArgs) => {
  const formData = Object.fromEntries(await request.formData());

  console.log("formData", formData);

  const categoryId = formData.newCategory
    ? await findOrCreateCategory(formData.newCategory as string)
    : Number(formData.category);

  await db
    .update(payment)
    .set({
      categoryId,
      paidOn: new Date(formData.paidOn as string),
      amount: formData.amount as string,
      description: formData.description as string,
    })
    .where(eq(payment.id, Number(params.id)));

  return redirect("/payments/" + params.id);
};

export const loader = async ({ params }: LoaderArgs) => {
  const categories = await db.query.category.findMany();

  const currentPayment = await db.query.payment.findFirst({
    where: eq(payment.id, Number(params.id)),
  });

  if (!currentPayment) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  return json({
    currentPayment,
    categories,
  });
};

export default function Edit() {
  const { currentPayment, categories } = useLoaderData<typeof loader>();

  return (
    <Stack spacing="4">
      <Stack>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink as={RemixLink} to="/payments/date/October">
              October
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink as={RemixLink} to="/payments/123">
              Payment #{currentPayment.id}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading as="h2">Edit payment #{currentPayment.id}</Heading>
      </Stack>
      <Form method="post">
        <Stack spacing="4">
          <FormControl>
            <FormLabel>Select an existing description</FormLabel>
            <Select name="category">
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  selected={category.id === currentPayment.categoryId}
                >
                  {category.description}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Or enter a new one</FormLabel>
            <Input name="newCategory" />
          </FormControl>
          <FormControl>
            <FormLabel>Payment amount</FormLabel>
            <Input
              type="number"
              name="amount"
              defaultValue={currentPayment.amount}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Details</FormLabel>
            <Textarea
              name="description"
              defaultValue={currentPayment.description || ""}
            />
            <FormHelperText>Enter any additional details.</FormHelperText>
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
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              name="paidOn"
              defaultValue={format(
                new Date(currentPayment.paidOn),
                "yyyy-MM-dd"
              )}
            />
          </FormControl>
          <Button colorScheme="blue" type="submit">
            Save changes
          </Button>
          <Button variant="outline" colorScheme="red">
            Delete payment
          </Button>
        </Stack>
      </Form>
    </Stack>
  );
}
