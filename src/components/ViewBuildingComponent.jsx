import React, { Component } from "react";
import BuildingService from "../services/BuildingService";

import Carousel from "react-bootstrap/Carousel";



import { Map, Marker, GoogleApiWrapper } from "google-maps-react";


import "./building.css";

class ViewBuildingComponent extends Component {
  constructor(props) {
    super(props);

    this.key = "AIzaSyBsT1KvhCCOMn87K4n7-pafxORoIVS8PQQ";

    this.state = {
      id: this.props.match.params.id,
      building: {},
    };
  }

  componentDidMount() {
    BuildingService.getBuildingById(this.state.id).then((res) => {
      this.setState({ building: res.data });
    });
  }

  render() {
    return (
      <div className="building-detail">
        <h1 className="building-detail--title">{this.state.building.name}</h1>

        <div className="row">
          <div className="building-detail--text column">
            <div className="building-detail--item">
              <a
                href={this.state.building.link2gis}
                rel="noopener"
                target="_blank"
              >
            
                <h3> {this.state.building.address}</h3>
              </a>
            </div>
            <div className="building-detail--item">
              <h4>Описание: {this.state.building.description}</h4>
            </div>
            <div className="building-detail--item">
              <h4>Количество этажей: {this.state.building.quantityOfFloor}</h4>
            </div>
            <div className="building-detail--item">
              <h4>Общая площадь: {this.state.building.totalArea}</h4>
            </div>
            <div className="building-detail--item">
              <h4>Полезная площадь: {this.state.building.usableArea}</h4>
            </div>
            <div className="building-detail--item">
              <h4>Год постройки: {this.state.building.yearOfConstruction}</h4>
            </div>
          </div>

          <div className="building-detail--map">
            <Map
              google={this.props.google}
              bootstrapURLKeys={{ key: this.key }}
              initialCenter={{
                lat: 42.87,
                lng: 74.59,
              }}
              zoom={15}
              onClick={this.onMapClicked}
            >
              {/* <Marker position={{ this.state.building.coords.latitude, this.state.building.coords.longitude }} /> */}
              <Marker 
                position={ {lat: 42.8754332, lng: 74.6016192} }
              />

            </Map>
          </div>
        </div>

        <div className="building-detail--slider">
          {this.state.building.image ? (
            <Carousel fade interval={5000}>
              {this.state.building.image?.map((item) => {
                return (
                  <Carousel.Item>
                    <div className="slider-row">
                      <img
                        className="d-block w-15 slider-img"
                        src={item}
                        alt=""
                      />
                      <img
                        className="d-block w-15 slider-img"
                        src={item}
                        alt=""
                      />
                      <img
                        className="d-block w-15 slider-img"
                        src={item}
                        alt=""
                      />
                      <img
                        className="d-block w-15 slider-img"
                        src={item}
                        alt=""
                      />
                    </div>
                    <Carousel.Caption>
                      <p>Фотографии здания</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          ) : null}
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBsT1KvhCCOMn87K4n7-pafxORoIVS8PQQ",
  language: "RU",
})(ViewBuildingComponent);
