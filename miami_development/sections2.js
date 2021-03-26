let dataset, svg
let salarySizeScale, salaryXScale, categoryColorScale
let simulation, nodes
let categoryLegend, salaryLegend

const categories = ['Engineering', 'Business', 'Physical Sciences', 'Law & Public Policy', 'Computers & Mathematics', 'Agriculture & Natural Resources',
'Industrial Arts & Consumer Services','Arts', 'Health','Social Science', 'Biology & Life Science','Education','Humanities & Liberal Arts',
'Psychology & Social Work','Communications & Journalism','Interdisciplinary']

const categoriesXY = {'Engineering': [0, 400, 57382, 23.9],
                        'Business': [0, 600, 43538, 48.3],
                        'Physical Sciences': [0, 800, 41890, 50.9],
                        'Law & Public Policy': [0, 200, 42200, 48.3],
                        'Computers & Mathematics': [200, 400, 42745, 31.2],
                        'Agriculture & Natural Resources': [200, 600, 36900, 40.5],
                        'Industrial Arts & Consumer Services': [200, 800, 36342, 35.0],
                        'Arts': [200, 200, 33062, 60.4],
                        'Health': [400, 400, 36825, 79.5],
                        'Social Science': [400, 600, 37344, 55.4],
                        'Biology & Life Science': [400, 800, 36421, 58.7],
                        'Education': [400, 200, 32350, 74.9],
                        'Humanities & Liberal Arts': [600, 400, 31913, 63.2],
                        'Psychology & Social Work': [600, 600, 30100, 79.4],
                        'Communications & Journalism': [600, 800, 34500, 65.9],
                        'Interdisciplinary': [600, 200, 35000, 77.1]}

const margin = {left: 170, top: 50, bottom: 50, right: 20}
const width = 1000 - margin.left - margin.right
const height = 950 - margin.top - margin.bottom

//Read Data, convert numerical categories into floats
//Create the initial visualisation


d3.csv('data/result.csv', function(d){
}).then(data => {
    dataset = data
    console.log(dataset)
    setTimeout(drawInitial(), 100)
})

var maleData = [];
var femaleData = [];

for(var i = 0; i < dataset.length; i++){
    if(dataset[i]["viewer_gender"] === "MALE"){
        maleData.push(dataset[i]);
    }else{
        femaleData.push(dataset[i]);
    }
}

//functions for toggling between data
function change(value){

    if(value === 'male'){
        update(maleData);
    }else if(value === 'female'){
        update(femaleData);
    }else{
        update(dataset);
    }
}

function update(data){
    //set domain for the x axis
    xChart.domain(data.map(function(d){ return d.viewer_age; }) );
    //set domain for y axis
    yChart.domain( [0, d3.max(data, function(d){ return +d.watch_time_minutes; })] );
    
    //get the width of each bar 
    var barWidth = width / data.length;
    
    //select all bars on the graph, take them out, and exit the previous data set. 
    //then you can add/enter the new data set
    var bars = chart.selectAll(".bar")
                    .remove()
                    .exit()
                    .data(data)     
    //now actually give each rectangle the corresponding data
    bars.enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i){ return i * barWidth + 1 })
        .attr("y", function(d){ return yChart( d.watch_time_minutes); })
        .attr("height", function(d){ return height - yChart(d.watch_time_minutes); })
        .attr("width", barWidth - 1)
        .attr("fill", function(d){ 
            if(d.viewer_gender === "FEMALE"){
                return "rgb(251,180,174)";
            }else{
                return "rgb(179,205,227)";
            }
        });
    //left axis
    chart.select('.y')
          .call(yAxis)
    //bottom axis
    chart.select('.xAxis')
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d){
                return "rotate(-65)";
            });
            
}//end update




// All the initial elements should be create in the drawInitial function
// As they are required, their attributes can be modified
// They can be shown or hidden using their 'opacity' attribute
// Each element should also have an associated class name for easy reference

function drawInitial(){

    /*
    let svg = d3.select("#vis")
                    .append('svg')
                    .attr('width', 1000)
                    .attr('height', 950)
                    .attr('opacity', 1)*/

    
        //set up chart
        var margin = {top: 20, right: 20, bottom: 95, left: 50};
        var width = 800;
        var height = 500;

        var chart = d3.select("#vis")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var xChart = d3.scaleBand()
                        .range([0, width]);
                        
        var yChart = d3.scaleLinear()
                        .range([height, 0]);

        var xAxis = d3.axisBottom(xChart);
        var yAxis = d3.axisLeft(yChart);

        //set up axes
        //left axis
            chart.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)
                  
            //bottom axis
            chart.append("g")
                .attr("class", "xAxis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .selectAll("text")
                    .style("text-anchor", "end")
                    .attr("dx", "-.8em")
                    .attr("dy", ".15em")
                    .attr("transform", function(d){
                        return "rotate(-65)";
                    });

        //add labels
        chart
            .append("text")
            .attr("transform", "translate(-35," +  (height+margin.bottom)/2 + ") rotate(-90)")
            .text("% of total watch time");
                
        chart
            .append("text")
            .attr("transform", "translate(" + (width/2) + "," + (height + margin.bottom - 5) + ")")
            .text("age group");

        //use dataset to begin with
        update(dataset);
}


//First draw function

function draw1(){

}


function draw2(){

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
        .transition().duration(500)
        .style('opacity', function (d, i) {return i === index ? 1 : 0.1;});
    
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