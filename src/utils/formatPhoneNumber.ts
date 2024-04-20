function formatPhoneNumber(phoneNumber: string): string {
  const digits = phoneNumber.replace(/[^0-9]/g, "");
  return `(${digits.substring(0, 3)}) ${digits.substring(
    3,
    6
  )}-${digits.substring(6)}`;
}

export default formatPhoneNumber;
