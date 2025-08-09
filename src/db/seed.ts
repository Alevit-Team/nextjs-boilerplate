import { db } from './index';
import { UserOAuthAccountTable, UserTable } from './schema';

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    // Insert sample users
    const insertedUsers = await db
      .insert(UserTable)
      .values([
        {
          name: 'John Doe',
          email: 'john@example.com',
          emailVerified: new Date(),
          image: 'https://github.com/johndoe.png',
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          image: 'https://github.com/janesmith.png',
        },
      ])
      .returning();

    console.log('✅ Users seeded:', insertedUsers.length);

    const oAuthAccounts = await db
      .insert(UserOAuthAccountTable)
      .values([
        {
          userId: insertedUsers[0].id,
          provider: 'discord',
          providerAccountId: '1234567890',
        },
      ])
      .returning();

    console.log('✅ OAuth accounts seeded:', oAuthAccounts.length);

    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
