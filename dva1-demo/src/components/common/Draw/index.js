/* Use Case
import DrawMap from '../../components/common/Draw/';
const DrawCofig = {
  height: 400,
  data: null,
  onShape: this.handleShape,
}
<DrawMap {...DrawConfig} />
*/
import { default as React, Component } from 'react';
import { Icon } from 'antd';
import canUseDOM from 'can-use-dom';
import { withGoogleMap, GoogleMap, Marker, Rectangle, Circle } from 'react-google-maps';
import DrawingManager from './drawingManager';
import SearchBox from 'react-google-maps/lib/places/SearchBox';
import fancyMapStyles from './fancyMapStyles.json';
import styles from './index.less';

const _ = require('lodash');

const INPUT_STYLE = {
  boxSizing: 'border-box',
  MozBoxSizing: 'border-box',
  border: '1px solid transparent',
  width: '240px',
  height: '32px',
  marginTop: '27px',
  padding: '0 12px',
  borderRadius: '1px',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
  fontSize: '13px',
  outline: 'none',
  textOverflow: 'ellipses',
};

const markerImage = {
  // url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  url: '/assets/img/box1.png',
  size: new google.maps.Size(196, 196),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(98, 98),
};

const DrawingExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    defaultOptions={{ styles: fancyMapStyles }}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_CENTER}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder="Enter the keyword"
      inputStyle={INPUT_STYLE}
    />
    {props.markers.map((marker, index) => (
      <Marker
        position={marker.position}
        key={index}
        icon={markerImage}
        animation={google.maps.Animation.DROP}
      />
    ))}
    {props.data && props.data.type === 'rect' && (
      <Rectangle
        ref={props.onRectMounted}
        bounds={{
          north: props.data.lat.max,
          south: props.data.lat.min,
          east: props.data.lng.max,
          west: props.data.lng.min,
        }}
        options={{
          fillColor: '#108ee9',
          fillOpacity: 0.3,
          strokeColor: '#108ee9',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          clickable: true,
          draggable: true,
          editable: true,
          zIndex: 3,
        }}
        onBoundsChanged={props.onRectInfo}
      />
    )}
    {props.data && props.data.type === 'circle' && (
      <Circle
        ref={props.onCircleMounted}
        center={{ lat: props.data.lat, lng: props.data.lng }}
        radius={props.data.radius}
        options={{
          fillColor: '#108ee9',
          fillOpacity: 0.3,
          strokeColor: '#108ee9',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          clickable: true,
          draggable: true,
          editable: true,
          zIndex: 3,
        }}
        onCenterChanged={props.onCircleInfo}
        onRadiusChanged={props.onCircleInfo}
      />
    )}
    <DrawingManager
      ref={props.onOverlayMounted}
      defaultOptions={{
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_CENTER,
          // drawingModes: ['circle', 'rectangle', 'polygon'],
          drawingModes: ['circle', 'rectangle'],
        },
        circleOptions: {
          fillColor: '#108ee9',
          fillOpacity: 0.3,
          strokeWeight: 2,
          strokeColor: '#108ee9',
          strokeOpacity: 0.8,
          clickable: true,
          draggable: true,
          editable: true,
          zIndex: 1,
        },
        rectangleOptions: {
          fillColor: '#108ee9',
          fillOpacity: 0.3,
          strokeWeight: 2,
          strokeColor: '#108ee9',
          strokeOpacity: 0.8,
          clickable: true,
          draggable: true,
          editable: true,
          zIndex: 2,
        },
        polygonOptions: {
          fillColor: '#108ee9',
          fillOpacity: 0.3,
          strokeWeight: 2,
          strokeColor: '#108ee9',
          strokeOpacity: 0.8,
          clickable: false,
          draggable: true,
          editable: true,
          zIndex: 3,
        },
      }}
      onOverlayComplete={props.onOverlayComplete}
      onDrawingModeChanged={props.onDrawingModeChanged}
    />
    <div className={styles.clearbtn} onClick={props.onClearOverlay}>
      <Icon type="sync" />
    </div>
  </GoogleMap>
));

