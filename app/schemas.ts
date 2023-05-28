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
  categoryId: integer("category_id")
    .references(() => category.id)
    .notNull(),
  amount: numeric("amount").notNull(),
  paidOn: timestamp("paid_on").notNull(),
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
  description: varchar("description").notNull(),
});

export const attachment = pgTable("attachments", {
  id: serial("id").primaryKey(),
  paymentId: integer("payment_id")
    .references(() => payment.id)
    .notNull(),
  url: varchar("url").notNull(),
});
