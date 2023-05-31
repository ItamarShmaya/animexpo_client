export const profileCarouselForwardButton = {
  style: {
    alignSelf: "center",
    background: "black",
    border: "none",
    borderRadius: "50%",
    color: "white",
    cursor: "pointer",
    fontSize: "20px",
    height: 30,
    lineHeight: 1,
    textAlign: "center",
    width: 30,
  },
  children: <span>{`>`}</span>,
  className: "carouselForwardArrow",
};

export const profileCarouselBackwardButton = {
  style: {
    alignSelf: "center",
    background: "black",
    border: "none",
    borderRadius: "50%",
    color: "white",
    cursor: "pointer",
    fontSize: "20px",
    height: 30,
    lineHeight: 1,
    textAlign: "center",
    width: 30,
  },
  children: <span>{`<`}</span>,
  className: "carouselBackArrow",
};

export const profileCarouselItemsListProps = {
  style: {},
};

// export const profileCarouselContainerProps = {
//   className: "slideContainer",
//   // style: {
//   //   justifyContent: "flex-start",
//   // },
// };
export const profileCarouselResponsive = [
  {
    itemsToShow: 11,
    itemsToScroll: 1,
    maxWidth: 1250,
  },
  {
    itemsToShow: 10,
    itemsToScroll: 1,
    maxWidth: 1200,
  },
  {
    itemsToShow: 9,
    itemsToScroll: 1,
    maxWidth: 1100,
  },
  {
    itemsToShow: 8,
    itemsToScroll: 1,
    maxWidth: 1050,
  },
  {
    itemsToShow: 7,
    itemsToScroll: 1,
    maxWidth: 900,
  },
  {
    itemsToShow: 6,
    itemsToScroll: 1,
    maxWidth: 800,
  },
  {
    itemsToShow: 5,
    itemsToScroll: 1,
    maxWidth: 700,
  },
  {
    itemsToShow: 4,
    itemsToScroll: 1,
    maxWidth: 550,
  },
  {
    itemsToShow: 3,
    itemsToScroll: 1,
    maxWidth: 400,
  },
];
