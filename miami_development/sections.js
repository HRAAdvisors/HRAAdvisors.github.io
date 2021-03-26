let dataset, svg
let salarySizeScale, salaryXScale, categoryColorScale
let simulation, nodes
let categoryLegend, salaryLegend


//Read Data, convert numerical categories into floats
//Create the initial visualisation


d3.csv("https://docs.google.com/spreadsheets/d/1LMADV7lzfx1rC6AzkrUp8uwe5XuXR8sd3KDeashPmB8/gviz/tq?tqx=out:csv&gid=1356831804", function(d){
  return{
    location: d.location,
    class: d.class,
    year: d.year,
    rent: +d.rent,
    vacancy: +d.vacancy,
    absorption: d.absorption,
  };
}, function(error, rows){
if (error) throw error;

  //  setTimeout(drawInitial(), 100)
//})


nested = d3.nest().key(function(d){return d.location}).entries(rows)
nestkeys = nested.map(function(d){return d.key;})



var vis = d3.select("#rentvis")
var margin = {top: 20, right: 20, bottom: 95, left: 60};
element = vis.node();
width = element.getBoundingClientRect().width - margin.left - margin.right,
height = element.getBoundingClientRect().height - margin.top - margin.bottom;

rentsvg = d3
  .select("#rentvis")
    .attr("width", width + margin.left + margin.right - 20)
    .attr("height", height + margin.top + margin.bottom)

    const rentchart = rentsvg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`);

const rentgrp = rentchart
  .append("g")
  .attr("transform", `translate(-${margin.left},-${margin.top})`);

// Create scales
const RentyScale = d3
  .scaleLinear()
  .range([height, 0])
  .domain([0, d3.max(rows, d => d.rent + 5)]);
const RentxScale = d3
  .scalePoint()
  .range([0, width-40])
  .domain(rows.map(function(d){ return d.year; }));

const Rentline = d3
  .line()
  .x(d => RentxScale(d.year))
  .y(d => RentyScale(d.rent));


nestkeys.forEach(function(d){

    data =  rows.filter(f => f.location == d)
    
    path = rentgrp
      .append("path")
      .attr("class",d + "_rentpath")
      .attr("d", Rentline(data))
      .attr("transform", `translate(${margin.left},0)`)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)

    pathLength = path.node().getTotalLength();

    path
  .attr("stroke-dashoffset", pathLength)
  .attr("stroke-dasharray", pathLength)

console.log(RentxScale)
console.log(data)


rentgrp.append("text")
    .text(d)
    .attr("class",d+"_rentlabel")
    .attr("x",RentxScale(d3.max(RentxScale.domain())) + 5)
    .attr("y",RentyScale(data[data.length-1 ].rent))
    .attr("transform", `translate(${margin.left},0)`)
    .attr("opacity",0)


})


// Add the X Axis
rentchart
  .append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(RentxScale)
.tickValues(RentxScale.domain().filter(function(d,i){ return !(i%4)})));
// Add the Y Axis
rentchart
  .append("g")
  .attr("transform", `translate(0, 0)`)
  .call(d3.axisLeft(RentyScale).tickFormat(d3.format("($.0f")));



/////VACANCY
vacancysvg = d3
  .select("#vacancyvis")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

    const vacancychart = vacancysvg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`);

const vacancygrp = vacancychart
  .append("g")
  .attr("transform", `translate(-${margin.left},-${margin.top})`);

// Create scales
const vacancyyScale = d3
  .scaleLinear()
  .range([height, 0])
  .domain([0, d3.max(rows, d => d.vacancy + .02)]);
const vacancyxScale = d3
  .scalePoint()
  .range([0, width-40])
  .domain(rows.map(function(d){ return d.year; }));

const vacancyline = d3
  .line()
  .x(d => vacancyxScale(d.year))
  .y(d => vacancyyScale(d.vacancy));

nestkeys.forEach(function(d){

    data =  rows.filter(f => f.location == d)
    
    path = vacancygrp
      .append("path")
      .attr("class",d + "_vacancypath")
      .attr("d", vacancyline(data))
      .attr("transform", `translate(${margin.left},0)`)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)

    pathLength = path.node().getTotalLength();

    path
  .attr("stroke-dashoffset", pathLength)
  .attr("stroke-dasharray", pathLength)

  vacancygrp.append("text")
    .text(d)
    .attr("class",d+"_vacancylabel")
    .attr("x",vacancyxScale(d3.max(vacancyxScale.domain())) + 5)
    .attr("y",vacancyyScale(data[data.length-1 ].vacancy))
    .attr("transform", `translate(${margin.left},0)`)
    .attr("opacity",0)


})

// Add the X Axis
vacancychart
  .append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(vacancyxScale)
.tickValues(vacancyxScale.domain().filter(function(d,i){ return !(i%4)})));
// Add the Y Axis
vacancychart
  .append("g")
  .attr("transform", `translate(0, 0)`)
  .call(d3.axisLeft(vacancyyScale)
    .tickFormat(d3.format(".0%")));



