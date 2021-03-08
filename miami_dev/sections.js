let dataset, svg
let salarySizeScale, salaryXScale, categoryColorScale
let simulation, nodes
let categoryLegend, salaryLegend


//Read Data, convert numerical categories into floats
//Create the initial visualisation


d3.csv("https://docs.google.com/spreadsheets/d/1LMADV7lzfx1rC6AzkrUp8uwe5XuXR8sd3KDeashPmB8/gviz/tq?tqx=out:csv&gid=0", function(d){
  return{
    class: d.class,
    rent: +d.rent,
    vacancy: +d.vacancy,
    absorbtion: +d.absorbtion,
    inventory: +d.inventory,
    underconstruction: +d.underconstruction
  };
}, function(error, rows){
if (error) throw error;
console.log(rows)
});
    
  //  setTimeout(drawInitial(), 100)
//})

 var data = [
  {
    "viewer_gender": "FEMALE",
    "viewer_age": "AGE_13_17",
    "channel_display_name": "syncopika",
    "channel_id": "T2NUI3KLGK6sDILFbzUZZg",
    "views": "3.3",
    "watch_time_minutes": "2.8"
  },
  {
    "viewer_gender": "MALE",
    "viewer_age": "AGE_13_17",
    "channel_display_name": "syncopika",
    "channel_id": "T2NUI3KLGK6sDILFbzUZZg",
    "views": "12.8",
    "watch_time_minutes": "13.5"
  },
  {
    "viewer_gender": "FEMALE",
    "viewer_age": "AGE_18_24",
    "channel_display_name": "syncopika",
    "channel_id": "T2NUI3KLGK6sDILFbzUZZg",
    "views": "7.1",
    "watch_time_minutes": "6.6"
  },
  {
    "viewer_gender": "MALE",
    "viewer_age": "AGE_18_24",
    "channel_display_name": "syncopika",
    "channel_id": "T2NUI3KLGK6sDILFbzUZZg",
    "views": "37.1",
    "watch_time_minutes": "35.8"
  },
  {
    "viewer_gender": "FEMALE",
    "viewer_age": "AGE_25_34",
    "channel_display_name": "syncopika",
    "channel_id": "T2NUI3KLGK6sDILFbzUZZg",
    "views": "2.7",
    "watch_time_minutes": "3.9"
  },
  {
    "viewer_gender": "MALE",
    "viewer_age": "AGE_25_34",
    "channel_display_name": "syncopika",
    "channel_id": "T2NUI3KLGK6sDILFbzUZZg",
    "views": "23.5",
    "watch_time_minutes": "24.7"
  },
  {
    "viewer_gender": "FEMALE",
    "viewer_age": "AGE_35_44",
    "channel_display_name": "syncopika",
    "channel_id": "T2NUI3KLGK6sDILFbzUZZg",
    "views": "1.0",
    "watch_time_minutes": "0.8"
  },
  {
    "viewer_gender": "MALE",
    "viewer_age": "AGE_35_44",
    "channel_display_name": "syncopika",
    "channel_id": "T2NUI3KLGK6sDILFbzUZZg",
    "views": "6.4",
    "watch_time_minutes": "5.0"
  },
  {
    "viewer_gender": "FEMALE",
    "viewer_age": "AGE_45_54",
    "channel_display_name": "syncopika",
    "channel_id": "T2NUI3KLGK6sDILFbzUZZg",
    "views": "0.7",
    "watch_time_minutes": "1.3"
  },
  {
    "viewer_gender": "MALE",
    "viewer_age": "AGE_45_54",
    "channel_display_name": "syncopika",
    "channel_id": "T2NUI3KLGK6sDILFbzUZZg",
    "views": "3.3",
    "watch_time_minutes": "3.4"
  },
  {
    "viewer_gender": "FEMALE",
    "viewer_age": "AGE_55_64",
    "channel_display_name": "syncopika",
    "channel_id": "T2NUI3KLGK6sDILFbzUZZg",
    "views": "0.1",
    "watch_time_minutes": "0.1"
  },
  {
    "viewer_gender": "MALE",
    "viewer_age": "AGE_55_64",
    "channel_display_name": "syncopika",
    "channel_id": "T2NUI3KLGK6sDILFbzUZZg",
    "views": "0.8",
    "watch_time_minutes": "0.7"
  },
  {
    "viewer_gender": "FEMALE",
    "viewer_age": "AGE_65_",
    "channel_display_name": "syncopika",
    "channel_id": "T2NUI3KLGK6sDILFbzUZZg",
    "views": "0.2",
    "watch_time_minutes": "0.2"
  },
  {
    "viewer_gender": "MALE",
    "viewer_age": "AGE_65_",
    "channel_display_name": "syncopika",
    "channel_id": "T2NUI3KLGK6sDILFbzUZZg",
    "views": "1.1",
    "watch_time_minutes": "1.3"
  }
];

