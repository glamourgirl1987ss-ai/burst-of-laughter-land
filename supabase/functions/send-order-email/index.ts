import nodemailer from "npm:nodemailer@6.9.13";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface OrderPayload {
  name: string;
  phone: string;
  email: string;
  address: string;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const { name, phone, email, address } = (await req.json()) as OrderPayload;

    if (!name || !phone || !email || !address) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json; charset=utf-8",
        },
      });
    }

    const username = Deno.env.get("SMTP_USERNAME");
    const password = Deno.env.get("SMTP_PASSWORD");

    if (!username || !password) {
      throw new Error("Missing SMTP credentials");
    }

    const transporter = nodemailer.createTransport({
      host: "eu1001.jethosting.com",
      port: 465,
      secure: true,
      auth: {
        user: username,
        pass: password,
      },
    });

    const safeName = escapeHtml(name.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeAddress = escapeHtml(address.trim());

    await transporter.sendMail({
      from: `"ShturoBarkotia" <${username}>`,
      to: "glamourgirl1987ss@gmail.com",
      replyTo: email,
      subject: "Nova porachka - ShturoBarkotia",
      text: `Nova porachka - ShturoBarkotia

Ime: ${name}
Telefon: ${phone}
Email: ${email}
Adres: ${address}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #222; line-height: 1.5;">
          <h2>Nova porachka - ShturoBarkotia</h2>
          <p><strong>Ime:</strong> ${safeName}</p>
          <p><strong>Telefon:</strong> ${safePhone}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Adres:</strong> ${safeAddress}</p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (err) {
    console.error("send-order-email error:", err);

    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );
  }
});
