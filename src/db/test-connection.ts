import { db } from '.';

async function testConnection() {
  console.log('🔍 Testing database connection...');

  try {
    // Test basic connection
    const result = await db.execute('SELECT 1 as test');
    console.log('✅ Database connection successful!');
    console.log('📊 Test query result:', result.rows);

    // Test table creation (this would work after running migrations)
    console.log(
      '📝 Note: Run migrations with `pnpm db:migrate` after starting Docker services'
    );
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    console.log('💡 Make sure Docker services are running: `pnpm docker:up`');
  }
}

testConnection();
