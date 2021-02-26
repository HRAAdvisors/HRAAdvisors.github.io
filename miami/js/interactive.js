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
 

var KeyRent = d3.select("#KeyRent")
	.append("svg")
  .append("text")
    .text(d3.format("($.2f")(rows[0].rent))
    .attr("x", 10)
    .attr("y", 40)
    .attr("class", "label")
    .style("font-weight", 700)
    .style('font-size',40)

var KeyVacancy = d3.select("#KeyVacancy")
	.append("svg")
  .append("text")
    .text(d3.format(".1%")(rows[0].vacancy))
    .attr("x", 10)
    .attr("y", 40)
    .attr("class", "label")
    .style("font-weight", 700)
    .style('font-size',40)

var KeyAbsorbtion = d3.select("#KeyAbsorbtion")
	.append("svg")
  .append("text")
    .text(d3.format("(,.2r")(rows[0].absorbtion) + " SF")
    .attr("x", 10)
    .attr("y", 40)
    .attr("class", "label")
    .style("font-weight", 700)
    .style('font-size',40)


 var KeyInventory = d3.select("#KeyInventory")
	.append("svg")
  .append("text")
    .text(d3.format("(,.2r")(rows[0].inventory)  + " SF")
    .attr("x", 10)
    .attr("y", 40)
    .attr("class", "label")
    .style("font-weight", 700)
    .style('font-size',40)


 var KeyUC = d3.select("#KeyUC")
	.append("svg")
  .append("text")
    .text(d3.format("(,.2r")(rows[0].underconstruction)  + " SF")
    .attr("x", 10)
    .attr("y", 40)
    .attr("class", "label")
    .style("font-weight", 700)
    .style('font-size',40)

var button = d3
	.selectAll('.button')

var all = d3
      .select("#All")



all
  .on('click', function(d){
  
   button
	.style("color","#1884B8")
  .style("background-color", "#FFFFFF")
  
  all
  .style("background-color", "#242358")
  .style("color","white")
  
  KeyRent
    .text(d3.format("($.2f")(rows[0].rent))
  KeyVacancy
    .text(d3.format(".1%")(rows[0].vacancy))
  KeyAbsorbtion
    .text(d3.format("(,.2r")(rows[0].absorbtion) + " SF")
  KeyInventory
    .text(d3.format("(,.2r")(rows[0].inventory) + " SF")
  KeyUC
    .text(d3.format("(,.2r")(rows[0].underconstruction) + " SF")


})

var ClassA = d3
      .select("#ClassA")

ClassA
  .on('click', function(d){
  
  button
	.style("color","#1884B8")
  .style("background-color", "#FFFFFF")
  
  ClassA
  .style("background-color", "#1884B8")
  .style("color","white")
  
  KeyRent
    .text(d3.format("($.2f")(rows[1].rent))
  KeyVacancy
    .text(d3.format(".1%")(rows[1].vacancy))
  KeyAbsorbtion
    .text(d3.format("(,.2r")(rows[1].absorbtion) + " SF")
  KeyInventory
    .text(d3.format("(,.2r")(rows[1].inventory) + " SF")
  KeyUC
    .text(d3.format("(,.2r")(rows[1].underconstruction) + " SF")
})

var ClassB = d3
      .select("#ClassB")

ClassB
  .on('click', function(d){
  
  button
	.style("color","#1884B8")
  .style("background-color", "#FFFFFF")
  
  ClassB
  .style("background-color", "#242358")
  .style("color","white")
  
  KeyRent
    .text(d3.format("($.2f")(rows[2].rent))
  KeyVacancy
    .text(d3.format(".1%")(rows[2].vacancy))
  KeyAbsorbtion
    .text(d3.format("(,.2r")(rows[2].absorbtion) + " SF")
  KeyInventory
    .text(d3.format("(,.2r")(rows[2].inventory) + " SF")
  KeyUC
    .text(d3.format("(,.2r")(rows[2].underconstruction) + " SF")
})

var ClassC = d3
      .select("#ClassC")

