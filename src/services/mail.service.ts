import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'mail.metacubic.org',
      port: 587,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendMail(mailOptions: {
    subject: string;
    from: string;
    to: string;
    text: string;
  }) {
    await this.transporter.sendMail(mailOptions);
  }
}
