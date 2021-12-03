export const formatLocation = (location: string) => {
  let formattedLocation = location;
  if (location.includes("•")) {
    const items = formattedLocation.split("•");
    formattedLocation = `${items[0]} / ${items[1]}`;
  }
  if (location.includes("+")) {
    formattedLocation = location.split("+")[0];
  }
  return formattedLocation;
};

export const formatJobTitle = (jobTitle: string) => {
  if (jobTitle.includes("new")) return jobTitle.split("new")[1];
  return jobTitle;
};

export const formatSalary = (salary: string) => {
  if (salary === "0" || salary === "") return "No salary listed";
  return salary;
};
