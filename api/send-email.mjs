import nodemailer from "nodemailer";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) =>
  value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ message: "Método no permitido." });
  }

  const name = String(request.body?.name ?? "").trim();
  const email = String(request.body?.email ?? "").trim();
  const message = String(request.body?.message ?? "").trim();

  if (name.length < 4 || !emailPattern.test(email) || message.length < 4) {
    return response.status(400).json({ message: "Los datos del formulario no son válidos." });
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    return response.status(500).json({ message: "El servicio de correo no está configurado." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `Portafolio <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Nueva solicitud de ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
      html: `
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    return response.status(200).json({ message: "Correo enviado correctamente." });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return response.status(500).json({ message: "No se pudo enviar el correo. Inténtalo nuevamente." });
  }
}
