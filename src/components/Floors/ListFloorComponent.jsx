import React, { Component } from "react";
import BuildingService from "../../services/BuildingService";
import pin from "../../assets/pin.png";

import "./floor.css";

class ListBuildingComponent extends Component {
  constructor(props) {
    super(props);

    this.id = window.location.search.split("?")[1];

    this.state = {
      floors: [],
    };

    this.goToCabinet = this.goToCabinet.bind(this);
  }

  goToCabinet(floorNum) {
    const cabinet = {
      buildingId: this.id,
      floorNum: floorNum,
    };
    this.props.history.push({ pathname: "/cabinet", state: cabinet });
  }

  componentDidMount() {
    BuildingService.getBuildingFloors(this.id).then((res) => {
      this.setState({ floors: res.data });
    });
  }

  render() {
    return (
      <div>
        <h1 className="text-center building--title">Список Этажей</h1>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <tbody>
              {this.state.floors.map((floor) => {
                return (
                  <tr key={floor}>
                    <td className="floor__item">
                      Этаж: {floor}
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => this.goToCabinet(floor)}
                        className="btn btn-info"
                      >
                        Кабинеты{" "}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListBuildingComponent;
