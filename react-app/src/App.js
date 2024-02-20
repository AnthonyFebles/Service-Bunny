import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import AllStores from "./components/StoreTester";
import HomePage from "./components/HomePage"
import TechInfoModal from "./components/TechInfoModal";
import JobDetails from "./components/JobDetails";
import NotFound from "./components/NotFound";
import LocationDetails from "./components/LocationDetails";
import LandingPage from "./components/LandingPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Routes>
					<Route path="/login" element={<LoginFormPage />}></Route>
					<Route path="/signup" element={<SignupFormPage />}></Route>
					<Route path="/jobs/:jobId" element={<JobDetails />}></Route>
					<Route path="locations/:locationId" element={<LocationDetails/>}></Route>
					<Route path="/home" element={<HomePage />}></Route>
					<Route path="/" element={<LandingPage />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			)}
		</>
	);
}

export default App;
