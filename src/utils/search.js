export const searchCase = (name, searchText) => {
  return name.toLowerCase().trim().includes(searchText.toLowerCase().trim());
};
