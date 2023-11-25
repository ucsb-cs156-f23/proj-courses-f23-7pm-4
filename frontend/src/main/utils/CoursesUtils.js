import { toast } from "react-toastify";
const quarters = ["WINTER", "SPRING", "SUMMER", "FALL"];
const quartersInLowercase = ["Winter", "Spring", "Summer", "Fall"];

const shortQuarters = ["W", "S", "M", "F"];

const qtrNumToQuarter = {
  1: "WINTER",
  2: "SPRING",
  3: "SUMMER",
  4: "FALL",
};

export function onDeleteSuccess(message) {
  console.log(message);
  toast(message);
}

export function cellToAxiosParamsDelete(cell) {
  return {
    url: "/api/courses/user",
    method: "DELETE",
    params: {
      id: cell.row.values.id,
    },
  };
}

export const nextQuarter = (yyyyqInt) => {
  const _yyyyqStr = fromNumericYYYYQ(yyyyqInt); // just for type/format checking
  const qInt = yyyyqInt % 10;
  const yyyyInt = Math.floor(yyyyqInt / 10);
  if (qInt < 4) {
    return yyyyqInt + 1;
  }
  return (yyyyInt + 1) * 10 + 1;
};
export const fromNumericYYYYQ = (yyyyqInt) => {
  if (typeof yyyyqInt != "number") {
    throw new Error("param should be a number");
  }
  const yyyyqStr = yyyyqInt.toString();
  if (yyyyqStr.length !== 5) {
    throw new Error("param should be five digits");
  }
  const qStr = yyyyqStr.substring(4, 5);
  if (!(qStr in qtrNumToQuarter)) {
    throw new Error("param should end in 1,2,3 or 4");
  }
  return yyyyqStr;
};

export const toNumericYYYYQ = (yyyyqStr) => {
  if (typeof yyyyqStr !== "string") {
    throw new Error("param should be a string");
  }
  if (yyyyqStr.length !== 5) {
    throw new Error("param should be five digits");
  }
  const qStr = yyyyqStr.substring(4, 5);
  if (!(qStr in qtrNumToQuarter)) {
    throw new Error("param should end in 1,2,3 or 4");
  }
  return parseInt(yyyyqStr);
};
export const quartersNewRange = (beginYYYYQStr, endYYYYQStr) => {
  let quarterList = [];
  const beginYYYYQInt = toNumericYYYYQ(beginYYYYQStr);
  const endYYYYQInt = toNumericYYYYQ(endYYYYQStr);
  for (
    let yyyyqInt = beginYYYYQInt;
    yyyyqInt <= endYYYYQInt;
    yyyyqInt = nextQuarter(yyyyqInt)
  ) {
    const yyyyqStr = fromNumericYYYYQ(yyyyqInt);
    quarterList.push({
      yyyyq: yyyyqStr,
      qyy: `${shortQuarters[parseInt(yyyyqStr.charAt(4)) - 1]}${yyyyqStr.substring(
        2,
        4,
      )}${" "}${quartersInLowercase[parseInt(yyyyqStr.charAt(4)) - 1]}${" Courses"}`,
    });
  }
  return quarterList;
};

export const stringToLong = (str) => {
  if (typeof str !== "string") {
    throw new Error("param should be a string");
  }
  const quarter = str.substring(0, 1);
  const year = str.substring(1, 3);
  const quarterIndex = shortQuarters.indexOf(quarter.toUpperCase());
  if (quarterIndex === -1) {
    throw new Error("Invalid quarter");
  }
  return parseInt(`${year}${qtrNumToQuarter[quarterIndex + 1]}`);
};
