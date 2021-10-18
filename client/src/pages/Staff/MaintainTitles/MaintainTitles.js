// import installed packages
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// import styles
// import material ui items
// import shared/global items
// import components/pages
import AddTitle from "./components/AddTitle";
// import redux API
import { get_all_titles } from "../../../redux/actions/search";
import { START_LOADING } from "../../../redux/actions/types";

const MaintainTitles = (props) => {
  const { titlesList, userId, startLoading, getAllTitles } = props;
  const [openAddTitle, setOpenAddTitle] = useState(false);

  useEffect(() => {
    if (userId && titlesList?.length === 0) {
      startLoading();
      getAllTitles(userId);
    }
  }, [titlesList?.length, startLoading, getAllTitles, userId]);

  const openAddTitleForm = () => {
    setOpenAddTitle(true);
  };
  return (
    <>
      <div className="table__parent">
        <div className="table__parentHeader">
          <h3>Maintain titles</h3>
          <button
            type="button"
            className="add__button"
            onClick={openAddTitleForm}
          >
            Add Title
          </button>
        </div>
        <table className="table__listing">
          {titlesList?.length > 0 ? (
            <>
              <tr className="table__listingHeader">
                <th>Title No</th>
                <th>Lat</th>
                <th>Lon</th>
              </tr>
              {titlesList?.map((title) => (
                <tr className="table__listingItem" key={title?.id}>
                  <td>{title?.title}</td>
                  <td>{title?.lat}</td>
                  <td>{title?.lon}</td>
                </tr>
              ))}
            </>
          ) : (
            <h4 className="not__available">No titles available</h4>
          )}
        </table>
      </div>
      {openAddTitle && (
        <AddTitle
          openAddTitle={openAddTitle}
          setOpenAddTitle={setOpenAddTitle}
        />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    titlesList: state.search?.titlesList,
    userId: state.auth?.user?.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTitles: (userId) => dispatch(get_all_titles(userId)),
    startLoading: () => dispatch({ type: START_LOADING }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MaintainTitles);
