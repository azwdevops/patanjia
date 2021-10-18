// import installed packages
// import styles

// import material ui items

// import shared/global items

// import components/pages

// import redux API

const StaffLinks = ({ Link, pathname }) => {
  return (
    <>
      <Link
        to="/staff/maintain-titles/"
        className={
          `${pathname}` === "/staff/maintain-titles/"
            ? "nav__link active"
            : "nav__link"
        }
      >
        <i className="bx bxs-landscape"></i>
        <span className="nav__name">Titles</span>
      </Link>
    </>
  );
};

export default StaffLinks;