console.log(data)

var vis = d3.select("#vis")
var margin = {top: 20, right: 20, bottom: 95, left: 50};
element = vis.node();
width = element.getBoundingClientRect().width - margin.left - margin.right,
height = element.getBoundingClientRect().height - margin.top - margin.bottom;

svg = d3
  .select("#vis")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

    const chart = svg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`);

const grp = chart
  .append("g")
  .attr("transform", `translate(-${margin.left},-${margin.top})`);

// Create scales
const yScale = d3
  .scaleLinear()
  .range([height, 0])
  .domain([0, d3.max(data, dataPoint => +dataPoint.views)]);
const xScale = d3
  .scaleLinear()
  .range([0, width])
  .domain(d3.extent(data, dataPoint => +dataPoint.watch_time_minutes));

const line = d3
  .line()
  .x(dataPoint => xScale(+dataPoint.views))
  .y(dataPoint => yScale(+dataPoint.watch_time_minutes));

// Add path
const path = grp
  .append("path")
  .attr("transform", `translate(${margin.left},0)`)
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("stroke-width", 1.5)
  .attr("d", line);

const pathLength = path.node().getTotalLength();
// D3 provides lots of transition options, have a play around here:
// https://github.com/d3/d3-transition
const transitionPath = d3
  .transition()
  .ease(d3.easeSin)
  .duration(9000);

path
  .attr("stroke-dashoffset", pathLength)
  .attr("stroke-dasharray", pathLength)

// Add the X Axis
chart
  .append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale).ticks(data.length));
// Add the Y Axis
chart
  .append("g")
  .attr("transform", `translate(0, 0)`)
  .call(d3.axisLeft(yScale));




function drawInitial(){


//use bothData to begin with
//update(bothData);
}


//First draw function

function draw1(){

}
function draw2(){
path
  .transition(transitionPath)
  .attr("stroke-dashoffset", 0);

}

function draw3(){

}

function draw5(){

}



function draw6(){
 
}

function draw7(){

}

function draw4(){

}

function draw8(){

        
}

//Array of all the graph functions
//Will be called from the scroller functionality

let activationFunctions = [
    draw1,
    draw2,
    draw3,
    draw4,
    draw5, 
    draw6, 
    draw7,
    draw8
]

//All the scrolling function
//Will draw a new graph based on the index provided by the scroll


let scroll = scroller()
    .container(d3.select('#graphic'))
scroll()

let lastIndex, activeIndex = 0

scroll.on('active', function(index){
    d3.selectAll('.step')
        .transition().duration(1000)
        .style('opacity', function (d, i) {return i === index ? 1 : 0.25;});
    
    activeIndex = index
    let sign = (activeIndex - lastIndex) < 0 ? -1 : 1; 
    let scrolledSections = d3.range(lastIndex + sign, activeIndex + sign, sign);
    scrolledSections.forEach(i => {
        activationFunctions[i]();
    })
    lastIndex = activeIndex;

})

scroll.on('progress', function(index, progress){
    if (index == 2 & progress > 0.7){

    }
})