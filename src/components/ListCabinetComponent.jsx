import React, { Component } from 'react'
import CabinetService from '../services/CabinetService'

import Icon from "react-crud-icons";
import image from '../assets/building.jpeg';

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
        console.log(this.cabinet)
    }
    deleteCabinet(id){
        CabinetService.deleteCabinet(id).then( res => {
            this.setState({cabinet: this.state.cabinet.filter(cabinet => cabinet.id !== id)});
        });
    }
    viewCabinet(id){
        this.props.history.push(`/view-cabinet/${id}`);
    }
    editCabinet(id){
        this.props.history.push({pathname: `/add-cabinet/`, search: `${id}`});
    }
    componentDidMount(){
        CabinetService.getCabinet(this.cabinet).then((res) => {
            this.setState({ cabinet: res.data});
            console.log(res.data)
            console.log(this.state)
        });
    }
    addCabinet(){
        this.props.history.push('/add-cabinet/');
    }
    
    render() {
        return (
            <div>
                 <h2 className="text-center cabinet--title">Список Кабинетов</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addCabinet}> Добавить кабинет</button>
                 </div>
                 <br></br>
                 <article class="container mt-5 mb-5">
    {
                                    this.state.cabinet.map(
                                        cabinet => 
        <div key = {cabinet.id}>
            <aside class="col-md-3">
            </aside> 
            <div class="container mt-5 mb-5">
    <div class="d-flex justify-content-center row">
        <div class="col-md-10">
            <div class="row p-2 bg-white border rounded">
            <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" src={image}/></div>
                <div class="col-md-6 mt-1">
                <div class = "col-md-6 mt-1">
                    <h3 onClick={ () => this.viewCabinet(cabinet.id)} class=""> { cabinet.name}  </h3>
                    <div>
                        <div class="text-justify text-truncate para mb-0">{cabinet.number}</div>
                    </div>
                    
                    <p class="text-justify text-truncate para mb-0"> {cabinet.description}</p>
                </div>
            </div>
             <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                    <div class="d-flex flex-row align-items-center">
                    <div class="d-flex flex-column mt-4"> <Icon
        name = "edit"
        tooltip = "Edit"
        theme = "light"
        size = "medium"
        onClick={ () => this.editCabinet(cabinet.id)}
      />
      </div>
      <div class="d-flex flex-column mt-4">
                           <Icon
        name = "delete"
        tooltip = "Edit"
        theme = "light"
        size = "medium"
        onClick={ () => this.deleteCabinet(cabinet.id)}
      />
      </div>
      <div class="d-flex flex-column mt-4">
                           <Icon
        name = "browse"
        tooltip = "Edit"
        theme = "light"
        size = "medium"
        onClick={ () => this.viewCabinet(cabinet.id)}
      />
                </div>
            </div> 
            <aside>
                <div>

                    <br />
                   
                </div> 
            </aside>
        </div>
        </div>
    </div>
    </div>
    </div>
    </div>
  )
    }
    </article> 

            </div>
            
        )
    }
}
export default ListCabinetComponent