ClassC
  .on('click', function(d){
  
  button
	.style("color","#1884B8")
  .style("background-color", "#FFFFFF")
  
  ClassC
  .style("background-color", "#242358")
  .style("color","white")
  
  KeyRent
    .text(d3.format("($.2f")(rows[3].rent))
  KeyVacancy
    .text(d3.format(".1%")(rows[3].vacancy))
  KeyAbsorbtion
    .text(d3.format("(,.2r")(rows[3].absorbtion) + " SF")
  KeyInventory
    .text(d3.format("(,.2r")(rows[3].inventory) + " SF")
  KeyUC
    .text(d3.format("(,.2r")(rows[3].underconstruction) + " SF")
})

});


//MAP SECTION


mapboxgl.accessToken = 'pk.eyJ1Ijoia3BjbHluZSIsImEiOiJjanN3MzlpY2EwZGpjM3lsaGNhb3NqY3JmIn0._sGjIhmL5Xt08WIMWRsSsg';
        var bounds = [
[-80.24975, 25.73521]
, [-80.13341, 25.83169]
];

        const r = 255 * 0.65;
        var map = new mapboxgl.Map({
            container: 'map'
            , style: 'mapbox://styles/kpclyne/ckkwuj4vq3kda17phgh8fiizg'
            , center: [-80.19393, 25.77054]
            , zoom: 14.1
            , pitch: 47
            , bearing: -25
            , minZoom: 12.5
            , maxZoom: 16
            , maxBounds: bounds
        });
        map.addControl(new MapboxGeocoder({
            accessToken: mapboxgl.accessToken
            , mapboxgl: mapboxgl
        }));
        // set functions for layer toggle buttons
        map.on('load', function () {
            var classatoggle = document.getElementById('classabutton');
            classatoggle.addEventListener('click', function () {
                if (classatoggle.className === 'on bordertop') {
                    classatoggle.setAttribute('class', 'off');
                    map.setLayoutProperty('office', 'visibility', 'none');
                    map.setLayoutProperty('office', 'visibility', 'none');
                    classatoggle.className = 'off bordertop';
                }
                else {
                    classatoggle.setAttribute('class', 'on bordertop');
                    map.setLayoutProperty('office', 'visibility', 'visible');
                    map.setLayoutProperty('office', 'visibility', 'visible');
                    classatoggle.className = 'on bordertop';
                }
            });
        });
        map.on('load', function () {
            var othertoggle = document.getElementById('otherbutton');
            othertoggle.addEventListener('click', function () {
                if (othertoggle.className === 'on') {
                    othertoggle.setAttribute('class', 'off');
                    map.setLayoutProperty('resi', 'visibility', 'none');
                    map.setLayoutProperty('resi', 'visibility', 'none');
                    othertoggle.className = 'off';
                }
                else {
                    othertoggle.setAttribute('class', 'on bordertop');
                    map.setLayoutProperty('resi', 'visibility', 'visible');
                    map.setLayoutProperty('resi', 'visibility', 'visible');
                    othertoggle.className = 'on';
                }
            });
        });
        map.on('load', function () {
            var condotoggle = document.getElementById('condobutton');
            condotoggle.addEventListener('click', function () {
                if (condotoggle.className === 'on') {
                    condotoggle.setAttribute('class', 'off');
                    map.setLayoutProperty('metrorail', 'visibility', 'none');
                    map.setLayoutProperty('metrorail', 'visibility', 'none');
                    condotoggle.className = 'off';
                }
                else {
                    condotoggle.setAttribute('class', 'on bordertop');
                    map.setLayoutProperty('metrorail', 'visibility', 'visible');
                    map.setLayoutProperty('metrorail', 'visibility', 'visible');
                    condotoggle.className = 'on';
                }
            });
        });


       
        // callouts on click
        map.on('load', function () {
            map.on('click', 'office', function (e) {
                new mapboxgl.Popup().setLngLat(e.lngLat).setHTML('<div class="marker-title">' + e.features[0].properties.name + '</div><!--<div style = "padding-top:5px;"> Type: <b>' + e.features[0].properties.type + '</b></div>-->').setMaxWidth("700px").addTo(map);
            });
            map.on('mouseenter', 'office', function () {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'office', function () {
                map.getCanvas().style.cursor = '';
            });
        });
        map.on('load', function () {
            map.on('click', 'resi', function (e) {
                new mapboxgl.Popup().setLngLat(e.lngLat).setHTML('<div class="marker-title">' + e.features[0].properties.name + '</div>').setMaxWidth("700px").addTo(map);
            });
            map.on('mouseenter', 'resi', function () {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'resi', function () {
                map.getCanvas().style.cursor = '';
            });
        });
        map.on('load', function () {
            map.on('click', 'metro', function (e) {
                new mapboxgl.Popup().setLngLat(e.lngLat).setHTML('<div class="marker-title">' + e.features[0].properties.Name + '</div><div style = "padding-top:5px;"> Stories: <b>' + e.features[0].properties.stories + '</b></div><div> Units: <b>' + e.features[0].properties.units + '</b></div><div> Property Mgmt Co: <b>' + e.features[0].properties.info + '</b></div>').setMaxWidth("700px").addTo(map);
            });
            map.on('mouseenter', 'metro', function () {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'metro', function () {
                map.getCanvas().style.cursor = '';
            });
        });
        map.on('load', function () {
            map.on('click', 'rental', function (e) {
                new mapboxgl.Popup().setLngLat(e.lngLat).setHTML('<div class="marker-title">' + e.features[0].properties.Name + '</div><div style = "padding-top:5px;"> Stories: <b>' + e.features[0].properties.stories + '</b></div><div> Units: <b>' + e.features[0].properties.units + '</b></div><div> <b><a href="' + e.features[0].properties.info + '" target="_blank">Website</a> </b></div>').setMaxWidth("700px").addTo(map);
            });
            map.on('mouseenter', 'rental', function () {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'rental', function () {
                map.getCanvas().style.cursor = '';
            });
        });
        map.on('load', function () {
            map.on('click', 'hotels', function (e) {
                new mapboxgl.Popup().setLngLat(e.lngLat).setHTML('<div class="marker-title">' + e.features[0].properties.Name + '</div><div style = "padding-top:5px;"> Hotel Meeting Space: <b>' + e.features[0].properties.Hotel_Meet + '</b></div><div> Hotel Rooms: <b>' + e.features[0].properties.Hotel_Room + '</b></div><div>' + e.features[0].properties.website + '</div>').setMaxWidth("700px").addTo(map);
            });
            map.on('mouseenter', 'hotels', function () {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'hotels', function () {
                map.getCanvas().style.cursor = '';
            });
        });
        map.on('load', function () {
            map.on('click', 'shopping', function (e) {
                new mapboxgl.Popup().setLngLat(e.lngLat).setHTML('<div class="marker-title">' + e.features[0].properties.Name + '</div><div style = "padding-top:5px;">' + e.features[0].properties.website + '</div>').setMaxWidth("700px").addTo(map);
            });
            map.on('mouseenter', 'shopping', function () {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'shopping', function () {
                map.getCanvas().style.cursor = '';
            });
        });
        // station names on hover
        var popup = new mapboxgl.Popup({
            closeButton: false
            , closeOnClick: false
        });
        map.on('mouseenter', 'metromover-stops', function (e) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.NAME;
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            popup.setLngLat(coordinates).setHTML('<i>' + description + '</i>').addTo(map);
        });
        map.on('mouseleave', 'metromover-stops', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });

        let hovered = [];
    window.addEventListener('mousemove', function(e) {
        e.point = new mapboxgl.Point(e.clientX, e.clientY);
        
        const features = map.queryRenderedFeatures(e.point, {layers: ['office']});
       

        for (const feature of hovered) {
            map.setFeatureState(feature, {
                'hover-r': r,
                'hover-g': r,
                'hover-b': r
            });
        }
        const seen = {};
        hovered = features;
        let i = 0;
        for (const feature of hovered) {
            if (seen[feature.id]) continue;

            seen[feature.id] = true;
            map.setFeatureState(feature, {
                'hover-r': i === 0 ? 255 : r,
                'hover-g': i === 1 ? 255 : r,
                'hover-b': i >= 2 ? 255 : r
            });
            i++;
        }
         });


    ///TOP INDUSTRY TABLES

d3.csv("https://docs.google.com/spreadsheets/d/1LMADV7lzfx1rC6AzkrUp8uwe5XuXR8sd3KDeashPmB8/gviz/tq?tqx=out:csv&gid=2127750220", function(error, data1) {
		  if (error) throw error;
		  
      d3.csv("https://docs.google.com/spreadsheets/d/1LMADV7lzfx1rC6AzkrUp8uwe5XuXR8sd3KDeashPmB8/gviz/tq?tqx=out:csv&gid=1433347485", function(error, data2) {
		  if (error) throw error;
        
      data = data1
      
      var growing = d3
      	.select("#GrowingInds")
      
      var largest = d3
      	.select("#LargestInds")
      
			
      
      var columns = d3.keys(data[0]);

      var table = d3.select('#top-industries').append("table");
      var thead = table.append("thead");
      var tbody = table.append("tbody");

      thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
        .text(function(column) { return column; });

      tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr")
        .selectAll("td")
        .data(function(row) {
          return columns.map(function(column) {
            return {
              column: column,
              value: row[column]
            };
          });
        })
        .enter()
        .append("td")
        .text(function(d) { return d.value; });
      
      growing
      .on('click', function(d){
        tbody.selectAll("tr")
        .data(data2)
        .selectAll("td")
        .data(function(row) {
          return columns.map(function(column) {
            return {
              column: column,
              value: row[column]
            };
          });
        })
        .text(function(d) {return d.value;});
        
      })
      
      largest
      .on('click', function(d){
        tbody.selectAll("tr")
        .data(data1)
        .selectAll("td")
        .data(function(row) {
          return columns.map(function(column) {
            return {
              column: column,
              value: row[column]
            };
          });
        })
        .text(function(d) {return d.value;});
        
      })
      
      
      
		  
        
      });
	  });


/// TOP OCCUPATION TABLE
d3.csv("https://docs.google.com/spreadsheets/d/1LMADV7lzfx1rC6AzkrUp8uwe5XuXR8sd3KDeashPmB8/gviz/tq?tqx=out:csv&gid=632495073", function(error, data1) {
		  if (error) throw error;
		  
      d3.csv("https://docs.google.com/spreadsheets/d/1LMADV7lzfx1rC6AzkrUp8uwe5XuXR8sd3KDeashPmB8/gviz/tq?tqx=out:csv&gid=791286037", function(error, data2) {
		  if (error) throw error;
        
      data = data1
      
      var growing = d3
      	.select("#GrowingOccs")
      
      var largest = d3
      	.select("#LargestOccs")
      
			
      
      var columns = d3.keys(data[0]);

      var table = d3.select('#top-occupations').append("table");
      var thead = table.append("thead");
      var tbody = table.append("tbody");

      thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
        .text(function(column) { return column; });

      tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr")
        .selectAll("td")
        .data(function(row) {
          return columns.map(function(column) {
            return {
              column: column,
              value: row[column]
            };
          });
        })
        .enter()
        .append("td")
        .text(function(d) { return d.value; });
      
      growing
      .on('click', function(d){
        tbody.selectAll("tr")
        .data(data2)
        .selectAll("td")
        .data(function(row) {
          return columns.map(function(column) {
            return {
              column: column,
              value: row[column]
            };
          });
        })
        .text(function(d) {return d.value;});
        
      })
      
      largest
      .on('click', function(d){
        tbody.selectAll("tr")
        .data(data1)
        .selectAll("td")
        .data(function(row) {
          return columns.map(function(column) {
            return {
              column: column,
              value: row[column]
            };
          });
        })
        .text(function(d) {return d.value;});
        
      })
      
        
      });
	  });


///EDUCATIONAL ATTAINMENT SLIDER
d3.csv("https://docs.google.com/spreadsheets/d/1LMADV7lzfx1rC6AzkrUp8uwe5XuXR8sd3KDeashPmB8/gviz/tq?tqx=out:csv&gid=1283485067", function(error, csv) {
		  if (error) throw error;

	var keys = csv.columns.slice(2);

	var year   = [...new Set(csv.map(d => d.Year))]
	var states = [...new Set(csv.map(d => d.Bucket))]


	var svg = d3.select("#educhart"),
		margin = {top: 35, left: 35, bottom: 0, right: 15},
		
		element = svg.node();
		width = element.getBoundingClientRect().width - margin.left - margin.right,
		height = element.getBoundingClientRect().height - margin.top - margin.bottom;

	var y = d3.scaleBand()
		.range([margin.top, height - margin.bottom])
		.padding(0.1)
		.paddingOuter(0.2)
		.paddingInner(0.2)

	var x = d3.scaleLinear()
		.range([margin.left, width - margin.right])

	var yAxis = svg.append("g")
		.attr("transform", `translate(${margin.left},0)`)
		.attr("class", "y-axis")

	var xAxis = svg.append("g")
		.attr("transform", `translate(0,${height})`)
		.attr("class", "x-axis")

	var z = d3.scaleOrdinal()
		.range(["#7F7F7F", "#9DC3E6", "#2E75B6","#002060"])
		.domain(keys);

	update(d3.select("#slide").property("value"), 0)

	function update(input, speed) {

		var data = csv.filter(f => f.Year == input)

		data.forEach(function(d) {
			d.total = d3.sum(keys, k => +d[k])
			return d
		})

		csv.forEach(function(d) {
			d.total = d3.sum(keys, k => +d[k])
			return d
		})

		console.log(csv)

		const maxedu = csv.reduce(
		  (max, i) => (i.total > max ? i.total : max),
		  csv[0].total
		);

		x.domain([0, maxedu]).nice();

		svg.selectAll(".x-axis").transition().duration(speed)
			.call(d3.axisBottom(x).ticks(null, "s"))


		y.domain(data.map(d => d.Bucket));

		svg.selectAll(".y-axis").transition().duration(speed)
			.call(d3.axisLeft(y).tickSizeOuter(0))

		var group = svg.selectAll("g.layer")
			.data(d3.stack().keys(keys)(data), d => d.key)

		group.exit().remove()

		group.enter().insert("g", ".y-axis").append("g")
			.classed("layer", true)
			.attr("fill", d => z(d.key));

		var bars = svg.selectAll("g.layer").selectAll("rect")
			.data(d => d, e => e.data.Bucket);

		bars.exit().remove()

		bars.enter().append("rect")
			.attr("height", y.bandwidth())
			.merge(bars)
		.transition().duration(speed)
			.attr("y", d => y(d.data.Bucket))
			.attr("x", d => x(d[0]))
			.attr("width", d => x(d[1]) - x(d[0]))

		var text = svg.selectAll(".text")
			.data(data, d => d.Bucket);

		text.exit().remove()

		text.enter().append("text")
			.attr("class", "text")
			.attr("text-anchor", "start")
			.merge(text)
		.transition().duration(speed)
			.attr("y", d => y(d.Bucket) + y.bandwidth() / 2)
			.attr("x", d => x(d.total) + 5)
			.text(d => d.total)
	}


  var slide = d3.select("#slide")
		.on("change", function() {
			update(this.value, 750)
		})

});
  
const allRanges = document.querySelectorAll(".range-wrap");
allRanges.forEach(wrap => {
  const range = wrap.querySelector(".range");
  const bubble = wrap.querySelector(".bubble");

  range.addEventListener("input", () => {
    setBubble(range, bubble);
  });
  setBubble(range, bubble);
});

function setBubble(range, bubble) {
  const val = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;

  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}



//////COLLEGE TOWNS

d3.csv("https://docs.google.com/spreadsheets/d/1LMADV7lzfx1rC6AzkrUp8uwe5XuXR8sd3KDeashPmB8/gviz/tq?tqx=out:csv&gid=1381261411", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.students = +d.students;
  });
  
  var svg = d3.select("#collegetowns")
  
  var margin = {top: 20, right: 20, bottom: 30, left: 60},
	element = svg.node();
	width = element.getBoundingClientRect().width - margin.left - margin.right,
	height = element.getBoundingClientRect().height - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([margin.left, width-margin.right])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height-margin.bottom, margin.top]);
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin

    svg
      .append("g")
      .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");


  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.city; }));
  y.domain([0, d3.max(data, function(d) { return d.students; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.city); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.students); })
      .attr("height", function(d) { return height - y(d.students); })
      .style ("fill", function(d) {
		   if (d.city === "Miami") {return "#EB529D"}  // <== Add these
		   else    { return "#A6CEE3" } 
		  });

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
  		.attr("transform", "translate("+ margin.left + "," + margin.top + ")")
      .call(d3.axisLeft(y));

});




