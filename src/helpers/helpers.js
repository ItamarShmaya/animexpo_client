import { MediaFormat, MediaSeason } from "../apis/aniList/types";

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

export const getCurrentSeason = (month) => {
  month = month + 1;
  if (month >= 1 && month <= 3) return MediaSeason.winter;
  if (month >= 4 && month <= 6) return MediaSeason.spring;
  if (month >= 7 && month <= 9) return MediaSeason.summer;
  if (month >= 10 && month <= 12) return MediaSeason.fall;
};

export const getNextSeason = (month) => {
  month = month + 1;
  if (month >= 1 && month <= 3) return MediaSeason.spring;
  if (month >= 4 && month <= 6) return MediaSeason.summer;
  if (month >= 7 && month <= 9) return MediaSeason.fall;
  if (month >= 10 && month <= 12) return MediaSeason.winter;
};

export const getFuzzyDateForSeason = (season, year) => {
  if (season === MediaSeason.winter)
    return { start: `${year}0100`, end: `${year}0300` };
  if (season === MediaSeason.spring)
    return { start: `${year}0400`, end: `${year}0600` };
  if (season === MediaSeason.summer)
    return { start: `${year}0700`, end: `${year}0900` };
  if (season === MediaSeason.fall)
    return { start: `${year}1000`, end: `${year}1200` };
};

