export const onlyDigits = (value: String) => {
  return value.replace(/[^\d\s\/]/g, "");
};
