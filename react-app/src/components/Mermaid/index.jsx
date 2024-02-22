import React from "react";
import mermaid from "mermaid";




export default class Mermaid extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chart: props.chart,
		};
		mermaid.initialize({
			startOnLoad: true,
			securityLevel: "loose",
			gantt: {
				barHeight: 40,
				barGap: 15,
				sectionFontSize: 20,
				leftPadding: 200,
				numberSectionStyles: 2,
				fontSize: 15,
			},
		});
	}
	

	componentDidMount() {
        //console.log("comp mounted")
		mermaid.contentLoaded();
	}

	componentDidUpdate(prevProps, prevState) {
         //console.log("the state has not changed comp", prevProps.chart);
		// console.log("the current state has not changed comp", this.props.chart);
		if (prevProps.chart !== this.props.chart) {
            //console.log("the state has changed comp")
			document
				.getElementById("mermaid-chart")
				.removeAttribute("data-processed");
			mermaid.initialize({
				startOnLoad: true,
				securityLevel: "loose",
				gantt: {
					barHeight: 40,
					barGap: 15,
					sectionFontSize: 20,
					leftPadding: 200,
					numberSectionStyles: 2,
					fontSize: 15,
				},
			});
			mermaid.contentLoaded();
		}
	}
	render() {
		return <div className="mermaid" id="mermaid-chart">{this.state.chart}</div>;
	}
}