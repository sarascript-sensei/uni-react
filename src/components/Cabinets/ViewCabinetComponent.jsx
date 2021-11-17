import React, { Component } from "react";
import CabinetService from "../../services/CabinetService";

import Carousel from "react-bootstrap/Carousel";
// import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import pin from "../../assets/pin.png";

import "./cabinet.css";


class ViewCabinetComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            cabinet: {}
        }
    }

    componentDidMount(){
        CabinetService.getCabinetById(this.state.id).then( res => {
            this.setState({cabinet: res.data});
        })
    }

    render() {
        return (
            <div className="building-detail">
            <div className="row">
              <div className="building-detail--text column">
                <div className="building-detail--item">
                  <table className="table table-striped table-bordered">
                  <tbody>
        <tr>
          <th>Название: </th>
          <td>{this.state.cabinet.name}</td>
        </tr>
        <tr>
          <th>Номер: </th>
          <td>{this.state.cabinet.number}</td>
        </tr>
        <tr>
          <th>Описание: </th>
          <td>{this.state.cabinet.description}</td>
        </tr>
        </tbody>
        </table>
        <div className="building-detail--slider">
          {this.state.cabinet.image ? (
            <Carousel fade interval={5000}>
              {this.state.cabinet.image?.map((item) => {
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
                      <p>Фотографии кабинетов</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          ) : null}
            </div>
          </div>
        </div>
    </div>
</div>
    );
}
}

export default ViewCabinetComponent