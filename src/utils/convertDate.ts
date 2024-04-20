function convertDate (date: Date): string {
  const month = date.toLocaleString("en-US", { month: "long" });
  return date.getDate() + " " + month + " " + date.getFullYear();
};

export default convertDate;
