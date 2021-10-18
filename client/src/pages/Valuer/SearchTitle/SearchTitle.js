// import installed packages
import React, { useState } from "react";
import { connect } from "react-redux";
// import styles
import "./SearchTitle.css";
// import material ui items
import CirculaProgress from "@material-ui/core/CircularProgress";
// import shared/global items
import API from "../../../shared/axios";
// import components/pages
// import redux API
import { START_LOADING, STOP_LOADING } from "../../../redux/actions/types";
import { showError } from "../../../redux/actions/shared";

const SearchTitle = (props) => {
  const { startLoading, loading, userId, stopLoading } = props;
  const [titleNumber, setTitleNumber] = useState("");
  const [searchedTitle, setSearchedTitle] = useState({
    title: "",
    lat: "",
    lon: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (titleNumber.trim() === "") {
      return window.alert("Input valid title number");
    }
    startLoading();
    await API.post(`/api/search/valuer-get-title/${userId}/`, { titleNumber })
      .then((res) => {
        setSearchedTitle(res.data?.title_data);
      })
      .catch((err) => showError(err))
      .finally(() => stopLoading());
  };

  return (
    <div className="table__parent" id={loading ? "pageSubmitting" : ""}>
      <div className="table__parentHeader">
        <h3>Enter title number</h3>
        {loading && <CirculaProgress style={{ position: "absolute" }} />}
        <br />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name=""
            className="search__input"
            onChange={(e) => setTitleNumber(e.target.value)}
            value={titleNumber}
          />
          <br />
          <button type="submit" className="add__button search__button">
            Search
          </button>
        </form>
        <br />
        {searchedTitle?.title !== "" && (
          <>
            <p>{searchedTitle?.title} - view directions</p>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth?.user?.id,
    loading: state.shared?.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLoading: () => dispatch({ type: START_LOADING }),
    stopLoading: () => dispatch({ type: STOP_LOADING }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchTitle);
