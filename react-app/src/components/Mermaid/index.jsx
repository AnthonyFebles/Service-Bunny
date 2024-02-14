import React from "react";
import mermaid from "mermaid";

mermaid.initialize({
	startOnLoad: true,
	securityLevel: "loose",
	fontFamily: "monospace",
	gantt: {
		barHeight: 40,
		barGap: 15,
		sectionFontSize: 20,
		leftPadding: 200,
		numberSectionStyles: 2,
        
	},
});


export default class Mermaid extends React.Component {
 componentDidMount() {
 mermaid.contentLoaded();
 }
 render() {
 return <div className="mermaid">{this.props.chart}</div>;
 }
}