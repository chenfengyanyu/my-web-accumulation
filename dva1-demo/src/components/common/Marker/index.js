/* Use Case
import ShapeMap from '../../components/common/Shape';

<ShapeMap data={shape} height={400} />
*/
import { default as React, Component } from 'react';
import { Spin } from 'antd';
import canUseDOM from 'can-use-dom';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import fancyMapStyles from './fancyMapStyles.json';
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer';

const ShowMarker = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={13}
    center={props.center}
    defaultOptions={{ styles: fancyMapStyles }}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          position={{ lat: marker.sensorData.lonlat[1], lng: marker.sensorData.lonlat[0] }}
          key={marker.id}
          icon={{
            url: `/assets/img/${marker.status === 1 ? 'blue' : (marker.status === 2 ? 'yellow' : 'black')}.png`,
            size: new google.maps.Size(25, 25),
            origin: new google.maps.Point(0, 0),
          }}
          animation={google.maps.Animation.DROP}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation
  : ({
    getCurrentPosition(success, failure) {
      failure('Your browser doesn\'t support geolocation.');
    },
  })
);

export default class MarkerExample extends Component {
  state = {
    center: null,
    loading: false,
  };
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
  render() {
    return (
      <Spin tip="Loading..." spinning={this.state.loading}>
        <div style={{ height: this.props.height }}>
          <ShowMarker
            containerElement={
              <div style={{ height: '100%' }} />
            }
            mapElement={
              <div style={{ height: '100%' }} />
            }
            center={this.state.center}
            markers={this.props.markers}
          />
        </div>
      </Spin>
    );
  }
}
