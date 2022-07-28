import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Place from "../Place/Place";
import "./map.css";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import navigate from "../../containers/icons/back.png";
import { Link } from "react-router-dom";

const keys = require("../../keys");
const API_KEY = keys.googleAPIKey;

export class MyMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 53.8008,
      longitude: -1.5491,
      zoom: 15,
      showingInfoWindow: false,
      center: {
        lat: 51.5074,
        lng: -0.12,
      },
      loading: true,
      displayMarkers: false,
    };

    this.getLocation = this.getLocation.bind(this);
    this.centerMap = this.centerMap.bind(this);
    this.setCurrentLocation = this.setCurrentLocation.bind(this);
    this.setDefaultLocation = this.setDefaultLocation.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { lat: prevLat, lng: prevLng } = prevState.center;
    const { lat, lng } = this.state.center;
    const [latitude, longitude] = this.props.centerCoordinates;

    if (prevProps.loading && !this.props.loading) {
      this.centerMap({ coords: { latitude, longitude } });
      this.getLocation(false);
    }

    if (prevLat !== lat || prevLng !== lng) {
      const isMobile = window.matchMedia("(max-width: 1000px)").matches;
      if (!isMobile) {
        const getNw = this.map.getBounds().getNorthEast();
        const getSe = this.map.getBounds().getSouthWest();
        const initialBounds = {
          ne: { lat: getNw.lat(), lng: getNw.lng() },
          sw: { lat: getSe.lat(), lng: getSe.lng() },
        };
        this.props.setBounds(initialBounds);
      }
    }
  }

  setDefaultLocation(errorObj, centerMap) {
    const { latitude, longitude } = this.state;
    this.setState({ fetchingUserLocation: false });
    centerMap && this.centerMap({ coords: { latitude, longitude } });
  }

  onMapClicked() {
    this.searchBox.blur();
  }

  getLocation(centerMap = true) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.setCurrentLocation(position, centerMap),
        (errorObj) => this.setDefaultLocation(errorObj, centerMap),
        { enableHighAccuracy: true, maximumAge: 10000 }
      );
      this.setState({ fetchingUserLocation: true });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  setCurrentLocation(position, centerMap) {
    const { setUserCoordinates } = this.props;
    const { latitude, longitude } = position.coords;

    this.setState({
      searchedPlace: null,
      showingInfoWindow: false,
      fetchingUserLocation: false,
    });
    setUserCoordinates([latitude, longitude]);

    centerMap &&
      this.centerMap({
        coords: {
          longitude,
          latitude: latitude + Math.random() / 1000,
        },
      });
  }

  centerMap(position, searchedPlace = false, doFetchData = true) {
    const {
      setCenterCoordinates,
      setHoverCoordinates,
      fetchData,
      miles,
    } = this.props;
    const { latitude: lat, longitude: long } = position.coords;

    if (!searchedPlace) {
      this.setState({ searchedPlace: null });
    }

    setCenterCoordinates([lat, long]);
    setHoverCoordinates([lat, long]);

    doFetchData && fetchData({ lat, long, miles });
  }

  render() {
    const { fetchingUserLocation, displayMarkers } = this.state;

    const {
      hoverCoordinates,
      setCarouselSlide,
      centerCoordinates,
      userCoordinates,
      miles,
      jwt,
      displayCarousel,
      displaySearchBar,
      setBounds,
      history,
    } = this.props;

    const obj = {
      lat: centerCoordinates[0],
      long: centerCoordinates[1],
      miles,
      jwt,
    };

    const mapCenter = {
      lat: centerCoordinates[0],
      lng: centerCoordinates[1],
    };
    const isMobile = window.matchMedia("(max-width: 1000px)").matches;
    if (isMobile) {
      mapCenter.lat -= 0.002;
    }

    return (
      <Fragment>
        {displaySearchBar && (
          <SearchBar
            map={this.map}
            getNode={(node) => (this.searchBox = node)}
            displayCarousel={displayCarousel}
            onClickButton={() => {
              this.getLocation();
              displayCarousel(false);
            }}
            setSearchedPlace={(searchedPlace) => this.setState(searchedPlace)}
            fetchingUserLocation={fetchingUserLocation}
            data={this.props.data}
            centerMap={this.centerMap}
            setCarouselSlide={setCarouselSlide}
            history={history}
          />
        )}

        {displaySearchBar && (
          <div className="mapNav">
            <Link to={`/`} alt="back">
              <img src={navigate} className="bottomTextbackNavigation" />
            </Link>
          </div>
        )}

        <div className="map">
          {this.state.showingInfoWindow && (
            <Place
              onClick={() => {
                this.setState({ showingInfoWindow: false });
                displayCarousel(true);
              }}
              place={this.state.searchedPlace}
              onAdd={() => {
                this.props.fetchData(obj);
              }}
            />
          )}

          <GoogleMapReact
            zoom={this.state.zoom}
            bootstrapURLKeys={{ key: API_KEY, libraries: "places" }}
            center={mapCenter}
            onClick={this.onMapClicked}
            options={{
              disableDefaultUI: true,
              gestureHandling: "greedy",
              clickableIcons: false,
            }}
            onGoogleApiLoaded={(x) => {
              this.map = x.map;
              this.props.onMapsLoaded();
              window.places = new window.google.maps.places.PlacesService(
                x.map
              );
            }}
            resetBoundsOnResize={true}
            onChange={(x) => {
              setBounds(x.bounds);
            }}
            onTilesLoaded={() => {
              // this.state.zoom === 7 && this.setState({ zoom: 11 });
              this.setState({ displayMarkers: true });
              this.props.onMapReady();
            }}
            // onZoomAnimationEnd={() => {
            //   if (this.state.zoom === 11) {
            //     this.setState({ zoom: 15 });
            //   } else if (this.state.zoom === 15) {
            //     this.setState({ displayMarkers: true });
            //     this.props.onMapReady();
            //   }
            // }}
          >
            <Marker
              className="currentLocation"
              lat={userCoordinates[0]}
              lng={userCoordinates[1]}
            />

            {displayMarkers &&
              this.props.data.map((marker, i) => {
                const { coordinates } = marker.location;
                const { deals } = marker;
                let animate =
                  hoverCoordinates[0] === coordinates[0] &&
                  hoverCoordinates[1] === coordinates[1];

                return (
                  <Marker
                    className={animate ? "hovered" : "plainMarker"}
                    onClick={() => {
                      const position = {
                        coords: {
                          latitude: coordinates[0],
                          longitude: coordinates[1],
                        },
                      };
                      this.centerMap(position, false, false);
                      setCarouselSlide(i);
                    }}
                    key={i}
                    lat={coordinates[0]}
                    lng={coordinates[1]}
                    category={deals[0].category}
                  />
                );
              })}
          </GoogleMapReact>
        </div>
      </Fragment>
    );
  }
}

export default MyMap;
