import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Add from "../Add";
import { Button, Placeholder, Card } from "semantic-ui-react";
import { AiOutlineSearch } from "react-icons/ai";
import "./index.css";

import * as React from "react";
import axios from "axios";
import { Skeleton } from "@mui/material";

export const apiStatusConstants = {
  fail: "Failed",
  success: "Successful",
  load: "Loading",
  initial: "inital",
};
const Home = () => {
  const [adsList, setAdsList] = useState([{}]);
  const [searchInput, setSearchInput] = useState("");
  const [getAdsApiStatus, setGetAdsApiStatus] = useState(
    apiStatusConstants.initial
  );

  useEffect(() => {
    getAds();
  }, []);

  const getAds = async () => {
    setGetAdsApiStatus(apiStatusConstants.load);
    try {
      const result = await axios(`/get-ads?search=${searchInput}`);
      setAdsList(result.data.data);
      setGetAdsApiStatus(apiStatusConstants.success);
    } catch (error) {
      console.log("Something went wrong in ads api call", error);
      setGetAdsApiStatus(apiStatusConstants.fail);
    }
  };

  const onChangeInput = (event) => {
    if (event.target.value === "") {
      getAds();
    }
    setSearchInput(event.target.value);
  };

  const onClickEnterSearch = (event) => {
    if (event.key === "Enter") {
      getAds();
    }
  };

  const renderSuccessView = () => (
    <div className="d-flex justify-content-center min-vh-100">
      <div className=" mt-3 w-75">
        <div className="d-flex justify-content-between mb-3">
          <h1 className="h2 mb-3 font-weight-bold">Available Advertisements</h1>
          <div className="input-group w-25 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Type here and Click Enter"
              aria-label="Username"
              value={searchInput}
              aria-describedby="basic-addon1"
              onChange={onChangeInput}
              onKeyDown={onClickEnterSearch}
            />
            <div className="input-group-prepend p-0 ">
              <AiOutlineSearch className="h3 m-0 p-0 pl-1" />
            </div>
          </div>
        </div>

        {adsList.length !== 0 ? (
          <ul className="list-unstyled d-flex row ">
            {adsList.map((obj) => (
              <Add key={uuidv4()} eachItem={obj} />
            ))}
          </ul>
        ) : (
          <div className="text-center">
            <img
              className=""
              alt=""
              src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-2506.jpg?size=626&ext=jpg&uid=R96247835&ga=GA1.1.2024764164.1678773257&semt=ais"
            />
            <h1 className="text-secondary">No match Found!</h1>
          </div>
        )}
      </div>
    </div>
  );

  const renderFailureView = () => (
    <div className="failview min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div>
        <div className="text-center">
          <img
            src="https://img.freepik.com/premium-vector/administrators-fixing-computer-problems-tiny-male-worker-repair-service-with-wrench-flat-vector-illustration-maintenance-tech-support-pc-concept-banner-website-design-landing-web-page_179970-7362.jpg?w=1060"
            alt="rooms failure"
            className="sizeFailure w-50"
          />
        </div>
        <h1 className="text-center">Something Went Wrong.</h1>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => getAds()}>
            Try Again
          </button>
        </div>
      </div>
    </div>
  );

  const renderLoadingView = () => (
    <div className="d-flex justify-content-center min-vh-100">
      <div className=" mt-3 w-75">
        <div className="row mt-5 p-0">
          {Array.from({ length: 20 }).map(() => (
            <div
              className="col-4 p-0 d-flex justify-content-center mb-4 p-3"
              key={uuidv4()}
              style={{ height: "45vh" }}>
              <Card key="ajsdfh" className="pb-4 p-2">
                <Placeholder>
                  <div className="" style={{ height: "240px" }}>
                    <Placeholder.Image square />
                  </div>
                </Placeholder>
                <Skeleton variant="rectangular" height={20} className="mt-3" />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUi = () => {
    switch (getAdsApiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.fail:
        return renderFailureView();
      case apiStatusConstants.load:
        return renderLoadingView();
      default:
        return null;
    }
  };

  return <>{renderUi()}</>;
};

export default Home;
