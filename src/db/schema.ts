import { pgTable, text, timestamp, serial, boolean } from 'drizzle-orm/pg-core';

// Tabla de usuarios
export const users = pgTable('users', {
  id: serial('id').primaryKey().notNull(),
  name: text('name'),
  email: text('email').notNull().unique(),
  password: text('password'),
  isAdmin: boolean('is_admin').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Tabla de casos
export const cases = pgTable('cases', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  content: text('content'),
  location: text('location'),
  status: text('status').default('active'), // active, closed, monitoring
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Tabla de informes
export const reports = pgTable('reports', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  summary: text('summary'),
  content: text('content'),
  category: text('category'),
  downloadUrl: text('download_url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Tabla de categorías
export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  slug: text('slug'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
