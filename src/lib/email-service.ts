import { randomBytes } from 'crypto';

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export interface EmailVerificationData {
  userName: string;
  verificationUrl: string;
}

export interface PasswordResetData {
  userName: string;
  resetUrl: string;
}

class EmailService {
  private isDevelopment = process.env.NODE_ENV !== 'production';

  async sendEmailVerification(
    email: string,
    data: EmailVerificationData
  ): Promise<void> {
    const template = this.createEmailVerificationTemplate(email, data);
    await this.sendEmail(template);
  }

  async sendPasswordReset(
    email: string,
    data: PasswordResetData
  ): Promise<void> {
    const template = this.createPasswordResetTemplate(email, data);
    await this.sendEmail(template);
  }

  private createEmailVerificationTemplate(
    email: string,
    data: EmailVerificationData
  ): EmailTemplate {
    const subject = 'Verify your email address';

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e9ecef; }
            .button { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #6c757d; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Email Verification</h1>
            </div>
            <div class="content">
              <p>Hello ${data.userName},</p>
              <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
              <p style="text-align: center;">
                <a href="${data.verificationUrl}" class="button">Verify Email Address</a>
              </p>
              <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #007bff;">${data.verificationUrl}</p>
              <p><strong>This link will expire in 24 hours.</strong></p>
              <p>If you didn't create an account, you can safely ignore this email.</p>
            </div>
            <div class="footer">
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const text = `
Hello ${data.userName},

Thank you for signing up! Please verify your email address by visiting this link:

${data.verificationUrl}

This link will expire in 24 hours.

If you didn't create an account, you can safely ignore this email.

This is an automated message, please do not reply to this email.
    `.trim();

    return { to: email, subject, html, text };
  }

  private createPasswordResetTemplate(
    email: string,
    data: PasswordResetData
  ): EmailTemplate {
    const subject = 'Reset your password';

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: white; padding: 30px; border: 1px solid #e9ecef; }
            .button { display: inline-block; padding: 12px 24px; background: #dc3545; color: white; text-decoration: none; border-radius: 4px; margin: 20px 0; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #6c757d; border-radius: 0 0 8px 8px; }
            .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 4px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset</h1>
            </div>
            <div class="content">
              <p>Hello ${data.userName},</p>
              <p>We received a request to reset your password. Click the button below to create a new password:</p>
              <p style="text-align: center;">
                <a href="${data.resetUrl}" class="button">Reset Password</a>
              </p>
              <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
              <p style="word-break: break-all; color: #dc3545;">${data.resetUrl}</p>
              <div class="warning">
                <p><strong>⚠️ Important Security Information:</strong></p>
                <ul>
                  <li>This link will expire in 15 minutes</li>
                  <li>This link can only be used once</li>
                  <li>If you didn't request this reset, please ignore this email</li>
                </ul>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated message, please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const text = `
Hello ${data.userName},

We received a request to reset your password. Visit this link to create a new password:

${data.resetUrl}

IMPORTANT SECURITY INFORMATION:
- This link will expire in 15 minutes
- This link can only be used once
- If you didn't request this reset, please ignore this email

This is an automated message, please do not reply to this email.
    `.trim();

    return { to: email, subject, html, text };
  }

  private async sendEmail(template: EmailTemplate): Promise<void> {
    if (this.isDevelopment) {
      this.logEmailToConsole(template);
    } else {
      // In production, integrate with your email provider (SendGrid, AWS SES, etc.)
      throw new Error('Production email sending not implemented yet');
    }
  }

  private logEmailToConsole(template: EmailTemplate): void {
    const separator = '='.repeat(80);
    const divider = '-'.repeat(80);

    console.log('\n' + separator);
    console.log('📧 EMAIL SENT (DEVELOPMENT MODE)');
    console.log(separator);
    console.log(`To: ${template.to}`);
    console.log(`Subject: ${template.subject}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(divider);
    console.log('TEXT VERSION:');
    console.log(divider);
    console.log(template.text);
    console.log(divider);
    console.log('HTML VERSION:');
    console.log(divider);
    console.log(template.html);
    console.log(separator + '\n');
  }
}

export const emailService = new EmailService();
