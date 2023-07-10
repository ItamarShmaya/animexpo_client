import "./PageNav.css";
import { PageNavProps } from "./PageNav.types";
import { JSX } from "react";

const PageNav = ({
  pageNumber,
  onPrevClick,
  onNextClick,
  mid = false,
  left = false,
  hasNextPage,
}: PageNavProps): JSX.Element => {
  return (
    <div
      className={`page-nav ${mid && "page-nav-mid"} ${left && "page-nav-left"}`}
    >
      {pageNumber && pageNumber > 1 && (
        <span onClick={onPrevClick}>
          <i className="fa-solid fa-chevron-left"></i> Prev
        </span>
      )}
      {hasNextPage && (
        <span onClick={onNextClick}>
          Next <i className="fa-solid fa-chevron-right"></i>
        </span>
      )}
    </div>
  );
};

export default PageNav;
