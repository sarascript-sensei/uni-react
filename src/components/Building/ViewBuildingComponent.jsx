import React, { Component } from "react";

import BuildingService from "../../services/BuildingService";

import Carousel from "react-bootstrap/Carousel";

import pin from "../../assets/pin.png";

import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

import "./building.css";
import ListFloorComponent from "../Floors/ListFloorComponent";

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
              <table className="table table-striped table-bordered">
              <tbody>
    <tr>
      <th>Описание: </th>
      <td>{this.state.building.description}</td>
    </tr>
    <tr>
      <th>Количество этажей: </th>
      <td>{this.state.building.quantityOfFloor}</td>
    </tr>
    <tr>
      <th>Адрес: </th>
      <td>{this.state.building.address}</td>
    </tr>
    <tr>
      <th>Общая площадь: </th>
      <td>{this.state.building.totalArea}</td>
    </tr>
    <tr>
      <th>Полезная площадь: </th>
      <td>{this.state.building.usableArea}</td>
    </tr>
    <tr>
      <th>Год постройки: </th>
      <td>{this.state.building.yearOfConstruction}</td>
    </tr>
    </tbody>
    </table>
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
              <Marker
                position={{
                  lat: this.state.building.coords?.latitude
                    ? this.state.building.coords.latitude
                    : 42.8754332,
                  lng: this.state.building.coords?.longitude
                    ? this.state.building.coords.longitude
                    : 74.6016192,
                }}
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
                    <ListFloorComponent /> 
        </div>
      </div>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBsT1KvhCCOMn87K4n7-pafxORoIVS8PQQ",
  language: "RU",
})(ViewBuildingComponent);