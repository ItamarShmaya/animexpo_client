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
export const profileCarouselResponsive = [
  {
    itemsToShow: 9,
    itemsToScroll: 1,
    maxWidth: 1150,
  },
  {
    itemsToShow: 8,
    itemsToScroll: 1,
    maxWidth: 1050,
  },
  {
    itemsToShow: 7,
    itemsToScroll: 1,
    maxWidth: 950,
  },
  {
    itemsToShow: 6,
    itemsToScroll: 1,
    maxWidth: 900,
  },
  {
    itemsToShow: 5,
    itemsToScroll: 1,
    maxWidth: 800,
  },
  {
    itemsToShow: 4,
    itemsToScroll: 1,
    maxWidth: 700,
  },
];
