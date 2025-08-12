/**
 * Test script to demonstrate email verification and password reset flows
 * Run with: npx tsx src/test-email-flows.ts
 */

import { emailService } from './lib/email-service';
import { tokenService } from './lib/token-service';

async function testEmailVerificationFlow() {
  console.log('\n🧪 TESTING EMAIL VERIFICATION FLOW');
  console.log('=====================================');

  try {
    // Simulate creating a verification token for a new user
    const mockUserId = 'test-user-123';
    const token = await tokenService.createEmailVerificationToken(mockUserId);

    console.log('✅ Email verification token created successfully');
    console.log(`Token length: ${token.length} characters`);

    // Simulate sending verification email
    const verificationUrl = `http://localhost:3000/verify-email/${token}`;
    await emailService.sendEmailVerification('test@example.com', {
      userName: 'John Doe',
      verificationUrl,
    });

    console.log('✅ Email verification flow completed successfully');

    // Test token validation
    const validation = await tokenService.validateEmailVerificationToken(token);
    console.log(
      `✅ Token validation result: ${validation.isValid ? 'VALID' : 'INVALID'}`
    );
  } catch (error) {
    console.error('❌ Email verification flow failed:', error);
  }
}

async function testPasswordResetFlow() {
  console.log('\n🧪 TESTING PASSWORD RESET FLOW');
  console.log('===============================');

  try {
    // Simulate creating a password reset token for an existing user
    const mockUserId = 'existing-user-456';
    const token = await tokenService.createPasswordResetToken(mockUserId);

    console.log('✅ Password reset token created successfully');
    console.log(`Token length: ${token.length} characters`);

    // Simulate sending password reset email
    const resetUrl = `http://localhost:3000/reset-password/${token}`;
    await emailService.sendPasswordReset('user@example.com', {
      userName: 'Jane Smith',
      resetUrl,
    });

    console.log('✅ Password reset flow completed successfully');

    // Test token validation
    const validation = await tokenService.validatePasswordResetToken(token);
    console.log(
      `✅ Token validation result: ${validation.isValid ? 'VALID' : 'INVALID'}`
    );
  } catch (error) {
    console.error('❌ Password reset flow failed:', error);
  }
}

async function testRateLimiting() {
  console.log('\n🧪 TESTING RATE LIMITING');
  console.log('=========================');

  try {
    const mockUserId = 'rate-limit-test-user';

    // Test email verification rate limiting
    const emailRateLimit =
      await tokenService.checkEmailVerificationRateLimit(mockUserId);
    console.log('✅ Email verification rate limit check:', {
      allowed: emailRateLimit.allowed,
      remainingAttempts: emailRateLimit.remainingAttempts,
    });

    // Test password reset rate limiting
    const passwordRateLimit =
      await tokenService.checkPasswordResetRateLimit(mockUserId);
    console.log('✅ Password reset rate limit check:', {
      allowed: passwordRateLimit.allowed,
      remainingAttempts: passwordRateLimit.remainingAttempts,
    });
  } catch (error) {
    console.error('❌ Rate limiting test failed:', error);
  }
}

async function testTokenSecurity() {
  console.log('\n🧪 TESTING TOKEN SECURITY');
  console.log('==========================');

  try {
    const mockUserId = 'security-test-user';

    // Create two tokens and verify they're different
    const token1 = await tokenService.createEmailVerificationToken(mockUserId);
    const token2 = await tokenService.createEmailVerificationToken(mockUserId);

    console.log('✅ Token uniqueness test:', {
      token1Length: token1.length,
      token2Length: token2.length,
      areUnique: token1 !== token2,
    });

    // Test invalid token
    const invalidValidation =
      await tokenService.validateEmailVerificationToken('invalid-token');
    console.log('✅ Invalid token test:', {
      isValid: invalidValidation.isValid,
      error: invalidValidation.error,
    });
  } catch (error) {
    console.error('❌ Token security test failed:', error);
  }
}

async function runAllTests() {
  console.log('🚀 STARTING EMAIL VERIFICATION & PASSWORD RESET TESTS');
  console.log('======================================================');

  await testEmailVerificationFlow();
  await testPasswordResetFlow();
  await testRateLimiting();
  await testTokenSecurity();

  console.log('\n✨ ALL TESTS COMPLETED');
  console.log('======================');
  console.log(
    'Check the console output above to see the email templates that would be sent.'
  );
  console.log(
    'In development mode, emails are logged to console instead of being sent.'
  );

  process.exit(0);
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().catch((error) => {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
  });
}

export { runAllTests };
