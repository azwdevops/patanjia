// import installed packages
import { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import styles
import "./App.scss";
// import material ui items

// import shared/global items
import PrivateRoute from "./shared/PrivateRoute";
// import components/pages
import Header from "./components/common/Header/Header";
// import Footer from "./components/common/Footer";
import Home from "./pages/Home/Home";
import Sidebar from "./components/common/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import ActivateAccount from "./pages/ActivateAccount/ActivateAccount";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";
import MaintainTitles from "./pages/Staff/MaintainTitles/MaintainTitles";
// import SearchTitle from "./pages/Valuer/SearchTitle/SearchTitle";
// import redux API
import { get_user } from "./redux/actions/auth";

function App(props) {
  const session_cookie = localStorage.getItem("session_cookie");

  const { getUser } = props;
  const { profile_type } = props;

  useEffect(() => {
    // get user on page refresh
    if (session_cookie) {
      getUser();
    }
  }, [getUser, session_cookie]);

  return (
    <div id="body-pd">
      <Router>
        <Header />
        <Sidebar />
        <Routes>
          {/* unauthenticated routes */}
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/user/password-reset/:password_token/"
            element={<ResetPasswordConfirm />}
          />
          <Route
            exact
            path="/user/activate/:activation_token/"
            element={<ActivateAccount />}
          />
          {/* authenticated routes */}
          <Route exact path="/" element={<PrivateRoute />}>
            {profile_type === "Staff" && (
              <Route
                exact
                path="/staff/maintain-titles/"
                element={<MaintainTitles />}
              />
            )}
            {["Staff", "Valuer"].includes(profile_type) && (
              <>
                {/* <Route
              exact
              path="/valuer/search-title/"
              element={<SearchTitle />}
            /> */}
              </>
            )}
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/dashboard/" element={<Dashboard />} />
          </Route>
          <Route element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    profile_type: state.auth.user?.profile_type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(get_user()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
