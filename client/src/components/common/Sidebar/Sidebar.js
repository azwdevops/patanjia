// import installed packages
import { Link, useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";

// import styles
import "./Sidebar.scss";
// import material ui items

// import shared/global items

// import components/pages

// import redux API
import { logout } from "../../../redux/actions/auth";
import StaffLinks from "./Links/StaffLinks";
import ValuerLinks from "./Links/ValuerLinks";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { logoutUser } = props;
  const { loggedIn, profile_type } = props;

  return (
    <div className="left-navbar" id="nav-bar">
      <nav className="nav">
        <Link to="" className="nav__logo">
          <i className="bx bx-layer nav__logo-icon"></i>
          <span className="nav__logo-name">AZW</span>
        </Link>
        <div className="nav__list">
          {/* unprotected links */}
          <>
            <Link
              to="/"
              className={
                `${pathname}` === "/" ? "nav__link active" : "nav__link"
              }
            >
              <i class="bx bx-home"></i>
              <span className="nav__name">Home</span>
            </Link>
          </>
          {/* protected links */}
          {loggedIn && (
            <>
              {/* STAFF LINKS */}
              {profile_type === "Staff" && (
                <StaffLinks pathname={pathname} Link={Link} />
              )}
              {/* VALUER LINKS */}
              {["Staff", "Valuer"].includes(profile_type) && (
                <ValuerLinks pathname={pathname} Link={Link} />
              )}
              <Link
                to="/dashboard/"
                className={
                  `${pathname}` === "/dashboard/"
                    ? "nav__link active"
                    : "nav__link"
                }
              >
                <i className="bx bx-grid-alt nav__icon"></i>
                <span className="nav__name">Dashboard</span>
              </Link>
              <Link
                to="/profile/"
                className={
                  `${pathname}` === "/profile/"
                    ? "nav__link active"
                    : "nav__link"
                }
              >
                <i class="bx bx-user nav__icon"></i>
                <span className="nav__name">Profile</span>
              </Link>
              <Link
                to=""
                className="nav__link"
                onClick={() => logoutUser(navigate)}
              >
                <i className="bx bx-log-out-circle"></i>
                <span className="nav__name">Logout</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth?.loggedIn,
    profile_type: state.auth.user?.profile_type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: (navigate) => dispatch(logout(navigate)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
