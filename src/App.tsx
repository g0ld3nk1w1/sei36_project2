import { useState } from "react";
import "./App.css";
import { LandingTopContainer } from "./Components/LandingTopContainer";
import { SearchResultsContainer } from "./Components/SearchResultsContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Detail } from "./Components/Detail";
import { SearchObjectType } from "./Data/Constants";

function App() {
  const [searchObj, setSearchObj] = useState({
    clickSearch: false,
    country: "",
    dateFrom: "",
    dateTo: "",
    keywords: ""
  } as SearchObjectType);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <LandingTopContainer
                  handleSearch={setSearchObj}
                  searchObject={searchObj}
                />
                <SearchResultsContainer searchObject={searchObj} />
              </>
            }
          />
          <Route path="/details/:eventID" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
