import { relations } from 'drizzle-orm';
import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const userRoles = ['admin', 'user'] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum('user_roles', userRoles);

export const UserTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: timestamp({ withTimezone: true }),
  image: text(),
  password: text(),
  salt: text(),
  role: userRoleEnum().notNull().default('user'),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const oAuthProviders = ['discord', 'github'] as const;
export type OAuthProvider = (typeof oAuthProviders)[number];
export const oAuthProviderEnum = pgEnum('oauth_provides', oAuthProviders);

export const UserOAuthAccountTable = pgTable(
  'user_oauth_accounts',
  {
    userId: uuid()
      .notNull()
      .references(() => UserTable.id, { onDelete: 'cascade' }),
    provider: oAuthProviderEnum().notNull(),
    providerAccountId: text().notNull().unique(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [primaryKey({ columns: [t.providerAccountId, t.provider] })]
);

export const userOauthAccountRelationships = relations(
  UserOAuthAccountTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserOAuthAccountTable.userId],
      references: [UserTable.id],
    }),
  })
);

// Email verification tokens table
export const EmailVerificationTokenTable = pgTable(
  'email_verification_tokens',
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid()
      .notNull()
      .references(() => UserTable.id, { onDelete: 'cascade' }),
    token: text().notNull().unique(),
    expiresAt: timestamp({ withTimezone: true }).notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  }
);

export const emailVerificationTokenRelations = relations(
  EmailVerificationTokenTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [EmailVerificationTokenTable.userId],
      references: [UserTable.id],
    }),
  })
);

// Password reset tokens table
export const PasswordResetTokenTable = pgTable('password_reset_tokens', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid()
    .notNull()
    .references(() => UserTable.id, { onDelete: 'cascade' }),
  token: text().notNull().unique(),
  expiresAt: timestamp({ withTimezone: true }).notNull(),
  usedAt: timestamp({ withTimezone: true }),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const passwordResetTokenRelations = relations(
  PasswordResetTokenTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [PasswordResetTokenTable.userId],
      references: [UserTable.id],
    }),
  })
);

// Update user relations to include tokens
export const userRelations = relations(UserTable, ({ many }) => ({
  oAuthAccounts: many(UserOAuthAccountTable),
  emailVerificationTokens: many(EmailVerificationTokenTable),
  passwordResetTokens: many(PasswordResetTokenTable),
}));

export type User = typeof UserTable.$inferSelect;
export type NewUser = typeof UserTable.$inferInsert;
export type UserOAuthAccount = typeof UserOAuthAccountTable.$inferSelect;
export type NewUserOAuthAccount = typeof UserOAuthAccountTable.$inferInsert;
export type EmailVerificationToken =
  typeof EmailVerificationTokenTable.$inferSelect;
export type NewEmailVerificationToken =
  typeof EmailVerificationTokenTable.$inferInsert;
export type PasswordResetToken = typeof PasswordResetTokenTable.$inferSelect;
export type NewPasswordResetToken = typeof PasswordResetTokenTable.$inferInsert;
