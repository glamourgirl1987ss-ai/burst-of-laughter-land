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

    const username = Deno.env.get("SMTP_USERNAME")!;
    const password = Deno.env.get("SMTP_PASSWORD")!;

    const client = new SMTPClient({
      connection: {
        hostname: "eu1001.jethosting.com",
        port: 465,
        tls: true,
        auth: { username, password },
      },
    });

    const subject = `Нова поръчка от ${name}`;
    const text = `Име: ${name}\nТелефон: ${phone}\nАдрес: ${address}`;
    const html = `<!DOCTYPE html>
<html lang="bg"><head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;color:#222;">
  <h2>Нова поръчка - ЩуроБъркотия</h2>
  <p><strong>Име:</strong> ${name}</p>
  <p><strong>Телефон:</strong> ${phone}</p>
  <p><strong>Адрес:</strong> ${address}</p>
</body></html>`;

    await client.send({
      from: username,
      to: username,
      replyTo: username,
      subject,
      content: text,
      html,
      mimeContent: [
        {
          mimeType: 'text/plain; charset="utf-8"',
          content: text,
          transferEncoding: "8bit",
        },
        {
          mimeType: 'text/html; charset="utf-8"',
          content: html,
          transferEncoding: "8bit",
        },
      ],
      headers: {
        "MIME-Version": "1.0",
      },
    });

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-order-email error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});