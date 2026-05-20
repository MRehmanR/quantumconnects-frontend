export const normalizePhoneForSubmit = (rawValue: string, countryCode: string) => {
  const raw = String(rawValue || "").trim();
  if (!raw) {
    return { ok: true, e164: "", message: "" };
  }

  const cleanPlus = raw.replace(/[^\d+]/g, "");
  if (cleanPlus.startsWith("+")) {
    const digits = cleanPlus.slice(1).replace(/\D/g, "");
    if (digits.length < 8) {
      return { ok: false, e164: "", message: "Enter a valid phone number" };
    }
    return { ok: true, e164: `+${digits}`, message: "" };
  }

  const digits = raw.replace(/\D/g, "");
  if (digits.length < 8) {
    return { ok: false, e164: "", message: "Enter a valid phone number" };
  }

  const normalizedCountryCode = countryCode.startsWith("+") ? countryCode : `+${countryCode}`;
  const localDigits = digits.replace(/^0+/, "");
  return { ok: true, e164: `${normalizedCountryCode}${localDigits}`, message: "" };
};
