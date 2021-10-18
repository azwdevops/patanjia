// import installed packages
import React, { useState } from "react";
import { connect } from "react-redux";
// import styles
// import material ui items
import CircularProgress from "@material-ui/core/CircularProgress";
// import shared/global items
import { ifEmpty, resetFormValues } from "../../../../shared/sharedFunctions";
// import components/pages
import MediumDialog from "../../../../components/common/MediumDialog";

// import redux API
import { add_new_title } from "../../../../redux/actions/search";
import { START_LOADING } from "../../../../redux/actions/types";

const AddTitle = (props) => {
  const { openAddTitle, loading, userId } = props;
  const { setOpenAddTitle, addNewTitle, startLoading } = props;
  const [titleDetails, setTitleDetails] = useState({
    title: "",
    lat: "",
    lon: "",
  });

  const handleChange = (e) => {
    setTitleDetails({ ...titleDetails, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    resetFormValues(titleDetails);
  };
  const handleClose = () => {
    resetForm();
    setOpenAddTitle(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ifEmpty(titleDetails)) {
      return window.alert();
    }
    startLoading();
    addNewTitle(userId, { ...titleDetails }, resetForm);
  };

  const { title, lat, lon } = titleDetails;

  return (
    <MediumDialog isOpen={openAddTitle} maxWidth="700px">
      <form
        className="dialog"
        onSubmit={handleSubmit}
        id={loading ? "formSubmitting" : ""}
      >
        <h3>Enter title details</h3>
        <div className="dialog__rowSingleItem">
          <label htmlFor="">Title No:</label>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={title}
          />
        </div>
        {loading && (
          <CircularProgress
            style={{ position: "absolute", marginLeft: "43%" }}
          />
        )}
        <div className="dialog__row">
          <span>
            <label htmlFor="">Latitude</label>
            <input type="text" name="lat" onChange={handleChange} value={lat} />
          </span>
          <span>
            <label htmlFor="">Longitude</label>
            <input type="text" name="lon" onChange={handleChange} value={lon} />
          </span>
        </div>
        <div className="form__Buttons">
          <button type="button" onClick={handleClose}>
            Close
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </MediumDialog>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.shared?.loading,
    userId: state.auth?.user?.id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNewTitle: (userId, body, resetForm) =>
      dispatch(add_new_title(userId, body, resetForm)),
    startLoading: () => dispatch({ type: START_LOADING }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTitle);
