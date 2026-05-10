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
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, address } = (await req.json()) as OrderPayload;

    if (!name || !phone || !address) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const username = Deno.env.get("SMTP_USERNAME");
    const password = Deno.env.get("SMTP_PASSWORD");

    if (!username || !password) {
      throw new Error("Missing SMTP credentials");
    }

    const transporter = nodemailer.createTransport({
      host: "eu1001.jethosting.com",
      port: 25,
      secure: true,
      auth: {
        user: username,
        pass: password,
      },
    });

    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeAddress = escapeHtml(address);

    const subject = `Нова поръчка от ${name}`;

    const text = `Нова поръчка - ЩуроБъркотия

Име: ${name}
Телефон: ${phone}
Адрес: ${address}`;

    const html = `
<!DOCTYPE html>
<html lang="bg">
  <head>
    <meta charset="UTF-8" />
  </head>
  <body style="font-family: Arial, sans-serif; color: #222; line-height: 1.5;">
    <h2>Нова поръчка - ЩуроБъркотия</h2>
    <p><strong>Име:</strong> ${safeName}</p>
    <p><strong>Телефон:</strong> ${safePhone}</p>
    <p><strong>Адрес:</strong> ${safeAddress}</p>
  </body>
</html>`;

    await transporter.sendMail({
      from: `"ЩуроБъркотия" <${username}>`,
      to: username,
      replyTo: username,
      subject,
      text,
      html,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-order-email error:", err);

    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
