const deckgl = new deck.DeckGL({
  mapboxAccessToken: '',
  mapStyle: 'https://free.tilehosting.com/styles/darkmatter/style.json?key=U0iNgiZKlYdwvgs9UPm1',
  longitude: -1.4157,
  latitude: 52.2324,
  zoom: 6,
  minZoom: 5,
  maxZoom: 15,
  pitch: 40.5
});

let data = null;

const OPTIONS = ['radius', 'coverage', 'upperPercentile'];

const COLOR_RANGE = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const LIGHT_SETTINGS = {
  lightsPosition: [-74.05, 40.7, 8000, -73.5, 41, 5000],
  ambientRatio: 0.05,
  diffuseRatio: 0.6,
  specularRatio: 0.8,
  lightsStrength: [2.0, 0.0, 0.0, 0.0],
  numberOfLights: 2
};

OPTIONS.forEach(key => {
  document.getElementById(key).oninput = renderLayer;
});

function renderLayer () {
  const options = {};
  OPTIONS.forEach(key => {
    const value = document.getElementById(key).value;
    document.getElementById(key + '-value').innerHTML = value;
    options[key] = value;
  });

const layers = [
      new TripsLayer({
        id: 'trips',
        data: trips,
        getPath: d => d.segments,
        getColor: d => (d.vendor === 0 ? [253, 128, 93] : [23, 184, 190]),
        opacity: 0.3,
        strokeWidth: 2,
        trailLength,
        currentTime: time
      }),
        }),
      new PolygonLayer({
        id: 'buildings',
        data: buildings,
        extruded: true,
        wireframe: false,
        fp64: true,
        opacity: 0.5,
        getPolygon: f => f.polygon,
        getElevation: f => f.height,
        getFillColor: f => [74, 80, 87],
        lightSettings: LIGHT_SETTINGS
      })
    ];

  deckgl.setProps({
    layers: [TripsLayer, PolygonLayer]
  });
}

d3.csv('https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/trips.json',
   (error, response) => {
  data = response.map(d => [Number(d.lng), Number(d.lat)]);
  renderLayer();
});
