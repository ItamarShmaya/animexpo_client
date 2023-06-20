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
  if (day) date += day;
  if (year) date += ", " + year;
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
  console.log(process.env.NODE_ENV);
  const rules =
    process.env.NODE_ENV === "development"
      ? [
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
        ]
      : [
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
          [/anilist.co/g, "animexpoclient.onrender.com"],
          [/\[([^\]]+)\]\(([^)]+)\)/g, "<a href='$2' target='_blank'>$1</a>"],
        ];

  rules.forEach(([rule, template]) => {
    parsedString = parsedString.replace(rule, template);
  });

  return parsedString;
};
