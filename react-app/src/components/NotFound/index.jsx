import React from "react";

import { useSelector } from "react-redux";

function NotFound() {
	const sessionUser = useSelector((state) => state.session.user);

	return <div>404 There's nothing here</div>;
}

export default NotFound;
