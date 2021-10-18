// import installed packages
// import styles

// import material ui items

// import shared/global items

// import components/pages

// import redux API

const ValuerLinks = ({ Link, pathname }) => {
  return (
    <>
      <Link
        to="/valuer/search-title/"
        className={
          `${pathname}` === "/valuer/search-title/"
            ? "nav__link active"
            : "nav__link"
        }
      >
        <i className="bx bx-search"></i>
        <span className="nav__name">Search</span>
      </Link>
    </>
  );
};

export default ValuerLinks;
