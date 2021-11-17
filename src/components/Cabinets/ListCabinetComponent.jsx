import React, { Component } from 'react'
import CabinetService from '../../services/CabinetService'
class ListCabinetComponent extends Component {
    constructor(props) {
        super(props)
        this.cabinet = {
            buildingId: this.props.location.state.buildingId,
            floorNum: this.props.location.state.floorNum,
        }
        this.state = {
                cabinet: []
        }
        this.addCabinet = this.addCabinet.bind(this);
        this.editCabinet = this.editCabinet.bind(this);
        this.deleteCabinet = this.deleteCabinet.bind(this);
    }
    deleteCabinet(id){
        CabinetService.deleteCabinet(id).then( res => {
            this.setState({cabinet: this.state.cabinet.filter(cabinet => cabinet.id !== id)});
        });
    }
    viewCabinet(id){
        this.props.history.push({pathname: `/view-cabinet/`, search: `${id}`, state: this.cabinet});
    }
    editCabinet(id){
        this.props.history.push({pathname: `/add-cabinet/`, search: `${id}`, state: this.cabinet});
    }
    componentDidMount(){
        CabinetService.getCabinet(this.cabinet).then((res) => {
            this.setState({ cabinet: res.data});

        });
    }
    addCabinet(){
        this.props.history.push({pathname: `/add-cabinet/`, state: this.cabinet});
    }
    
    render() {
        return (
            <div>
                 <h2 className="text-center cabinet--title">Список Кабинетов</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addCabinet}> Добавить кабинет</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th> Номер</th>
                                    <th> Фото</th>
                                    <th> Описание</th>
                                    <th> Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.cabinet.map(
                                        cabinet => 
                                        <tr key = {cabinet.id}>
                                             <td> { cabinet.number} </td>   
                                             <td> { cabinet.photo} </td> 
                                             <td> { cabinet.description} </td>   
                                             <td>
                                                 <button onClick={ () => this.editCabinet(cabinet.id)} className="btn btn-info">Обновить </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCabinet(cabinet.id)} className="btn btn-danger">Удалить </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewCabinet(cabinet.id)} className="btn btn-info">Открыть </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                 </div>
            </div>
        )
    }
}
export default ListCabinetComponent