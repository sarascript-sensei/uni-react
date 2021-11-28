import React, { Component } from "react";
import CabinetService from "../../services/CabinetService";

import image from "../../assets/building.png";
import addIcon from "../../assets/add-image.png";
import editIcon from "../../assets/edit.png";
import trashIcon from "../../assets/trash.png";
import viewIcon from "../../assets/eye.png";

class ListCabinetComponent extends Component {
  constructor(props) {
    super(props);
    this.cabinet = {
      buildingId: this.props.location.state.buildingId,
      floorNum: this.props.location.state.floorNum,
    };
    this.state = {
      cabinet: [],
    };
    this.addCabinet = this.addCabinet.bind(this);
    this.editCabinet = this.editCabinet.bind(this);
    this.deleteCabinet = this.deleteCabinet.bind(this);
  }
  deleteCabinet(id) {
    CabinetService.deleteCabinet(id).then((res) => {
      this.setState({
        cabinet: this.state.cabinet.filter((cabinet) => cabinet.id !== id),
      });
    });
  }
  viewCabinet(id) {
    this.props.history.push({
      pathname: `/view-cabinet/`,
      search: `${id}`,
      state: this.cabinet,
    });
  }
  editCabinet(id) {
    this.props.history.push({
      pathname: `/add-cabinet/`,
      search: `${id}`,
      state: this.cabinet,
    });
  }
  addImage(id) {
    this.props.history.push({ pathname: `/add-cabinet-photo/`, search: `${id}` , state: this.cabinet});
  }
  componentDidMount() {
    CabinetService.getCabinet(this.cabinet).then((res) => {
      console.log(res.data)
      this.setState({ cabinet: res.data });
    });
  }
  addCabinet() {
    this.props.history.push({ pathname: `/add-cabinet/`, state: this.cabinet });
  }

  render() {
    return (
      <div>
        <h2 className="text-center cabinet--title">Список Кабинетов</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addCabinet}>
            {" "}
            Добавить кабинет
          </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> Номер</th>
                <th> Фото</th>
                <th> Описание</th>
                <th> Действия</th>
              </tr>
            </thead>
            <tbody>
              {this.state.cabinet.map((cabinet) => (
                <tr key={cabinet.id}>
                  <td> {cabinet.number} </td>
                  <td className="cabinet-img">
                    {" "}
                    {cabinet.url ? (
                      <img
                        class="img-fluid img-responsive rounded product-image"
                        src={cabinet.url[0]}
                      />
                    ) : (
                      <img
                        class="img-fluid img-responsive rounded product-image"
                        src={image}
                      />
                    )}{" "}
                  </td>
                  <td> {cabinet.description} </td>
                  <td className="cabinet--icons"> 
                    <span
                      className="cabinet--list-item--icons--item"
                      onClick={() => this.addImage(cabinet.id)}
                    >
                      <img src={addIcon} alt="" />
                    </span>
                    <span
                      className="cabinet--list-item--icons--item"
                      onClick={() => this.editCabinet(cabinet.id)}
                    >
                      <img src={editIcon} alt="" />
                    </span>
                    <span
                      className="cabinet--list-item--icons--item"
                      onClick={() => this.deleteCabinet(cabinet.id)}
                    >
                      <img src={trashIcon} alt="" />
                    </span>
                    <span
                      className="cabinet--list-item--icons--item"
                      onClick={() => this.viewCabinet(cabinet.id)}
                    >
                      <img src={viewIcon} alt="" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default ListCabinetComponent;
