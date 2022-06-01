import { useState } from "react";
import "./App.css";
import { LandingTopContainer } from "./Components/LandingTopContainer";
import { SearchResultsContainer } from "./Components/SearchResultsContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [searchObj, setSearchObj] = useState({});

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <LandingTopContainer handleSearch={setSearchObj} />{" "}
                <SearchResultsContainer searchObject={searchObj} />{" "}
              </>
            }
          />
          <Route path="/details/:eventID" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
