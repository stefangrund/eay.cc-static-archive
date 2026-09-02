export function validateSummaryInfo(data) {
  if (Object.hasOwn(data, "info")) {
    throw new Error(`Year ${data.year}: move the AI disclosure into each month`);
  }
  if (!Array.isArray(data.months)) {
    throw new Error(`Year ${data.year}: months must be an array`);
  }
  for (const month of data.months) {
    if (typeof month.info !== "string" || !month.info.trim()) {
      throw new Error(`Missing AI disclosure for ${month.monthISO}`);
    }
  }
}
