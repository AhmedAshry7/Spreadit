import {
  parseISO,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
} from "date-fns";

function getTimeDifferenceString(dateString) {
  const date = parseISO(dateString);
  let returnString = "";
  let olderDate = "";
  let newerDate = "";
  const now = new Date();

  // Handle moments (less than a day)
  let diffInMinutes = Math.round(differenceInMinutes(now, date));
  if (diffInMinutes > 0) {
    olderDate = date;
    newerDate = now;
    returnString = " ago";
  } else if (diffInMinutes < 0) {
    olderDate = now;
    newerDate = date;
  } else {
    return "just now";
  }

  diffInMinutes = Math.round(differenceInMinutes(newerDate, olderDate));

  const diffInHours = differenceInHours(newerDate, olderDate);
  const diffInDays = differenceInDays(newerDate, olderDate);

  if (diffInMinutes < 60) {
    returnString =
      `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"}` + returnString;
  } else if (diffInHours < 24) {
    returnString =
      `${diffInHours} hour${diffInHours === 1 ? "" : "s"}` + returnString;
  } else if (diffInDays < 7) {
    returnString =
      `${diffInDays} day${diffInDays === 1 ? "" : "s"}` + returnString;
  } else if (diffInDays < 30) {
    const diffInWeeks = differenceInWeeks(newerDate, olderDate);
    returnString =
      `${diffInWeeks} week${diffInWeeks === 1 ? "" : "s"}` + returnString;
  } else if (diffInDays < 365) {
    const diffInMonths = differenceInMonths(newerDate, olderDate);
    returnString =
      `${diffInMonths} month${diffInMonths === 1 ? "" : "s"}` + returnString;
  } else {
    const diffInYears = differenceInYears(newerDate, olderDate);
    returnString =
      `${diffInYears} year${diffInYears === 1 ? "" : "s"}` + returnString;
  }
  return returnString;
}

export default getTimeDifferenceString;
