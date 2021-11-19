// import installed packages
import { useState } from "react";
import { connect } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
// import styles
import "./ActivateAccount/ActivateAccount.scss";
// import material ui items
import CircularProgress from "@material-ui/core/CircularProgress";
// import shared/global items
import { ifEmpty, resetFormValues } from "../shared/sharedFunctions";

// import components/pages
import MinDialog from "../components/common/MinDialog";

// import redux API
import {
  CLOSE_PASSWORD_RESET_CONFIRM,
  OPEN_PASSWORD_RESET_CONFIRM,
  START_LOADING,
} from "../redux/actions/types";
import { set_password } from "../redux/actions/auth";

const ResetPasswordConfirm = (props) => {
  const navigate = useNavigate();
  const { password_token } = useParams();
  const { loading, resetPasswordConfirmForm } = props; // extract state from props
  const { startLoading, setNewPassword, openNewPassword, closeNewPassword } =
    props; // extract dispatch actions from props
  const [newPasswords, setNewPasswords] = useState({
    new_password: "",
    confirm_password: "",
  });

  // destructure values for better code formatting
  // ########### start of destructuring #################  //
  const { new_password, confirm_password } = newPasswords;

  // ########### end of destructuring #################  //

  const resetForm = () => {
    resetFormValues(newPasswords);
  };

  const closeNewPasswordForm = () => {
    resetForm();
    closeNewPassword();
  };

  // handle change
  const handleChange = (e) =>
    setNewPasswords({ ...newPasswords, [e.target.name]: e.target.value });

  // function to submit new password
  const handleSetNewPassword = (e) => {
    e.preventDefault();
    if (ifEmpty(newPasswords)) {
      return window.alert("Both fields are required");
    }
    startLoading();

    // call the signup action creator
    setNewPassword(newPasswords, password_token, navigate);
  };

  return (
    <>
      <div className="activate__account">
        <h1>Click the button to set new password</h1>
        <button type="button" onClick={openNewPassword}>
          Set New password
        </button>
      </div>
      <MinDialog isOpen={resetPasswordConfirmForm}>
        <form className="dialog" id={loading ? "formSubmitting" : ""}>
          <h3>Enter new password</h3>
          <div className="dialog__rowSingleItem">
            <label htmlFor="">New Password</label>
            <input
              type="password"
              name="new_password"
              onChange={handleChange}
              value={new_password}
            />
          </div>
          {loading && (
            <CircularProgress
              style={{ position: "absolute", marginLeft: "43%" }}
            />
          )}
          <div className="dialog__rowSingleItem">
            <label htmlFor="">Confirm New Password</label>
            <input
              type="password"
              name="confirm_password"
              onChange={handleChange}
              value={confirm_password}
            />
          </div>
          <div className="form__Buttons">
            <button type="button" onClick={closeNewPasswordForm}>
              Close
            </button>
            <button type="submit" onClick={handleSetNewPassword}>
              Submit
            </button>
          </div>
        </form>
      </MinDialog>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.shared?.loading,
    resetPasswordConfirmForm: state.auth?.resetPasswordConfirmForm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLoading: () => dispatch({ type: START_LOADING }),
    setNewPassword: (newPasswords, password_token, history) =>
      dispatch(set_password(newPasswords, password_token, history)),
    openNewPassword: () => dispatch({ type: OPEN_PASSWORD_RESET_CONFIRM }),
    closeNewPassword: () => dispatch({ type: CLOSE_PASSWORD_RESET_CONFIRM }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordConfirm);
