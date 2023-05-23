import { relations } from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const payment = pgTable("payments", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => category.id),
  amount: numeric("amount"),
  paidOn: timestamp("paid_on"),
  description: text("description"),
});

export const paymentRelations = relations(payment, ({ one, many }) => ({
  category: one(category, {
    fields: [payment.categoryId],
    references: [category.id],
  }),
  attachments: many(attachment),
}));

export const category = pgTable("categories", {
  id: serial("id").primaryKey(),
  description: varchar("description"),
});

export const attachment = pgTable("attachments", {
  id: serial("id").primaryKey(),
  paymentId: integer("payment_id").references(() => payment.id),
  url: varchar("url"),
});
