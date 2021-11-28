import React, { Component } from "react";
import BuildingService from "../../services/BuildingService";
import CabinetService from "../../services/CabinetService";

class AddCabinetImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cabinetId:
        this.props.location.search === ""
          ? null
          : window.location.search.split("?")[1],
      file: [],
    };
    console.log(this.props.location);
  }

  saveOrUpdateBuilding = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.file);
    data.append("text", this.props.location.state.buildingId);

    CabinetService.sendImage(this.state.cabinetId, data).then((res) => {
      const cabinet = {
        buildingId: this.props.location.state.buildingId,
        floorNum: this.props.location.state.floorNum,
      };
      this.props.history.push({ pathname: "/cabinet", state: cabinet });
    });
  };

  addImageHandler = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  cancel() {
    const cabinet = {
      buildingId: this.props.location.state.buildingId,
      floorNum: this.props.location.state.floorNum,
    };
    this.props.history.push({ pathname: "/cabinet", state: cabinet });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center">Добавить изображения</h3>
              <div className="card-body">
                <form>
                  <div className="form-row">
                    <div className="form-group">
                      <label> Изображения: </label>
                      <input
                        className="image-input"
                        type="file"
                        multiple
                        onChange={this.addImageHandler}
                      />
                    </div>
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

export default AddCabinetImage;
