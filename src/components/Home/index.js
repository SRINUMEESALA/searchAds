import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Add from "../Add";
import { Button, Placeholder, Card } from "semantic-ui-react";
import { AiOutlineSearch } from "react-icons/ai";
import "./index.css";

import * as React from "react";

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

    // const url = `http://localhost:4000/getAds?search=${searchInput}`;
    const url = `http://localhost:4000/get-ads?search=${searchInput}`;
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setAdsList(result.data);
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
          <div class="input-group w-25 mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Type here and Click Enter"
              aria-label="Username"
              value={searchInput}
              aria-describedby="basic-addon1"
              onChange={onChangeInput}
              onKeyDown={onClickEnterSearch}
            />
            <div class="input-group-prepend p-0 ">
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
    <div className="row mt-5 p-0">
      {Array.from({ length: 20 }).map(() => (
        <div
          className="col-3 p-0 d-flex justify-content-center mb-4"
          key={uuidv4()}
          style={{ height: "45vh" }}>
          <Card key="ajsdfh" className="pb-4">
            <Placeholder>
              <div className="" style={{ height: "200px" }}>
                <Placeholder.Image square />
              </div>
            </Placeholder>
            <Card.Content>
              <Placeholder>
                <Placeholder.Header>
                  <Placeholder.Line length="long" />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line length="short" />
                </Placeholder.Paragraph>

                <Placeholder.Paragraph>
                  <div className="d-flex justify-content-start">
                    <div className="" style={{ width: "80%" }}>
                      <Placeholder.Line length="short" />
                    </div>
                  </div>
                </Placeholder.Paragraph>
              </Placeholder>
            </Card.Content>
            <Card.Content extra>
              <Button disabled={true} className="w-100">
                Book Now
              </Button>
            </Card.Content>
          </Card>
        </div>
      ))}
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
