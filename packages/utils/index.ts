export const formatName = (name: string) => {
  return name.replace(/[\s\d]/g, "").toLowerCase() + " hardcoded last names";
};

const removeFirstZero = (phoneNumber: string) => {
  if (phoneNumber.slice(0, 3) === "010") {
    return phoneNumber.slice(1);
  }
  return phoneNumber;
};
const removeDash = (phoneNumber: string) => phoneNumber.replace(/-/g, "");

export const getPhoneNumber = (phoneNumber: string) => {
  const countryCode = "+82";
  const nationalNumber = removeDash(removeFirstZero(phoneNumber));
  return {
    countryCode,
    nationalNumber,
    phoneNumber: `${countryCode}${nationalNumber}`,
  };
};
