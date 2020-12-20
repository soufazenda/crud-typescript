import { url } from '../configuration/env'
import nodemailer, { SentMessageInfo } from 'nodemailer'
import handlebars from 'nodemailer-express-handlebars'
import Mail from 'nodemailer/lib/mailer'

import { EmailConfirmation } from './types'

interface MailerSenderProps {
  to: string | string[]
  subject: string
  template: string
  context: object
}

const handlebarOptions = {
  viewEngine: {
    extName: '.handlebars',
    partialsDir: './src/mailer/templates',
    defaultLayout: false,
  },
  viewPath: './src/mailer/templates',
  extName: '.handlebars',
}

export class Mailer {
  private transporter: Mail
  constructor() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.yahoo.com',
      port: 465,
      secure: true,
      auth: {
        user: 'soufazenda@yahoo.com',
        pass: 'hheysipbqlqsyihq',
      },
    })
    transporter.use('compile', handlebars(handlebarOptions))

    this.transporter = transporter
  }

  sendEmailConfirmation({
    to,
    subject = 'Confirmação de Email',
    token,
    username,
  }: EmailConfirmation) {
    const confirmation_link = `${url}/confirmation?token=${token}`

    return this.sendEmail({
      to,
      subject,
      template: 'email_confirmation',
      context: {
        confirmation_link,
        user_name: username,
      },
    })
  }

  private async sendEmail({
    to,
    subject,
    template,
    context,
  }: MailerSenderProps): Promise<SentMessageInfo> {
    let sendTo = to
    if (Array.isArray(to)) sendTo = to.join(',')
    return await this.transporter.sendMail({
      from: '"Sou Fazenda 🍃" <soufazenda@yahoo.com>',
      to: sendTo,
      subject,
      //@ts-ignore
      template,
      context,
    })
  }
}
