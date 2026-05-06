import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { siteContent } from "@/content/landing";
import emojiPattern from "@/assets/emoji-pattern.png";

const FORMINIT_FORM_ID = "z5mu0doe7hm";

declare global {
  interface Window {
    forminit?: {
      submit: (
        formId: string,
        payload: FormData | Record<string, unknown>,
      ) => Promise<{ data?: unknown; redirectUrl?: string; error?: { message?: string } }>;
    };
  }
}

const orderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Моля, въведете име (поне 2 символа)" })
    .max(100, { message: "Името е твърде дълго" }),
  phone: z
    .string()
    .trim()
    .min(6, { message: "Въведете валиден телефонен номер" })
    .max(30, { message: "Телефонът е твърде дълъг" })
    .regex(/^[+0-9\s\-()]+$/, { message: "Невалиден телефонен номер" }),
  address: z
    .string()
    .trim()
    .min(5, { message: "Адресът е твърде кратък" })
    .max(300, { message: "Адресът е твърде дълъг" }),
});

type FormData = z.infer<typeof orderSchema>;
type Errors = Partial<Record<keyof FormData, string>>;

export function OrderForm() {
  const { order } = siteContent;
  const [data, setData] = useState<FormData>({ name: "", phone: "", address: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof FormData>(key: K, value: string) {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = orderSchema.safeParse(data);
    if (!result.success) {
      const newErrors: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormData;
        if (!newErrors[key]) newErrors[key] = issue.message;
      }
      setErrors(newErrors);
      return;
    }
    setSubmitting(true);
    try {
      if (!window.forminit) {
        throw new Error("Forminit SDK не е заредено");
      }
      const fd = new FormData();
      fd.append("fi-sender-fullName", result.data.name);
      fd.append("fi-text-phone", result.data.phone);
      fd.append("fi-text-address", result.data.address);
      const res = await window.forminit.submit(FORMINIT_FORM_ID, fd);
      if (res?.error) {
        throw new Error(res.error.message || "Грешка при изпращане");
      }
      toast.success(order.success);
      setData({ name: "", phone: "", address: "" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Възникна грешка. Опитай отново.");
    } finally {
      setSubmitting(false);
    }
  }

  const fields: Array<{ key: keyof FormData; label: string; placeholder: string; type?: string }> = [
    { key: "name", label: "Име", placeholder: "Иван Иванов" },
    { key: "phone", label: "Телефон", placeholder: "+359 88 123 4567", type: "tel" },
    { key: "address", label: "Адрес", placeholder: "ул. Веселие 1, София" },
  ];

  return (
    <section
      id="order"
      className="relative overflow-hidden px-4 py-20 md:py-28"
      style={{
        backgroundImage: `url(${emojiPattern})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="rounded-3xl bg-white p-6 shadow-[0_20px_0_rgb(0_0_0_/_0.15)] ring-4 ring-fun-ink/10 md:p-10">
          <div className="text-center">
            <span className="text-5xl">🎁</span>
            <h2
              className="mt-2 font-display text-4xl font-bold text-fun-ink md:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              {order.heading}
            </h2>
            <p className="mt-3 font-display text-base font-semibold text-fun-ink/70 md:text-lg">
              {order.subheading}
            </p>
          </div>

          <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
            {fields.map((f) => (
              <div key={f.key}>
                <label
                  htmlFor={f.key}
                  className="mb-1.5 block font-display text-sm font-bold text-fun-ink"
                >
                  {f.label}
                </label>
                <input
                  id={f.key}
                  type={f.type ?? "text"}
                  value={data[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                  placeholder={f.placeholder}
                  maxLength={f.key === "address" ? 300 : 100}
                  className="w-full rounded-2xl border-4 border-fun-ink/10 bg-fun-cream px-4 py-3 font-display text-base text-fun-ink outline-none transition-colors placeholder:text-fun-ink/40 focus:border-fun-purple"
                />
                {errors[f.key] && (
                  <p className="mt-1.5 font-display text-sm font-semibold text-fun-red">
                    {errors[f.key]}
                  </p>
                )}
              </div>
            ))}
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-fun-red px-8 py-4 font-display text-lg font-bold text-white shadow-[0_8px_0_rgb(0_0_0_/_0.2)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_0_rgb(0_0_0_/_0.22)] active:translate-y-1 disabled:opacity-60 md:text-xl"
            >
              {submitting ? "Изпращане..." : `${order.submit} 🚀`}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