let shapes = [];
let clearFlag = {};
const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation
  : ({
    getCurrentPosition(success, failure) {
      failure('Your browser doesn\'t support geolocation.');
    },
  })
);
export default class DrawingExample extends Component {
  state = {
    bounds: null,
    center: null,
    markers: [],
    data: this.props.data ? this.props.data : null,
  }
  componentWillMount() {
    geolocation.getCurrentPosition((position) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      });
    }, (reason) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: 39.994,
          lng: 116.474,
        },
      });
    });
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }
  isUnmounted = false;
  handleMapMounted = this.handleMapMounted.bind(this);
  handleOverlayMounted = this.handleOverlayMounted.bind(this);
  handleOverlayComplete = this.handleOverlayComplete.bind(this);
  handleDrawingModeChanged = this.handleDrawingModeChanged.bind(this);
  handleClearOverlay = this.handleClearOverlay.bind(this);
  handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
  handlePlacesChanged = this.handlePlacesChanged.bind(this);
  handleBoundsChanged = this.handleBoundsChanged.bind(this);
  handleRectInfo = this.handleRectInfo.bind(this);
  handleRectMounted = this.handleRectMounted.bind(this);
  handleCircleInfo = this.handleCircleInfo.bind(this);
  handleCircleMounted = this.handleCircleMounted.bind(this);

  handleMapMounted(map) {
    this._map = map;
  }

  handleOverlayMounted(manager) {
    this._drawingManager = manager;
  }

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }

  handleOverlayComplete(event) {
    let newShape = event.overlay;
    clearFlag = event.overlay;
    newShape.type = event.type;
    shapes.push(newShape);

    if (this._drawingManager.getDrawingMode()) {
      this._drawingManager.setDrawingMode(null);
    }

    let tempObj = [];

    if (newShape.type === 'polygon') {
      let points = newShape.getPaths().b[0].b;
      points.map((item, i) => {
        tempObj.push({
          lat: item.lat(),
          lng: item.lng(),
        });
        return tempObj;
      })
      google.maps.event.addListener(newShape.getPath(), 'set_at', () => {
        tempObj = [];
        newShape.getPaths().b[0].b.map((item, i) => {
          tempObj.push({
            lat: item.lat(),
            lng: item.lng(),
          });
          return tempObj;
        })
        this.props.onShape(tempObj);
      });

      google.maps.event.addListener(newShape.getPath(), 'insert_at', () => {
        tempObj = [];
        newShape.getPaths().b[0].b.map((item, i) => {
          tempObj.push({
            lat: item.lat(),
            lng: item.lng(),
          });
          return tempObj;
        })
        this.props.onShape(tempObj);
      });
    } else if (newShape.type === 'rectangle') {
      // console.log(newShape.getBounds());
      tempObj = {
        type: 'rect',
        lat: {
          max: Math.max(newShape.getBounds().f.f, newShape.getBounds().f.b),
          min: Math.min(newShape.getBounds().f.f, newShape.getBounds().f.b),
        },
        lng: {
          max: Math.max(newShape.getBounds().b.f, newShape.getBounds().b.b),
          min: Math.min(newShape.getBounds().b.f, newShape.getBounds().b.b),
        },
      }
      google.maps.event.addListener(newShape, 'bounds_changed', () => {
        Object.assign(tempObj, {
          lat: {
            max: Math.max(newShape.getBounds().f.f, newShape.getBounds().f.b),
            min: Math.min(newShape.getBounds().f.f, newShape.getBounds().f.b),
          },
          lng: {
            max: Math.max(newShape.getBounds().b.f, newShape.getBounds().b.b),
            min: Math.min(newShape.getBounds().b.f, newShape.getBounds().b.b),
          },
        })
        this.props.onShape(tempObj);
      });
    } else if (newShape.type === 'circle') {
      tempObj = {
        type: 'circle',
        radius: newShape.getRadius(),
        lat: newShape.getCenter().lat(),
        lng: newShape.getCenter().lng(),
      }
      google.maps.event.addListener(newShape, 'radius_changed', () => {
        tempObj.radius = newShape.getRadius();
        this.props.onShape(tempObj);
      });
      google.maps.event.addListener(newShape, 'center_changed', () => {
        Object.assign(tempObj, {
          lat: newShape.getCenter().lat(),
          lng: newShape.getCenter().lng(),
        })
        this.props.onShape(tempObj);
      });
    }

    this.props.onShape(tempObj);
  }

  handleDrawingModeChanged() {
    if (this._drawingManager.getDrawingMode() != null) {
      for (let i = 0; i < shapes.length; i++) {
        shapes[i].setMap(null);
      }
      shapes = [];
      this.setState({ data: null });
    }
  }

  handleClearOverlay() {
    this.setState({ data: null });
    this._drawingManager.setDrawingMode(null);
    clearFlag.setMap && clearFlag.setMap(null);
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter(),
    });
  }

  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();
    const markers = places.map(place => ({
      position: place.geometry.location,
    }));
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;
    this.setState({
      center: mapCenter,
      markers,
    });
  }

  handleRectMounted(rect) {
    this._rect = rect;
  }

  handleRectInfo() {
    let rectInfo = {
      type: 'rect',
      lat: {
        max: Math.max(this._rect.getBounds().f.f, this._rect.getBounds().f.b),
        min: Math.min(this._rect.getBounds().f.f, this._rect.getBounds().f.b),
      },
      lng: {
        max: Math.max(this._rect.getBounds().b.f, this._rect.getBounds().b.b),
        min: Math.min(this._rect.getBounds().b.f, this._rect.getBounds().b.b),
      },
    }
    this.props.onShape(rectInfo);
  }

  handleCircleMounted(circle) {
    this._circle = circle;
  }

  handleCircleInfo() {
    let circleInfo = {
      type: 'circle',
      radius: this._circle.getRadius(),
      lat: this._circle.getCenter().lat(),
      lng: this._circle.getCenter().lng(),
    };
    this.props.onShape(circleInfo);
  }

  render() {
    return (
      <div style={{ height: this.props.height, position: 'relative' }}>
        <DrawingExampleGoogleMap
          containerElement={
            <div style={{ height: '100%' }} />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          onMapMounted={this.handleMapMounted}
          onOverlayMounted={this.handleOverlayMounted}
          center={this.state.center}
          onOverlayComplete={this.handleOverlayComplete}
          onDrawingModeChanged={this.handleDrawingModeChanged}
          onClearOverlay={this.handleClearOverlay}
          onSearchBoxMounted={this.handleSearchBoxMounted}
          onPlacesChanged={this.handlePlacesChanged}
          onBoundsChanged={this.handleBoundsChanged}
          markers={this.state.markers}
          data={this.state.data}
          onRectInfo={this.handleRectInfo}
          onRectMounted={this.handleRectMounted}
          onCircleInfo={this.handleCircleInfo}
          onCircleMounted={this.handleCircleMounted}
        />
      </div>
    );
  }
}
