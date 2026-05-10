import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

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

  let client: SMTPClient | null = null;

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

    client = new SMTPClient({
      connection: {
        hostname: "eu1001.jethosting.com",
        port: 25,
        tls: true,
        auth: {
          username,
          password,
        },
      },
    });

    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeAddress = escapeHtml(address);

    const subject = `Нова поръчка от ${name}`;

    const text = ["Нова поръчка - ЩуроБъркотия", "", `Име: ${name}`, `Телефон: ${phone}`, `Адрес: ${address}`].join(
      "\n",
    );

    const html = `<!DOCTYPE html>
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

    await client.send({
      from: username,
      to: username,
      replyTo: username,
      subject,
      content: text,
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
  } finally {
    if (client) {
      await client.close();
    }
  }
});