///////QUALITY

d3.csv("https://docs.google.com/spreadsheets/d/1LMADV7lzfx1rC6AzkrUp8uwe5XuXR8sd3KDeashPmB8/gviz/tq?tqx=out:csv&gid=2061632967", function(error, data) {
  if (error) throw error;

  console.log(data)

  function wrap(text, width) {
        text.each(function() {
            var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    y = text.attr("y"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }

    var svg = d3.select("#quality")

    var margin = {top: 20, right: 20, bottom: 30, left: 60},
	element = svg.node();
	width = element.getBoundingClientRect().width - margin.left - margin.right,
	height = element.getBoundingClientRect().height - margin.top - margin.bottom;


	var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1,.3);
    var y = d3.scale.linear()
            .rangeRound([height, 0]);
    var colorRange = d3.scale.category20();
    var color = d3.scale.ordinal()
            .range(["#BFBFBF","#0070C0","#EB529D"]);
    var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
    var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(d3.format(".2s"));


    svg.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var divTooltip = d3.select("body").append("div").attr("class", "toolTip");
    color.domain(d3.keys(dataset[0]).filter(function(key) { return key !== "label"; }));
    dataset.forEach(function(d) {
        var y0 = 0;
        d.values = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
        d.total = d.values[d.values.length - 1].y1;
    });
    x.domain(dataset.map(function(d) { return d.label; }));
    y.domain([0, d3.max(dataset, function(d) { return d.total; })]);
   
   
    var bar = svg.selectAll(".label")
            .data(dataset)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform", function(d) { return "translate(" + x(d.label) + ",0)"; });
 
            
    var bar_enter = bar.selectAll("rect")
    .data(function(d) { return d.values; })
    .enter();

bar_enter.append("rect")
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.y1); })
    .attr("height", function(d) { return y(d.y0) - y(d.y1); })
    .style("fill", function(d) { return color(d.name); });

bar_enter.append("text")
    .text(function(d) { return d3.format(".1s")(d.y1-d.y0)+" SF"; })
    .attr("y", function(d) { return y(d.y1)+(y(d.y0) - y(d.y1))/2; })
    .attr("x", x.rangeBand()/2.2)
    .style("fill", '#ffffff')
   	.style("font-size", '30px')
  	.style("font-weight", '600');
  
bar_enter.append("text")
    .text(function(d) { return d.name })
    .attr("y", function(d) { return y(d.y1)+(y(d.y0) - y(d.y1))/2; })
    .attr("x", x.rangeBand()*1.01)
    .style("fill", function(d) { return color(d.name); })
   	.style("font-size", '30px')
  	.style("font-weight", '600');

  });