//////Absorption
absvg = d3
  .select("#absorbvis")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

    const abchart = absvg
    .append("g")
    .attr("transform", `translate(${margin.left},0)`);

const abgrp = abchart
  .append("g")
  .attr("transform", `translate(-${margin.left},-${margin.top})`);

// Create scales
const abyScale = d3
  .scaleLinear()
  .range([height, 0])
  .domain([d3.min(rows, d => +d.absorption + .02), d3.max(rows, d => +d.absorption + .02)]);
const abxScale = d3
  .scalePoint()
  .range([0, width-40])
  .domain(rows.map(function(d){ return d.year; }));

const abline = d3
  .line()
  .x(d => abxScale(d.year))
  .y(d => abyScale(+d.absorption));

nestkeys.forEach(function(d){

    data =  rows.filter(f => f.location == d)
    
    console.log(data)
    path = abgrp
      .append("path")
      .attr("class",d + "_abpath")
      .attr("d", abline(data))
      .attr("transform", `translate(${margin.left},0)`)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)

    pathLength = path.node().getTotalLength();

    path
  .attr("stroke-dashoffset", pathLength)
  .attr("stroke-dasharray", pathLength)

  abgrp.append("text")
    .text(d)
    .attr("class",d+"_ablabel")
    .attr("x",abxScale(d3.max(abxScale.domain())) + 5)
    .attr("y",abyScale(+data[data.length-1 ].absorption))
    .attr("transform", `translate(${margin.left},0)`)
    .attr("opacity",0)


})

// Add the X Axis
abchart
  .append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(abxScale)
.tickValues(abxScale.domain().filter(function(d,i){ return !(i%4)})));
// Add the Y Axis
abchart
  .append("g")
  .attr("transform", `translate(0, 0)`)
  .call(d3.axisLeft(abyScale));


////Annotations
const annotations = [
        {
          note: { 
            title: "COVID-19", 
            lineType: "none", 
            align: "middle",
            wrap: 150 //custom text wrapping
          },
          subject: {
            height: height,
            width: RentxScale(RentxScale.domain()[43]) - RentxScale(RentxScale.domain()[41])
          },
          type: d3.annotationCalloutRect,
          y: 1,
          disable: ["connector"], // doesn't draw the connector
          //can pass "subject" "note" and "connector" as valid options
          dx: (RentxScale(RentxScale.domain()[43]) - RentxScale(RentxScale.domain()[41]))/2,
          data: { x: RentxScale.domain()[41]}
        }]


const type = d3.annotationCustomType(
        d3.annotationBadge, 
        {"subject":{"radius": 10 }}
      )

const makeAnnotations = d3.annotation()
        .type(type)
        .accessors({ 
          x: function(d){ return RentxScale(d.x)},
          y: function(d){ return RentyScale(d.y) }
        })
        .annotations(annotations)

      rentchart
        .append("g")
        .attr("class", "annotation-group")
        .call(makeAnnotations)



const vacannotations = [
        {
          note: { 
            title: "COVID-19", 
            lineType: "none", 
            align: "middle",
            wrap: 150 //custom text wrapping
          },
          subject: {
            height: height,
            width: vacancyxScale(vacancyxScale.domain()[43]) - vacancyxScale(vacancyxScale.domain()[41])
          },
          type: d3.annotationCalloutRect,
          y: 1,
          disable: ["connector"], // doesn't draw the connector
          //can pass "subject" "note" and "connector" as valid options
          dx: (vacancyxScale(vacancyxScale.domain()[43]) - vacancyxScale(vacancyxScale.domain()[41]))/2,
          data: { x: vacancyxScale.domain()[41]}
        }]


const makevacAnnotations = d3.annotation()
        .type(type)
        .accessors({ 
          x: function(d){ return vacancyxScale(d.x)},
          y: function(d){ return vacancyScale(d.y) }
        })
        .annotations(vacannotations)

      vacancychart
        .append("g")
        .attr("class", "annotation-group")
        .call(makevacAnnotations)

const abannotations = [
        {
          note: { 
            title: "COVID-19", 
            lineType: "none", 
            align: "middle",
            wrap: 150 //custom text wrapping
          },
          subject: {
            height: height,
            width: abxScale(abxScale.domain()[43]) - abxScale(abxScale.domain()[41])
          },
          type: d3.annotationCalloutRect,
          y: 1,
          disable: ["connector"], // doesn't draw the connector
          //can pass "subject" "note" and "connector" as valid options
          dx: (abxScale(abxScale.domain()[43]) - abxScale(abxScale.domain()[41]))/2,
          data: { x: abxScale.domain()[41]}
        }]


const makeabAnnotations = d3.annotation()
        .type(type)
        .accessors({ 
          x: function(d){ return abxScale(d.x)},
          y: function(d){ return abScale(d.y) }
        })
        .annotations(abannotations)

      abchart
        .append("g")
        .attr("class", "annotation-group")
        .call(makeabAnnotations)

