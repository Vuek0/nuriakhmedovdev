import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body ?? {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // Created per request: the Resend constructor throws when the key is missing
  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Email is not configured" });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from:    "Portfolio <onboarding@resend.dev>",
    to:      "vueko.eruko@gmail.com",
    replyTo: email,
    subject: `New message from ${name}`,
    text:    `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ ok: true });
}