////// DISTRICT PROFILES
d3.csv("https://docs.google.com/spreadsheets/d/1LMADV7lzfx1rC6AzkrUp8uwe5XuXR8sd3KDeashPmB8/gviz/tq?tqx=out:csv&gid=1939873973", function(error, data1) {
		  if (error) throw error;
		  
      d3.csv("https://docs.google.com/spreadsheets/d/1LMADV7lzfx1rC6AzkrUp8uwe5XuXR8sd3KDeashPmB8/gviz/tq?tqx=out:csv&gid=791286037", function(error, data2) {
		  if (error) throw error;
        
      data = data1
      
      var growing = d3
      	.select("#MiamiButton")
      
      var largest = d3
      	.select("#GDButton")
      
			
      
      var columns = d3.keys(data[0]);

      var table = d3.select('#conditions').append("table");
      var thead = table.append("thead");
      var tbody = table.append("tbody");

      thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
        .text(function(column) { return column; });

      tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr")
        .selectAll("td")
        .data(function(row) {
          return columns.map(function(column) {
            return {
              column: column,
              value: row[column]
            };
          });
        })
        .enter()
        .append("td")
        .text(function(d) { return d.value; })
        .style("color","#000000");
      
      growing
      .on('click', function(d){
        tbody.selectAll("tr")
        .data(data2)
        .selectAll("td")
        .data(function(row) {
          return columns.map(function(column) {
            return {
              column: column,
              value: row[column]
            };
          });
        })
        .text(function(d) {return d.value;});
        
      })
      
      largest
      .on('click', function(d){
        tbody.selectAll("tr")
        .data(data1)
        .selectAll("td")
        .data(function(row) {
          return columns.map(function(column) {
            return {
              column: column,
              value: row[column]
            };
          });
        })
        .text(function(d) {return d.value;});
        
      })
      
        
      });
	  });


