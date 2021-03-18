// https://observablehq.com/@yarynam/animated-deck-gl-arcs@530
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Animated Deck.gl Arcs`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Simple custom shader with transparent gradient animation. 

The idea is pretty straightforward -- each arc has a gradient that varies from the actual color to its fully opaque equivalent. Changing the opacity point updates the length of the arc. 
<img src="https://i.imgur.com/RO9XEsA.png" />

Based on [Deck.gl + Mapbox Brushing Arcs](https://bl.ocks.org/Pessimistress/dc2becf3809c67dc443b4dbab1b9a46f) block and [Book of Shaders](https://thebookofshaders.com/)`
)});
  main.variable(observer()).define(["html","animateArcs","arcsLayer"], function(html,animateArcs,arcsLayer)
{
  const button = html`<button class="btn btn-primary">ANIMATE ARCS</button>`
  button.onclick = function(event) {
    animateArcs(arcsLayer)
  }
  return button
}
);
  main.variable(observer()).define(["html","progressArcs","arcsLayer"], function(html,progressArcs,arcsLayer)
{
  const input = html`<input type=range min=0 max=1 step=0.0001>`;
  input.oninput = () => progressArcs(arcsLayer, input.valueAsNumber);
  return input;
}
);
  main.variable(observer("map")).define("map", ["html","mapboxgl","arcsLayer","invalidation"], function*(html,mapboxgl,arcsLayer,invalidation)
{
  const container = html`<div style="height:500px; background-color:#191a1a;">`; //Create map container
  yield container; 
  const map = new mapboxgl.Map({
    container,
    center: [-20.276018, 50.220830],
    zoom: 1.7,
    pitch: 90,
    bearing: 0,
    renderWorldCopies: 1,
    style: "mapbox://styles/mapbox/dark-v9",
    scrollZoom: false
  });
  
   map.on('load', () => {
     map.addLayer(arcsLayer); // add arc layer
  
     map.style.stylesheet.layers.forEach(function(layer) {    //remove labels
        if (layer.type === 'symbol') {
            map.removeLayer(layer.id);
        }
     });
  });
  
  invalidation.then(() => map.remove());
}
);
  main.variable(observer("progressArcs")).define("progressArcs", function(){return(
function progressArcs(layer, coef) {
      layer.setProps({coef});
  }
)});
  main.variable(observer("animateArcs")).define("animateArcs", function(){return(
function animateArcs(layer) {
    var coef = 0.001;
    const animationInterval = setInterval(()=> {
      coef += 0.005;
      if (coef >= 1.0) {
        clearInterval(animationInterval);
      }
      layer.setProps({coef});
    }, 5);
  }
)});
  main.variable(observer("arcsLayer")).define("arcsLayer", ["deck","ArcBrushingLayer","data","colorScale"], function(deck,ArcBrushingLayer,data,colorScale)
{
    const arcsLayer = new deck.MapboxLayer({
       type: ArcBrushingLayer,
       id: `arcs`,
       data: data,
       opacity: 1,
       coef: 0.001,
       getSourcePosition: d => [d.longitude_source, d.latitude_source],
       getTargetPosition: d => [d.longitude_target, d.latitude_target],
       getSourceColor: d => colorScale(d.category),
       getTargetColor: d => colorScale(d.category),
       getStrokeWidth: 3
    });
  
  return arcsLayer;
}
);
  main.variable(observer("ArcBrushingLayer")).define("ArcBrushingLayer", ["deck"], function(deck){return(
class ArcBrushingLayer extends deck.ArcLayer {
      getShaders() {
        // here comes our custom shader
        // we will use step function to create opacity gradient with colorA and color B
        // for more information see https://thebookofshaders.com/05/
        return Object.assign({}, super.getShaders(), {
          inject: {
            'vs:#decl': `
             uniform float coef;
            `,
            'vs:#main-end': `
            if (coef > 0.0) {
              vec4 pct = vec4(segmentRatio);
              pct.a = step(coef, segmentRatio);
              vec4 colorA = instanceTargetColors;
              vec4 colorB = vec4(instanceTargetColors.r, instanceTargetColors.g, instanceTargetColors.b, 0.0);
              vec4 color = mix(colorA, colorB, pct) / 255.;
              vColor = color;
            }
                        `,
                        'fs:#main-start': `
            if (vColor.a == 0.0) discard;
                        `
          }
        });
      }

      draw(opts) {
        const {coef} = this.props;
        // add uniforms
        const uniforms = Object.assign({}, opts.uniforms, { coef: coef });
        super.draw(Object.assign({}, opts, {uniforms}));
      }
    }
)});
  main.variable(observer("colorScale")).define("colorScale", ["d3"], function(d3){return(
d3.scaleOrdinal()
      .domain(['business', 'private'])
      .range([[102,194,165], [141,160,203]])
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Dependencies & Data`
)});
  main.variable(observer("data")).define("data", async function(){return(
(await fetch('https://gist.githubusercontent.com/yarynam/a1a75a1400ca891db4adaaf54ea7022b/raw/f36b4bce4e163c725c8ce1bf675fd95105d2523e/trips.json')).json()
)});
  main.variable(observer()).define(["html"], function(html){return(
html `<link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.1/mapbox-gl.css' rel='stylesheet' />
(Mapbox Stylesheet)`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("https://d3js.org/d3.v5.min.js")
)});
  main.variable(observer("mapboxgl")).define("mapboxgl", ["require"], async function(require)
{  
  let mapboxgl = await require('mapbox-gl')
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2lnZ3lmIiwiYSI6Il8xOGdYdlEifQ.3-JZpqwUa3hydjAJFXIlMA'
  return mapboxgl
}
);
  main.variable(observer("deck")).define("deck", ["require"], function(require){return(
require('deck.gl@6.2.3/deckgl.min.js')
)});
  return main;
}
