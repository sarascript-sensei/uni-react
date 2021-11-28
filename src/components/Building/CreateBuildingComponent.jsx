import React, { Component } from "react";
import BuildingService from "../../services/BuildingService";

import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

const options = [
  { value: "SERVICE", label: "Обслуживаемые" },
  { value: "SELFSERVICE", label: "Самообслуживаемые" },
];

class CreateBuildingComponent extends Component {
  constructor(props) {
    super(props);
    const maxNumber = 3;
    this.key = "AIzaSyBsT1KvhCCOMn87K4n7-pafxORoIVS8PQQ";
    this.state = {
      id:
        this.props.location.search === ""
          ? null
          : window.location.search.split("?")[1],
      name: "",
      address: "",
      quantityOfFloor: "",
      totalArea: "",
      usableArea: "",
      yearOfConstruction: null,
      categoryId: null,
      description: "",
      image: '',
      link2gis: "",
      type: "",
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeAddressHandler = this.changeAddressHandler.bind(this);
    this.changeStagesHandler = this.changeStagesHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.saveOrUpdateBuilding = this.saveOrUpdateBuilding.bind(this);
    this.changeTotalAreaHandler = this.changeTotalAreaHandler.bind(this);
    this.changeUsableAreaHandler = this.changeUsableAreaHandler.bind(this);
    this.changeYearOfConstructionHandler =
      this.changeYearOfConstructionHandler.bind(this);
    this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
    this.changeTypeHandler = this.changeTypeHandler.bind(this);
  }

  // step 3

  componentDidMount() {
    // step 4
    if (this.state.id === null) {
      return;
    } else {
      BuildingService.getBuildingById(this.state.id).then((res) => {
        let building = res.data;
        this.setState({
          name: building.name,
          address: building.address,
          quantityOfFloor: building.quantityOfFloor,
          description: building.description,
          image: building.image,
          totalArea: building.totalArea,
          usableArea: building.usableArea,
          yearOfConstruction: building.yearOfConstruction,
          categoryId: building.categoryId,
          type: building.buildingType,
        });
      });
    }
  }
  saveOrUpdateBuilding = (e) => {
    e.preventDefault();
    let building = {
      name: this.state.name,
      address: this.state.address,
      quantityOfFloor: this.state.quantityOfFloor,
      description: this.state.description,
      imageLink: null,
      link: {
        lat: null,
        lng: null,
      },
      totalArea: this.state.totalArea,
      usableArea: this.state.usableArea,
      yearOfConstruction: this.state.yearOfConstruction,
      categoryId: this.state.categoryId,
      buildingType: this.state.type,
    };
    if (this.state.id === window.location.search.split("?")[1]) {
      BuildingService.updateBuilding(building, this.state.id).then((res) => {
        this.props.history.push("/buildings");
      });
    } else {
      BuildingService.createBuilding(building).then((res) => {
        this.props.history.push("/buildings");
      });
    }
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
  };

  changeAddressHandler = (event) => {
    this.setState({ address: event.target.value });
  };

  changeTypeHandler(e) {
    this.setState({ type: e.target.value });
  }

  changeTotalAreaHandler(e) {
    this.setState({ totalArea: e.target.value });
  }

  changeUsableAreaHandler(e) {
    this.setState({ usableArea: e.target.value });
  }

  changeYearOfConstructionHandler(e) {
    this.setState({ yearOfConstruction: e.target.value });
  }

  changeCategoryHandler(e) {
    this.setState({ categoryId: e.target.value });
  }

  changeStagesHandler = (event) => {
    this.setState({ quantityOfFloor: event.target.value });
  };

  changeDescriptionHandler = (e) => {
    this.setState({ description: e.target.value });
  };

  cancel() {
    this.props.history.push("/buildings");
  }

  getTitle() {
    if (this.state.id === null) {
      return <h3 className="text-center">Добавить здание</h3>;
    } else {
      return <h3 className="text-center">Обновить здание</h3>;
    }
  }
  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Название: </label>
                    <input
                      placeholder="Название"
                      name="name"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.changeNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Адрес: </label>
                    <input
                      placeholder="Адрес"
                      name="address"
                      className="form-control"
                      value={this.state.address}
                      onChange={this.changeAddressHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Количество этажей: </label>
                    <input
                      placeholder="Этажи"
                      name="stages"
                      className="form-control"
                      value={this.state.stages}
                      onChange={this.changeStagesHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Общая площадь: </label>
                    <input
                      placeholder="Площадь"
                      name="totalArea"
                      className="form-control"
                      value={this.state.totalArea}
                      onChange={this.changeTotalAreaHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Полезная площадь: </label>
                    <input
                      placeholder="Площадь"
                      name="usableArea"
                      className="form-control"
                      value={this.state.usableArea}
                      onChange={this.changeUsableAreaHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Год постройки: </label>
                    <input
                      placeholder="Год"
                      name="yearOfConstruction"
                      className="form-control"
                      value={this.state.yearOfConstruction}
                      onChange={this.changeYearOfConstructionHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Описание: </label>
                    <input
                      placeholder="Описание"
                      name="description"
                      className="form-control"
                      value={this.state.description}
                      onChange={this.changeDescriptionHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Категория здания: </label>
                    <select
                      onChange={(value) => this.changeCategoryHandler(value)}
                      placeholder="Выберите категорию здания"
                      className="form-control building--type"
                    >
                      <option>Выберите категорию здания</option>
                      <option value={1}>Административные</option>
                      <option value={2}>Квартира</option>
                      <option value={3}>Исторические</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label> Тип здания: </label>
                    <select
                      onChange={(value) => this.changeTypeHandler(value)}
                      placeholder="Выберите тип здания"
                      className="form-control building--type"
                    >
                      <option>Выберите тип здания</option>
                      <option value={options[0].value}>
                        {options[0].label}
                      </option>
                      <option value={options[1].value}>
                        {options[1].label}
                      </option>
                    </select>
                  </div>

                  <div className="building-create--map">
                    <Map
                      google={this.props.google}
                      bootstrapURLKeys={{ key: this.key }}
                      initialCenter={{
                        lat: 42.8754332,
                        lng: 74.6016192,
                      }}
                      zoom={15}
                      onClick={this.onMapClicked}
                    >
                      <Marker
                        position={{
                          lat: 42.8754332,
                          lng: 74.6016192,
                        }}
                      />
                      <Marker position={{ lat: 42.8754332, lng: 74.6016192 }} />
                    </Map>
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateBuilding}
                  >
                    Сохранить
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Отмена
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyBsT1KvhCCOMn87K4n7-pafxORoIVS8PQQ",
  language: "RU",
})(CreateBuildingComponent);
