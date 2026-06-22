import nodemailer from "nodemailer";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { nullToEmptyString } from "../helpers";

export const server = {
  sendMail: defineAction({
    accept: "form",
    input: z.object({
      name: z.preprocess(
        nullToEmptyString,
        z.string().min(4, "El nombre no puede ir vacío")
      ),
      email: z.preprocess(
        nullToEmptyString,
        z.string()
          .min(1, "El email no puede ir vacío")
          .email("Email no válido")
      ),
      message: z.preprocess(
        nullToEmptyString,
        z.string().min(4, "El mensaje no puede ir vacío o es muy corto")
      )
    }),

    handler: async (input) => {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: import.meta.env.GMAIL_USER,
          pass: import.meta.env.GMAIL_PASS,
        },
      })

      await transporter.sendMail({
        from: input.email,
        to: "ibra.rodriguez.olaya@gmail.com",
        subject: "Nueva solicitud",
        html: `
          <p><strong>Nombre:</strong> ${input.name}</p>
          <p><strong>Email:</strong> ${input.email}</p>
          <p><strong>Mensaje:</strong><br>${input.message}</p>
        `,
      })

      return {
        message: "Correo enviado correctamente",
        error: false,
      }
    },
  }),
}
