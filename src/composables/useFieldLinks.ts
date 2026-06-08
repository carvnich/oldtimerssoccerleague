const FIELD_LINKS: Record<string, string> = {
  "Ancaster 3-A": "https://maps.app.goo.gl/cBi8rZHzGMPT7GcKA",
  "Heritage Green 1": "https://maps.app.goo.gl/gEf6unPrHS4kxhx37",
  "Heritage Green 2": "https://maps.app.goo.gl/gEf6unPrHS4kxhx37",
  "Heritage Green 3": "https://maps.app.goo.gl/gEf6unPrHS4kxhx37",
  "Heritage Green 4": "https://maps.app.goo.gl/gEf6unPrHS4kxhx37",
  "Heritage Green 5": "https://maps.app.goo.gl/gEf6unPrHS4kxhx37",
  "Mohawk 1": "https://maps.app.goo.gl/eP2xLHmkJ4pY4FYH7",
  "Mohawk 2": "https://maps.app.goo.gl/eP2xLHmkJ4pY4FYH7",
  "Mohawk 3": "https://maps.app.goo.gl/eP2xLHmkJ4pY4FYH7",
  "Mohawk 4": "https://maps.app.goo.gl/eP2xLHmkJ4pY4FYH7",
  "Mohawk 5": "https://maps.app.goo.gl/eP2xLHmkJ4pY4FYH7",
  "Mohawk 6": "https://maps.app.goo.gl/eP2xLHmkJ4pY4FYH7",
  "Sackville Hill 1-A": "https://maps.app.goo.gl/zUe3xH6s3FvZATbR9",
  "Billy Sherring 1-A": "https://maps.app.goo.gl/S2Qe5wsFmDaSUSZ38",
  "Famee Furlane": "https://maps.app.goo.gl/U9B1p3Zzi8ezxwpe8",
  "Glover Road": "https://maps.app.goo.gl/dvB8pVjm5rJ7pMoUA",
  "Hamilton Italian Centre": "https://maps.app.goo.gl/mc35jfsjnLo1CgE6A",
  "Proto Field": "https://maps.app.goo.gl/xy4f6nYND5Xtak2f7",
  "Shady Acres 1": "https://maps.app.goo.gl/fKc1pTbEeYdX8xLy5",
  "Shady Acres 2": "https://maps.app.goo.gl/fKc1pTbEeYdX8xLy5",
};

export function useFieldLinks() {
  function getFieldUrl(fieldName: string): string | null {
    return FIELD_LINKS[fieldName] ?? null;
  }
  return { getFieldUrl };
}
