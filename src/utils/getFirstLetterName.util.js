export const createNameAvatar = (name) => {
  if (!name) return '';
  const nameSplit = name.split(' ');
  if (nameSplit.length === 1) { return nameSplit[0][0].toUpperCase(); }
  return nameSplit[0].charAt(0).toUpperCase() + nameSplit[nameSplit.length - 1].charAt(0).toUpperCase();
};
