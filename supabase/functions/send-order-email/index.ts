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

function toHtmlEntities(value: string) {
  return [...value]
    .map((char) => {
      const code = char.codePointAt(0)!;
      return code > 127 ? `&#${code};` : char;
    })
    .join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  let client: SMTPClient | null = null;

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

    const safeName = toHtmlEntities(escapeHtml(name.trim()));
    const safePhone = toHtmlEntities(escapeHtml(phone.trim()));
    const safeAddress = toHtmlEntities(escapeHtml(address.trim()));

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body style="font-family: Arial, sans-serif; color: #222; line-height: 1.5;">
  <h2>&#1053;&#1086;&#1074;&#1072; &#1087;&#1086;&#1088;&#1098;&#1095;&#1082;&#1072; - &#1065;&#1091;&#1088;&#1086;&#1041;&#1098;&#1088;&#1082;&#1086;&#1090;&#1080;&#1103;</h2>

  <p><strong>&#1048;&#1084;&#1077;:</strong> ${safeName}</p>
  <p><strong>&#1058;&#1077;&#1083;&#1077;&#1092;&#1086;&#1085;:</strong> ${safePhone}</p>
  <p><strong>&#1040;&#1076;&#1088;&#1077;&#1089;:</strong> ${safeAddress}</p>
</body>
</html>`;

    await client.send({
      from: username,
      to: username,
      replyTo: username,

      // IMPORTANT: keep subject in Latin letters to avoid header encoding bugs
      subject: "Nova porachka - ShturoBarkotia",

      // HTML only
      html,
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
  } finally {
    if (client) {
      await client.close();
    }
  }
});
