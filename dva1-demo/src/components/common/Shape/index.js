/* Use Case
import ShapeMap from '../../components/common/Shape';

<ShapeMap data={shape} height={400} />
*/
import { default as React, Component } from 'react';
import { Spin } from 'antd';
import { withGoogleMap, GoogleMap, Circle, Rectangle, InfoWindow } from 'react-google-maps';
import fancyMapStyles from './fancyMapStyles.json';

const ShowShape = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={14}
    center={props.center}
    defaultOptions={{ styles: fancyMapStyles }}
  >
    {props.infoCenter && props.showInfo && (
      <InfoWindow onCloseClick={() => props.onCircleClose()} position={props.infoCenter}>
        <div>{props.content}</div>
      </InfoWindow>
    )}
    {props.data && props.data.type === 'rect' && (
      <Rectangle
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
          clickable: false,
          draggable: false,
          editable: false,
          zIndex: 3,
        }}
      />
    )}
    {props.data && props.data.type === 'circle' && (
      <Circle
        center={{ lat: props.data.lat, lng: props.data.lng }}
        radius={props.data.radius}
        options={{
          fillColor: '#108ee9',
          fillOpacity: 0.3,
          strokeColor: '#108ee9',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          clickable: false,
          draggable: false,
          editable: false,
          zIndex: 3,
        }}
      />
    )}
  </GoogleMap>
));

export default class ShapeExample extends Component {

  state = {
    center: { lat: 39.992, lng: 116.481 },
    // infoCenter: { lat: 39.995, lng: 116.473 },
    // content: (<div><div>Name: aaaa</div><div>Alarm: Everyday</div><div>Cycle: 10:00~18:00</div></div>),
    loading: false,
    showInfo: true,
  };

  componentWillReceiveProps(obj) {
    let temp = null;
    if (obj.data.type === 'circle') {
      temp = { lat: obj.data.lat, lng: obj.data.lng };
    } else if (obj.data.type === 'rect') {
      temp = { lat: obj.data.lat.min, lng: obj.data.lng.min };
    }
    this.setState({
      center: temp,
    })
  }

  handleMapMounted = this.handleMapMounted.bind(this);
  handleCircleClick = this.handleCircleClick.bind(this);
  handleCircleClose = this.handleCircleClose.bind(this);

  handleMapMounted(map) {
    this._map = map;
  }

  handleCircleClick(obj) {
    this.setState({
      showInfo: true,
      infoCenter: obj,
    })
  }

  handleCircleClose() {
    this.setState({
      showInfo: false,
    })
  }

  render() {
    return (
      <Spin tip="Loading..." spinning={this.state.loading}>
        <div style={{ height: this.props.height, border: '1px solid #dfdede' }}>
          <ShowShape
            containerElement={
              <div style={{ height: '100%' }} />
            }
            mapElement={
              <div style={{ height: '100%' }} />
            }
            onMapMounted={this.handleMapMounted}
            onCircleClick={this.handleCircleClick}
            center={this.state.center}
            cicleCenter={this.state.cicleCenter}
            infoCenter={this.state.infoCenter}
            radius={this.state.radius}
            content={this.state.content}
            showInfo={this.state.showInfo}
            onCircleClose={this.handleCircleClose}
            data={this.props.data}
          />
        </div>
      </Spin>
    );
  }
}
