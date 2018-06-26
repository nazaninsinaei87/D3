// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.

// Define the width and height of svg
var svgHeight = 600;
var svgWidth = 600;

// Define the margins to chart
var chartMargin = {
	top: 20,
	bottom: 60,
	left: 50,
	right: 40
};

// Define the chart width and height
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;

var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Define the svg variable

var svg = d3.select("#scatter")
			.append("svg")
			.attr("width",svgWidth)
			.attr("height", svgHeight);	

var chartGroup = svg.append("g")
					.attr("transform",`translate(${chartMargin.left}, ${chartMargin.top})`)
					
// Load the csv data

d3.csv("data.csv", function(error, data) {
	if (error) return console.log(error);
	console.log(data);
	
//Format the data	
	data.forEach(d => {
		d.poverty = +d.poverty;
		d.healthcare = +d.healthcare;
	});
//Create Scales
	
	var yScale = d3.scaleLinear()
					.domain(d3.extent(data, d => d.healthcare))
					.range([chartHeight, 0]);
	var xScale = d3.scaleLinear()
					.domain(d3.extent(data, d => d.poverty))
					.range([0, chartWidth]);

//Create Axes

	var xAxis = d3.axisBottom(xScale);
	var yAxis = d3.axisLeft(yScale);
	
//Append the axes for chartGroup

	chartGroup.append("g")
				.call(xAxis)
				.attr("transform",`translate(0, ${chartHeight})`);
	chartGroup.append("g")
				.call(yAxis);
				
	chartGroup.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
			.attr("cx", d => xScale(d.poverty))
			.attr("cy", d => yScale(d.healthcare))
			.attr("r", 8)
			.style("fill", "lightblue")
			.select("text")
			.data(data)
			.enter()
			.append("text")
			.attr("x", d => xScale(d.poverty))
			.attr("y", d => yScale(d.healthcare))
			.text(d => d.abbr)
			.attr("text-anchor","middle")
			.attr("fill","white")
			.attr("font-size","6px");
			
	chartGroup.append("text")
    .attr("transform",`translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 20})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
	.attr("font-family", "sans-serif")
    .text("In Poverty(%)");
	
	chartGroup.append("text")
    .attr("transform",`translate(-30, ${chartHeight / 2})rotate(-90)`)
    .attr("text-anchor", "middle")
	.attr("font-family", "sans-serif")
    .attr("font-size", "16px")
    .text("Lacks Healthcare (%)");
});