export const parseDateFromAniListApi = ({ year, month, day }) => {
  let date = "";
  if (month && day && year) date += MONTHS[month] + " " + day + ", " + year;
  else if (month && day && !year) date += MONTHS[month] + " " + day;
  else if (!month && !day && year) date += year;
  else if (year) date += year;
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

export const markdownParser = (string) => {
  let parsedString = string;
  const rules =
    process.env.NODE_ENV === "production"
      ? [
          [/&#039;/g, "'"],
          [/#{6}\s?([^\n]+)/g, "<h6>$1</h6>"],
          [/#{5}\s?([^\n]+)/g, "<h5>$1</h5>"],
          [/#{4}\s?([^\n]+)/g, "<h4>$1</h4>"],
          [/#{3}\s?([^\n]+)/g, "<h3>$1</h3>"],
          [/#{2}\s?([^\n]+)/g, "<h2>$1</h2>"],
          [/#{1}\s?([^\n]+)/g, "<h1>$1</h1>"],
          [/__(.*)__/g, "<strong>$1</strong>"],
          [/_(.*)_/g, "<em>$1</em>"],
          [
            /~!(.*?)!~/gs,
            "<p class='spoiler-tag'><span class='show-spoiler'>*Show Spoiler</span><span class='spoiler-content'>$1</span><span class='hide-spoiler'>*Hide Spoiler</span></p>",
          ],
          [/anilist.co/g, "animexpo.onrender.com"],
          [/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2' target='_blank'>$1</a>"],
        ]
      : [
          [/&#039;/g, "'"],
          [(/#{6}\s?([^\n]+)/g, "<h6>$1</h6>")],
          [/#{5}\s?([^\n]+)/g, "<h5>$1</h5>"],
          [/#{4}\s?([^\n]+)/g, "<h4>$1</h4>"],
          [/#{3}\s?([^\n]+)/g, "<h3>$1</h3>"],
          [/#{2}\s?([^\n]+)/g, "<h2>$1</h2>"],
          [/#{1}\s?([^\n]+)/g, "<h1>$1</h1>"],
          [/__(.*)__/g, "<strong>$1</strong>"],
          [/_(.*)_/g, "<em>$1</em>"],
          [
            /~!(.*?)!~/gs,
            "<p class='spoiler-tag'><span class='show-spoiler'>*Show Spoiler</span><span class='spoiler-content'>$1</span><span class='hide-spoiler'>*Hide Spoiler</span></p>",
          ],
          [/https:\/\/anilist.co/g, "http://localhost:3000"],
          [/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2' target='_blank'>$1</a>"],
        ];

  rules.forEach(([rule, template]) => {
    parsedString = parsedString.replace(rule, template);
  });

  return parsedString;
};

export const getYearsFrom = (from, desc) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  if (desc.toLowerCase() === "desc") {
    for (let i = 0; i <= currentYear + 1 - from; i++) {
      years.push(currentYear + 1 - i);
    }
  } else {
    for (let i = 0; i <= currentYear + 1 - from; i++) {
      years.push(1940 + i);
    }
  }
  return years;
};

export const seasons = ["Winter", "Spring", "Summer", "Fall"];

export const animeFormats = [
  "TV",
  "TV Short",
  "Movie",
  "Special",
  "OVA",
  "ONA",
  "Music",
];

export const mangaFormats = ["Manga", "Novel", "One Shot"];

export const convertToArrayOfMediaFormats = (formatsArray) => {
  return formatsArray.map((format) => {
    const lowerCaseFormat = format?.toLowerCase();
    return MediaFormat[lowerCaseFormat === "tv show" ? "tv" : lowerCaseFormat];
  });
};

export const capitalizeWord = (string) => {
  const lowerCaseStr = string?.toString().toLowerCase();
  return lowerCaseStr
    ? lowerCaseStr[0]?.toUpperCase() + lowerCaseStr.slice(1)
    : string;
};

export const capitalizeSentence = (string) => {
  const stringArr = string.split(" ");
  let capitalizedStr = "";
  for (let i = 0; i < stringArr.length; i++) {
    capitalizedStr +=
      stringArr[i][0]?.toUpperCase() + stringArr.slice(1)?.toLowerCase() + " ";
  }
  return capitalizedStr?.trim();
};

export const capitalizeSnakeCase = (string) => {
  const stringArr = string.split("_");
  let capitalizedStr = "";
  for (let i = 0; i < stringArr.length; i++) {
    capitalizedStr +=
      stringArr[i][0]?.toUpperCase() +
      stringArr[i].slice(1)?.toLowerCase() +
      " ";
  }
  return capitalizedStr?.trim();
};

export const formatsStringRender = (format) => {
  const lowerCaseFormat = format?.toLowerCase();
  if (lowerCaseFormat === "tv") return "TV Show";
  if (lowerCaseFormat === "ova") return format;
  if (lowerCaseFormat === "ona") return format;
  if (lowerCaseFormat === "novel") return "Light Novel";
  if (lowerCaseFormat === "one_shot") return "One Shot";
  return capitalizeWord(format);
};

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
export const currentSeasonYear = currentDate.getFullYear();
export const currentSeason = getCurrentSeason(currentMonth);
export const nextSeason = getNextSeason(currentMonth);
export const nextSeasonYear =
  nextSeason === MediaSeason.spring ? currentSeasonYear + 1 : currentSeasonYear;

export const numberWithCommas = (number) => {
  const stringNumber = number.toString();
  if (stringNumber.length <= 3) return number;

  let firstComma;
  if (stringNumber.length % 3 === 0) firstComma = 2;
  if (stringNumber.length % 3 === 1) firstComma = 0;
  if (stringNumber.length % 3 === 2) firstComma = 1;

  let numberWithCommas = "";

  for (let i = 0; i < stringNumber.length; i++) {
    if (i === stringNumber.length - 1) numberWithCommas += stringNumber[i];
    else {
      if (i < firstComma) numberWithCommas += stringNumber[i];
      else if (i === firstComma) numberWithCommas += stringNumber[i] + ",";
      else {
        if (i % 3 === firstComma) numberWithCommas += stringNumber[i] + ",";
        else numberWithCommas += stringNumber[i];
      }
    }
  }
  return numberWithCommas;
};

export const searchParamsToObject = (searchParams) => {
  const paramsObj = {};
  for (let [paramKey, value] of searchParams) {
    paramsObj[paramKey]
      ? (paramsObj[paramKey] = [...paramsObj[paramKey], value])
      : (paramsObj[paramKey] = [value]);
  }
  return paramsObj;
};