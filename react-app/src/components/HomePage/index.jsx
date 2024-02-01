import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../../store/jobs";
import { getLocations } from "../../store/locations";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import { getBookings } from "../../store/bookings";
import { getManagers } from "../../store/manager";
import { useNavigate } from "react-router-dom";
import ManagerHome from "../ManagerHome";

const HomePage = () => {
    const dispatch = useDispatch()

    const sessionUser = useSelector((state) => state.session.user)
    const navigate = useNavigate();

    if (!sessionUser) return <>{navigate("/")}</>;

    switch(sessionUser.role){
        case "Manager" :
            return (<div><ManagerHome/></div>)
        case "Technician" :
            return (<div>Technician</div>)
        case "Customer" :
            return (<div>Customer</div>)
    }

    return (<div>Loading...</div>)

}

export default HomePage