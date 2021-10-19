// import installed packages
import { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import styles
import "./App.css";
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
        <Switch>
          {/* unauthenticated routes */}
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/user/password-reset/:password_token/"
            component={ResetPasswordConfirm}
          />
          <Route
            exact
            path="/user/activate/:activation_token/"
            component={ActivateAccount}
          />
          {/* authenticated routes */}
          {profile_type === "Staff" && (
            <PrivateRoute
              exact
              path="/staff/maintain-titles/"
              component={MaintainTitles}
            />
          )}
          {["Staff", "Valuer"].includes(profile_type) && (
            <>
              {/* <PrivateRoute
              exact
              path="/valuer/search-title/"
              component={SearchTitle}
            /> */}
            </>
          )}
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/dashboard/" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
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
