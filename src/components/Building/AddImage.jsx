import React, { Component } from "react";
import BuildingService from "../../services/BuildingService";

class AddImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildId:
        this.props.location.search === ""
          ? null
          : window.location.search.split("?")[1],
      file: [],
    };
  }

  saveOrUpdateBuilding = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.file);
    BuildingService.sendImage(this.state.buildId, data).then((res) => {
      this.props.history.push("/buildings");
    });
  };

  addImageHandler = (e) => {
    console.log(e.target.files)
  this.setState({file: e.target.files[0]});
  console.log(this.state.file)

  };

  // handleImageChange(e) {
  //   e.preventDefault();
  //   let file = e.target.files[0];
  //   this.setState({ file: file });
  // }
  cancel() {
    this.props.history.push("/buildings");
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

export default AddImage;
