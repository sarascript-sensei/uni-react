import React, { Component } from "react";
import BuildingService from "../../services/BuildingService";

import { Form } from "react-bootstrap";

import Select from "react-select";

import image from "../../assets/building.png";
import addIcon from "../../assets/add-image.png";
import editIcon from "../../assets/edit.png";
import trashIcon from "../../assets/trash.png";
import viewIcon from "../../assets/eye.png";

import "./building.css";

const options = [
  { value: "SERVICE", label: "Обслуживаемые" },
  { value: "SELFSERVICE", label: "Самообслуживаемые" },
];

class ListBuildingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buildings: [],
    };
    this.addBuilding = this.addBuilding.bind(this);
    this.editBuilding = this.editBuilding.bind(this);
    this.deleteBuilding = this.deleteBuilding.bind(this);
    this.filerBuilding = this.filerBuilding.bind(this);
  }

  deleteBuilding(id) {
    BuildingService.deleteBuilding(id).then((res) => {
      this.setState({
        buildings: this.state.buildings.filter(
          (building) => building.id !== id
        ),
      });
    });
  }
  viewBuilding(id) {
    this.props.history.push(`/view-building/${id}`);
  }
  goToFloors(id) {
    this.props.history.push({ pathname: `/floors/`, search: `${id}` });
  }
  editBuilding(id) {
    this.props.history.push({ pathname: `/add-building/`, search: `${id}` });
  }
  addImage(id) {
    this.props.history.push({ pathname: `/add-photo/`, search: `${id}` });
  }

  componentDidMount() {
    BuildingService.getBuilding().then((res) => {
      this.setState({ buildings: res.data });
    });
  }

  getBuildingbyCategory(id) {
    BuildingService.getBuildingbyCategori(id).then((res) => {
      this.setState({
        buildings: this.state.buildings.splice(this.state.buildings.length),
      });
      let data = [];
      data.push(res.data);
      this.setState({ buildings: data[0] });
    });
  }

  filerBuilding(value) {
    let data = [];
    this.state.buildings.map((item) => {
      if (value.target.value === item.buildingType) {
        this.setState({
          buildings: this.state.buildings.splice(this.state.buildings.length),
        });

        data.push(item);
        this.setState({ buildings: data });

        const filtered = this.state.buildings.filter(
          item => value.target.value === item.buildingType
        );
      
        this.setState({ buildings: filtered });
      }
      else{
        
      }
    });
  }

  addBuilding() {
    this.props.history.push("/add-building/");
  }

  render() {
    return (
      <div>
        <h1 className="text-center building--title">Список зданий</h1>
        <div className="building--filter">
          <button
            className="btn btn-primary"
            onClick={() => {
              this.getBuildingbyCategory(1);
            }}
          >
            {" "}
            Административные
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              this.getBuildingbyCategory(2);
            }}
          >
            {" "}
            Жилые
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              this.getBuildingbyCategory(3);
            }}
          >
            {" "}
            Исторические
          </button>
          <div className="col-md-4">
            <div className="form-group">
              <select
                onChange={(value) => {
                  this.filerBuilding(value);
                }}
                placeholder="Выберите тип здания"
                className="form-control building--type"
              >
                <option>Выберите тип здания</option>
                <option value={options[0].value}>{options[0].label}</option>
                <option value={options[1].value}>{options[1].label}</option>
              </select>
            </div>
          </div>
          <button className="btn btn-primary" onClick={this.addBuilding}>
            Добавить здание
          </button>
        </div>
        <br></br>

        <article class="container mt-5 mb-5">
          {this.state.buildings.map((building) => (
            <div key={building.id}>
              <aside class="col-md-3"></aside>
              <div class="container mt-5 mb-5">
                <div class="d-flex justify-content-center row">
                  <div class="building--list-item">
                    <div class="building--list-block p-2 border rounded">
                      <div class="building--list-item--img">
                        {building.imageLink ? (
                          <img
                            class="img-fluid img-responsive rounded product-image"
                            src={building.imageLink[0]}
                          />
                        ) : (
                          <img
                            class="img-fluid img-responsive rounded product-image"
                            src={image}
                          />
                        )}
                      </div>
                      <div class="building--list-item--text col-md-6 mt-1">
                        <div class="building--list-item--text--info">
                          <h3
                            onClick={() => this.viewBuilding(building.id)}
                            class=""
                          >
                            {building.name}
                          </h3>
                          <div class="text-justify text-truncate para mb-0">
                            {building.address}
                          </div>
                          <p class="text-justify text-truncate para mb-0">
                            {building.description}
                          </p>
                        </div>
                      </div>

                      <div class="building--list-item--icons">
                        <span
                          className="building--list-item--icons--item"
                          onClick={() => this.addImage(building.id)}
                        >
                          <img src={addIcon} alt="" />
                        </span>
                        <span
                          className="building--list-item--icons--item"
                          onClick={() => this.editBuilding(building.id)}
                        >
                          <img src={editIcon} alt="" />
                        </span>
                        <span
                          className="building--list-item--icons--item"
                          onClick={() => this.deleteBuilding(building.id)}
                        >
                          <img src={trashIcon} alt="" />
                        </span>
                        <span
                          className="building--list-item--icons--item"
                          onClick={() => this.viewBuilding(building.id)}
                        >
                          <img src={viewIcon} alt="" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </article>
      </div>
    );
  }
}

export default ListBuildingComponent;
