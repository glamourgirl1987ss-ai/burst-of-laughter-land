import nodemailer from "npm:nodemailer@6.9.13";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface OrderPayload {
  name: string;
  phone: string;
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
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const { name, phone, address } = (await req.json()) as OrderPayload;

    if (!name || !phone || !address) {
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

    const safeName = escapeHtml(name.trim());
    const safePhone = escapeHtml(phone.trim());
    const safeAddress = escapeHtml(address.trim());

    const transporter = nodemailer.createTransport({
      //host: "eu1001.jethosting.com",
      //port: 25,
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      auth: {
        user: "business.advanc3d@gmail.com",
        pass: "cgugpqljhcxtdcjm",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const html = `<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8">
  <title>Нова поръчка</title>
</head>
<body style="margin:0;padding:20px;font-family:Arial,sans-serif;color:#222;background:#ffffff;">
  <h2 style="margin:0 0 16px;">Нова поръчка - ЩуроБъркотия</h2>

  <p><strong>Име:</strong> ${safeName}</p>
  <p><strong>Телефон:</strong> ${safePhone}</p>
  <p><strong>Адрес:</strong> ${safeAddress}</p>
</body>
</html>`;

    await transporter.sendMail({
      from: `"ЩуроБъркотия" <${username}>`,
      to: "business.advanc3d@gmail.com",

      // IMPORTANT:
      // Test also with Gmail:
      // to: "yourgmail@gmail.com",

      replyTo: username,
      subject: "Нова поръчка - ЩуроБъркотия",

      // HTML only — no text version
      html,

      encoding: "utf-8",

      headers: {
        "Content-Type": "text/html; charset=UTF-8",
        "Content-Transfer-Encoding": "quoted-printable",
      },
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