// Tooltip

var bisect = d3.bisector(function(d) { return d.year; }).left;

var tooltip = d3.select(".tab04_content.w-tab-content").append("div")
    .attr("class", "tooltip")
    .style("display", "none");

var focus = rentgrp.append("g")
            .attr("class", "focus")
            .style("display", "none");

focus.append("circle")
    .attr("r", 5);

var tooltipDate = tooltip.append("div")
    .attr("class", "tooltip-date");

var tooltipLikes = tooltip.append("div");
tooltipLikes.append("span")
    .attr("class", "tooltip-title")
    .text("Gross Rent PSF: ");

var tooltipLikesValue = tooltipLikes.append("span")
    .attr("class", "tooltip-likes");

rentchart.append("rect")
    .attr("class", "ttoverlay")
    .attr("width", width)
    .attr("height", height)
    .on("mouseover", function() { focus.style("display", null); tooltip.style("display", null);  })
    .on("mouseout", function() { focus.style("display", "none"); tooltip.style("display", "none"); })
    .on("mousemove", mousemove);

function mousemove() {
    var xPos = d3.mouse(this)[0];
    var domain = RentxScale.domain();
    var range = RentxScale.range();
    var rangePoints = d3.range(range[0], range[1], RentxScale.step());

    var x0 = domain[d3.bisect(rangePoints, xPos) ];
        i = bisect(rows, x0, 0),
        d0 = rows[i - 1],
        d1 = rows[i],
        d = x0 - d0.year > d1.year - x0 ? d1 : d0;
    focus.attr("transform", "translate(" + (RentxScale(d.year) + margin.left) + "," + RentyScale(d.rent) + ")");
    tooltip.attr("style", "left:" + (RentxScale(d.year) + 64) + "px;top:" + RentyScale(d.rent) + "px;");
    tooltip.select(".tooltip-date").text(d.year);
    tooltip.select(".tooltip-likes").text(d3.format("($.2f")(d.rent));

}

function drawInitial(){


//use bothData to begin with
//update(bothData);
}


//First draw function

function draw1(){

}
function draw2(){
d3.select(".Miami_rentpath")
    .transition()
  .ease(d3.easeSin)
  .duration(5000)
  .attr("stroke-dashoffset", 0);

d3.select(".Miami_rentlabel")
    .transition()
    .delay(6500)
  .duration(500)
  .attr("opacity", 1);



}

function draw3(){

d3.select(".NY_rentpath")
    .transition()
  .ease(d3.easeSin)
  .duration(5000)
  .attr("stroke-dashoffset", 0);

d3.select(".Chicago_rentpath")
    .transition()
  .ease(d3.easeSin)
  .duration(5000)
  .attr("stroke-dashoffset", 0);

d3.select(".SF_rentpath")
    .transition()
  .ease(d3.easeSin)
  .duration(5000)
  .attr("stroke-dashoffset", 0);

d3.select(".NY_rentlabel")
    .transition()
      .transition()
    .delay(6500)
  .duration(500)
  .attr("opacity", 1);

d3.select(".SF_rentlabel")
    .transition()
      .transition()
    .delay(6500)
  .duration(500)
  .attr("opacity", 1);

d3.select(".Chicago_rentlabel")
    .transition()
      .transition()
    .delay(6500)
  .duration(500)
  .attr("opacity", 1);



}

function draw4(){

document.getElementById('vacancy').click();

d3.select(".Miami_vacancypath")
    .transition()
  .ease(d3.easeSin)
  .duration(5000)
  .attr("stroke-dashoffset", 0);

d3.select(".Miami_vacancylabel")
    .transition()
    .delay(6500)
  .duration(500)
  .attr("opacity", 1);

}



function draw5(){
 
d3.select(".NY_vacancypath")
    .transition()
  .ease(d3.easeSin)
  .duration(5000)
  .attr("stroke-dashoffset", 0);

d3.select(".Chicago_vacancypath")
    .transition()
  .ease(d3.easeSin)
  .duration(5000)
  .attr("stroke-dashoffset", 0);

d3.select(".SF_vacancypath")
    .transition()
  .ease(d3.easeSin)
  .duration(5000)
  .attr("stroke-dashoffset", 0);


d3.select(".NY_vacancylabel")
    .transition()
    .delay(6500)
  .duration(500)
  .attr("opacity", 1);
d3.select(".Chicago_vacancylabel")
    .transition()
    .delay(6500)
  .duration(500)
  .attr("opacity", 1);

d3.select(".SF_vacancylabel")
    .transition()
    .delay(6500)
  .duration(500)
  .attr("opacity", 1);

}

function draw6(){
document.getElementById('absorption').click();

d3.select(".Miami_abpath")
    .transition()
  .ease(d3.easeSin)
  .duration(5000)
  .attr("stroke-dashoffset", 0);

d3.select(".Miami_ablabel")
    .transition()
    .delay(6500)
  .duration(500)
  .attr("opacity", 1);

}

function draw7(){

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

});