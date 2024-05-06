const leapyear = (year: number) => {
    if (typeof year !== "number" || isNaN(year)) {
      return "Invalid input";
    }
  
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return true;
    } else {
      return false;
    }
  };
  
  export { leapyear as checkLeapYear };
  