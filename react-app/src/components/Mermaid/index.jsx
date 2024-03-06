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

	async drawDiagram(chart) {
	let element = document.querySelector("#mermaid-container");
	//console.log(element, "element")
    const graphDefinition = chart
	//console.log(chart, "chart")
    const { svg } = await mermaid.render("mermaid-chart", graphDefinition);
	//console.log(svg, "svg")
    element.innerHTML = svg;
	}

	async componentDidUpdate(prevProps, prevState) {
		//console.log("the state has not changed comp", prevProps.chart);
		// console.log("the current state has not changed comp", this.props.chart);
		if (prevProps.chart !== this.props.chart) {
			//console.log("the state has changed comp")
			// document
			// 	.getElementById("mermaid-chart")
			// 	.removeAttribute("data-processed");

			

			 // Example of using the render function
  

  			await this.drawDiagram(this.props.chart);
  
		}
	}

	render() {
		return (
			<div className="mermaid" id="mermaid-chart">
				{this.state.chart}
			</div>
		);
	}
}
