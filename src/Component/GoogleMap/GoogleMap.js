import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,

  } from "react-google-maps";

  function handleCkickMarker(item, onClickMarker){
    onClickMarker({
      isView: true,
      marker: item
    })
  }


export const MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <>
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 49.44253, lng: 32.06207 }}
      onClick={props.setMarker}
    >
      <Marker
        position={props.marker}
        icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      />
      {props.fetchMarker && props.fetchMarker.map((item) => {
          return <Marker
              key={item.id}
              onClick={() => handleCkickMarker(item, props.onClickMarker)}
              position={{lat: item.latitude, lng: item.longitude}}
              icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
          ></Marker>
      })}
    </GoogleMap>
</>
  ));
  