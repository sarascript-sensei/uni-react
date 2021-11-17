import React, { Component } from "react";
import CabinetService from "../../services/CabinetService";

class CreateCabinetComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // step 2
      id:
        this.props.location.search === ""
          ? null
          : window.location.search.split("?")[1],
      name: "",
      number: null,
      description: "",
    };
    this.changeNameHandler = this.changeNameHandler.bind(this);
    this.changeNumberHandler = this.changeNumberHandler.bind(this);
    this.changeStagesHandler = this.changeStagesHandler.bind(this);
    this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
    this.saveOrUpdateCabinet = this.saveOrUpdateCabinet.bind(this);
  }

  // step 3
  componentDidMount() {
    // step 4
    if (this.state.id === null) {
      return;
    } else {
      CabinetService.getCabinetById(this.state.id).then((res) => {
        let cabinet = res.data;
        this.setState({
          name: cabinet.name,
          number: cabinet.number,
          stages: cabinet.stages,
          description: cabinet.description,
        });
      });
    }
  }
  saveOrUpdateCabinet = (e) => {
    e.preventDefault();
    let cabinet = {
      buildingId: this.props.location.state.buildingId,
      name: this.state.name,
      number: this.state.number,
      floorNumber: this.props.location.state.floorNum,
      description: this.state.description,
    };

    // step 5
    if (this.state.id === null) {
      CabinetService.createCabinet(cabinet).then((res) => {
        const cabinet = {
          buildingId: this.props.location.state.buildingId,
          floorNum: this.props.location.state.floorNum,
        };
        this.props.history.push({ pathname: "/cabinet", state: cabinet });
      });
    } else {
      CabinetService.updateCabinet(cabinet, this.state.id).then((res) => {
        console.log(this.props.location);
        const cabinet = {
          buildingId: this.props.location.state.buildingId,
          floorNum: this.props.location.state.floorNum,
        };
        this.props.history.push({ pathname: "/cabinet", state: cabinet });
      });
    }
  };

  changeNameHandler = (event) => {
    this.setState({ name: event.target.value });
    console.log(this.state.name)
  };

  changeNumberHandler = (event) => {
    this.setState({ number: event.target.value });
  };

  changeStagesHandler = (event) => {
    this.setState({ stages: event.target.value });
  };
  changeDescriptionHandler = (event) => {
    this.setState({ description: event.target.value });
  };

  cancel() {
    const cabinet = {
      buildingId: this.props.location.state.buildingId,
      floorNum: this.props.location.state.floorNum,
    };
    this.props.history.push({ pathname: "/cabinet", state: cabinet});
  }

  getTitle() {
    if (this.state.id === null) {
      return <h3 className="text-center">Добавить кабинеты</h3>;
    } else {
      return <h3 className="text-center">Обновить кабинеты</h3>;
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
                    <label> Номер: </label>
                    <input
                      placeholder="Номер"
                      name="number"
                      className="form-control"
                      value={this.state.number}
                      onChange={this.changeNumberHandler}
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

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateCabinet}
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

export default CreateCabinetComponent;
