const deckgl = new deck.DeckGL({
  mapboxAccessToken: 'pk.eyJ1IjoibmlzYW50aWwiLCJhIjoiY2pnNTlyem5xN2hvMDMzczJjbDlncTA5ZSJ9.G4poDRUAwKLBYoKHaSlw7A',
  mapStyle: 'https://free.tilehosting.com/styles/darkmatter/style.json?key=U0iNgiZKlYdwvgs9UPm1',
  longitude: -1.4157,
  latitude: 52.2324,
  zoom: 6,
  minZoom: 5,
  maxZoom: 15,
  pitch: 40.5
});

let data = null;

const MAPBOX_TOKEN = const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line; // eslint-disable-line

const DATA_URL = {
  BUILDINGS:
    d3.csv('https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/buildings.json'), // eslint-disable-line
  TRIPS:
    d3.csv('https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/trips/trips.json') // eslint-disable-line
};

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

export const INITIAL_VIEW_STATE = {
  longitude: -74,
  latitude: 40.72,
  zoom: 13,
  maxZoom: 16,
  pitch: 45,
  bearing: 0
};

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };
  }

  componentDidMount() {
    this._animate();
  }

  componentWillUnmount() {
    if (this._animationFrame) {
      window.cancelAnimationFrame(this._animationFrame);
    }
  }

  _animate() {
    const {
      loopLength = 1800, // unit corresponds to the timestamp in source data
      animationSpeed = 30 // unit time per second
    } = this.props;
    const timestamp = Date.now() / 1000;
    const loopTime = loopLength / animationSpeed;

    this.setState({
      time: ((timestamp % loopTime) / loopTime) * loopLength
    });
    this._animationFrame = window.requestAnimationFrame(this._animate.bind(this));
  }

  _renderLayers() {
    const {buildings = DATA_URL.BUILDINGS, trips = DATA_URL.TRIPS, trailLength = 180} = this.props;

const layers = [
      new deck.TripsLayer({
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
      new deck.PolygonLayer({
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

render() {
    const {viewState, controller = true, baseMap = true} = this.props;

  return (
      <DeckGL
        layers={this._renderLayers()}
        initialViewState={INITIAL_VIEW_STATE}
        viewState={viewState}
        controller={controller}
      >
        {baseMap && (
          <StaticMap
            reuseMaps
            mapStyle="mapbox://styles/mapbox/dark-v9"
            preventStyleDiffing={true}
            mapboxApiAccessToken={MAPBOX_TOKEN}
          />
  
  deckgl.setProps({
    layers: [TripsLayer, PolygonLayer]
  });
}

  renderLayer();
});
