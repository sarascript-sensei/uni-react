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
      image: [],
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
  readFileDataAsBase64(e) {
    // var bytes = File(e.target.files).readBytes()
    // // var base64 = Base64.getEncoder().encodeToString(bytes)
    // // console.log(base64)
}
  cancel() {
    const cabinet = {
      buildingId: this.props.location.state.buildingId,
      floorNum: this.props.location.state.floorNum,
    };
    this.props.history.push({ pathname: "/cabinet", state: cabinet});
  }

  getTitle() {
    if (this.state.id === null) {
      return <h3 className="text-center">???????????????? ????????????????</h3>;
    } else {
      return <h3 className="text-center">???????????????? ????????????????</h3>;
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
                    <label> ????????????????: </label>
                    <input
                      placeholder="????????????????"
                      name="name"
                      className="form-control"
                      value={this.state.name}
                      onChange={this.changeNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> ??????????: </label>
                    <input
                      placeholder="??????????"
                      name="number"
                      className="form-control"
                      value={this.state.number}
                      onChange={this.changeNumberHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> ????????????????: </label>
                    <input
                      placeholder="????????????????"
                      name="description"
                      className="form-control"
                      value={this.state.description}
                      onChange={this.changeDescriptionHandler}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label> ??????????????????????: </label>
                      <input
                        className="image-input"
                        type="file"
                        multiple
                        onChange={this.readFileDataAsBase64}
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateCabinet}
                  >
                    ??????????????????
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    ????????????
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