///// District Profiles

d3.csv("https://docs.google.com/spreadsheets/d/1LMADV7lzfx1rC6AzkrUp8uwe5XuXR8sd3KDeashPmB8/gviz/tq?tqx=out:csv&gid=342967098", function(d){
  return{
    class: d.class,
    businesses: +d.businesses,
    population: +d.population,
    employees: +d.employees
  };
}, function(error, rows){
if (error) throw error;
 
// Initialize a circle

var businesses = d3.select("#businesses")
	.append("svg")
  .append("text")
    .text(d3.format("(,.2r")(rows[0].businesses))
    .attr("x", 10)
    .attr("y", 40)
    .attr("class", "label")
    .style("font-weight", 700)
    .style('font-size',40)
    .style('fill','#FFFFFF')

var population = d3.select("#population")
	.append("svg")
  .append("text")
    .text(d3.format("(,.2r")(rows[0].population))
    .attr("x", 10)
    .attr("y", 40)
    .attr("class", "label")
    .style("font-weight", 700)
    .style('font-size',40)
    .style('fill','#FFFFFF')

var employees = d3.select("#employees")
	.append("svg")
  .append("text")
    .text(d3.format("(,.2r")(rows[0].employees) )
    .attr("x", 10)
    .attr("y", 40)
    .attr("class", "label")
    .style("font-weight", 700)
    .style('font-size',40)
    .style('fill','#FFFFFF')



var button = d3
	.selectAll('.dbutton')

var Miami = d3
      .select("#MiamiButton")



Miami
  .on('click', function(d){
  
   button
	.style("color","#1884B8")
  .style("background-color", "#FFFFFF")
  
  Miami
  .style("background-color", "#242358")
  .style("color","white")
  
  businesses
    .text(d3.format("(,.2r")(rows[0].businesses))
  population
    .text(d3.format("(,.2r")(rows[0].population))
  employees
    .text(d3.format("(,.2r")(rows[0].employees))


})

var greater = d3
      .select("#GDButton")

greater
  .on('click', function(d){
  
  button
	.style("color","#1884B8")
  .style("background-color", "#FFFFFF")
  
  greater
  .style("background-color", "#1884B8")
  .style("color","white")
  
  businesses
    .text(d3.format("(,.2r")(rows[1].businesses))
  population
    .text(d3.format("(,.2r")(rows[1].population))
  employees
    .text(d3.format("(,.2r")(rows[1].employees))
})



});
