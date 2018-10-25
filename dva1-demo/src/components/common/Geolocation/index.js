/* Use Case
import Geolocation from '../../components/common/Geolocation/';

const geoCfg = {
  desc: 'describe',
  lonlat: {
    lat: -122.214,
    lng: 37.772,
  },
}

<Geolocation {...geoCfg} />
*/
import canUseDOM from 'can-use-dom';
import raf from 'raf';
import { default as React, Component } from 'react';
import { Spin } from 'antd';
import { withGoogleMap, GoogleMap, Circle, Marker, InfoWindow } from 'react-google-maps';

const markerImage = {
  // url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  url: '/assets/img/blue.png',
  size: new google.maps.Size(19, 23),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(9, 15),
};
const GeolocationExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    center={props.center}
  >
    {props.info && (
      <InfoWindow position={props.center} onCloseClick={() => props.onMarkerClose()}>
        <div>
          <div>设备信息</div>
          <div style={{ borderTop: '1px solid #ccc', paddingTop: '5px', marginTop: '5px' }}>名称：{props.item.deviceName || '-'}</div>
          <div>设备号：{props.item.sn || '-'}</div>
          <div>电量：{props.item.sensorData && props.item.sensorData.battery ? `${props.item.sensorData.battery}%` : '-'}</div>
          <div>更新时间：{props.item.updatedTime || '-'}</div>
          <div>标签：{(props.item.tags && props.item.tags.length > 0) || '-'}</div>
        </div>
      </InfoWindow>
    )}
    {props.center && (
      <span>
        <Marker
          position={props.center}
          icon={markerImage}
          animation={google.maps.Animation.DROP}
          onClick={() => props.onMarkerClick()}
        />
        <Circle
          center={props.center}
          radius={props.radius}
          options={{
            fillColor: 'black',
            fillOpacity: 0.20,
            strokeColor: 'black',
            strokeOpacity: 0.6,
            strokeWeight: 2,
          }}
        />
      </span>
    )}
  </GoogleMap>
));

export default class GeolocationExample extends Component {

  state = {
    center: null,
    content: null,
    radius: 4000,
    loading: true,
    showInfo: true,
  };

  componentDidMount() {
    const tick = () => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({ radius: Math.max(this.state.radius - 20, 0) });

      if (this.state.radius > 1000) {
        raf(tick);
        this.setState({ loading: false });
      }
    };
    raf(tick);
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  isUnmounted = false;
  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleMarkerClose = this.handleMarkerClose.bind(this);

  handleMarkerClick() {
    this.setState({
      showInfo: true,
    })
  }

  handleMarkerClose() {
    this.setState({
      showInfo: false,
    })
  }

  render() {
    return (
      <div style={{ height: this.props.height ? this.props.height : 400 }}>
        <GeolocationExampleGoogleMap
          containerElement={
            <div style={{ height: '100%' }} />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          center={this.props.lonlat}
          content={this.props.desc}
          radius={this.state.radius}
          info={this.state.showInfo}
          item={this.props.item}
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
        />
      </div>
    );
  }
}
