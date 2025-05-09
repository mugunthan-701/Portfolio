import { NextResponse } from "next/server"

// This function creates a simple email without using nodemailer
export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Instead of sending an email directly, we'll create a response
    // that simulates a successful email send
    // In a production environment, you would integrate with a service like
    // SendGrid, Mailgun, or Resend that has REST APIs compatible with serverless

    console.log("Contact form submission:", {
      name,
      email,
      message,
      to: "mugunthan701@gmail.com",
      timestamp: new Date().toISOString(),
    })

    // For now, we'll just return a success response
    // In production, replace this with your actual email API integration
    return NextResponse.json({
      success: true,
      message:
        "Your message has been received. In the production version, an email would be sent to mugunthan701@gmail.com.",
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to process your message" }, { status: 500 })
  }
}
