import React, { Component } from "react";
import CabinetService from "../../services/CabinetService";

import Carousel from "react-bootstrap/Carousel";

import "./cabinet.css";

class ViewCabinetComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: window.location.search.split("?")[1],
      cabinet: [],
    };
  }

  componentDidMount() {
    CabinetService.getCabinetById(this.state.id).then((res) => {
      console.log(res.data);
      this.setState({ cabinet: res.data });
      console.log(this.state.cabinet);
    });
  }

  render() {
    return (
      <div className="building-detail">
        <h1 className="building-detail--title">{this.state.cabinet.name}</h1>

        <div className="row">
          <div className="cabinet-detail--text column">
            {/* <div className="building-detail--item">
              <h4>
                Описание:{" "}
                {this.state.cabinet.description
                  ? this.state.cabinet.description
                  : "-"}
              </h4>
            </div>
            <div className="building-detail--item">
              <h4>
                Количество этажей:{" "}
                {this.state.cabinet.floorNumber
                  ? this.state.cabinet.floorNumber
                  : "-"}
              </h4>
            </div> */}
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <th>Описание: </th>
                  <td>
                    {this.state.cabinet.description
                      ? this.state.cabinet.description
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <th>Количество этажей: </th>
                  <td>
                    {this.state.cabinet.floorNumber
                      ? this.state.cabinet.floorNumber
                      : "-"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="building-detail--slider">
          {this.state.cabinet.urlImage ? (
            <Carousel fade interval={5000}>
              {this.state.cabinet.urlImage?.map((item) => {
                return (
                  <Carousel.Item>
                    <div className="slider-row">
                      <img
                        className="d-block w-15 slider-img"
                        src={item}
                        alt=""
                      />
                    </div>
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

export default ViewCabinetComponent;
