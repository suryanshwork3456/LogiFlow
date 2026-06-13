export const getCompany = () => {
  return JSON.parse(
    localStorage.getItem("company")
  );
};

export const isDemoCompany = () => {
  const company = getCompany();

  return company?.company_name === "ABC Logistics";
};