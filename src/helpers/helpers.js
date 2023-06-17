export const MONTHS = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

export const parseDateFromAniListApi = ({ year, month, day }) => {
  let date = "";
  if (month) date += MONTHS[month] + " ";
  if (day) date += day + ", ";
  if (year) date += year;
  return date || "";
};

export const renderArrayOfStringWithCommas = (genres) => {
  return genres.map((genre, i) => {
    return (
      <span key={genre}>
        {genre}
        {i === genres.length - 1 ? "" : ", "}
      </span>
    );
  });
};
