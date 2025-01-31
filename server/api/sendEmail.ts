import { Resend } from 'resend'
import type { H3Event } from 'h3'

const resend = new Resend(process.env.NUXT_PRIVATE_RESEND_API_KEY)

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = (await readBody(event))
    const { email, subject, message, phone, fullname } = body
    return await resend.emails.send({
      from: 'Ravikant Chauhan <ravikantchauhan246@gmail.com>',
      to: ['ravikantchauhan246@gmail.com'],
      subject: 'New message from website',
      html: `
      <p>A new message has been sent from the portfolio contact form.</p>
      <p>Here are the details of the message:</p>
      <ul>
        <li>Name: ${fullname}</li>
        <li>Email: ${email}</li>
        <li>Phone: ${phone}</li>
        <li>Subject: ${subject}</li>
        <li>Message: ${message}</li>
      </ul>
      `,
    })
  }
  catch (error) {
    return { error }
  }
})
