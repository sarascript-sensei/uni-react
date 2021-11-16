import React, { Component } from 'react'
import BuildingService from '../services/BuildingService'
import "./building.css"
import Icon from "react-crud-icons";
import image from '../assets/building.jpeg';
import Select from 'react-select';

const options = [
    { value: 'served', label: 'Обслуживаемые' },
    { value: 'self-served', label: 'Самообслуживаемые' }
  ];



class ListBuildingComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                buildings: []
        }
        this.addBuilding = this.addBuilding.bind(this);
        this.editBuilding = this.editBuilding.bind(this);
        this.deleteBuilding = this.deleteBuilding.bind(this);
    }

    deleteBuilding(id){
        BuildingService.deleteBuilding(id).then( res => {
            this.setState({buildings: this.state.buildings.filter(building => building.id !== id)});
        });
    }
    viewBuilding(id){
        this.props.history.push(`/view-building/${id}`);
    }
    goToFloors(id){
        console.log(id)
        this.props.history.push({pathname: `/floors/`, search: `${id}`});
    }
    editBuilding(id){
        this.props.history.push({pathname: `/add-building/`, search: `${id}`});
    }

    componentDidMount(){
        BuildingService.getBuilding().then((res) => {
            this.setState({ buildings: res.data});
        });
    }

    addBuilding(){
        this.props.history.push('/add-building/');
    }

    

    render() {
        return (
            
            <div>
                 <h2 className="text-center building--title">Список зданий</h2>
                 <div className = "row">

 
                    <button className="btn btn-primary" > Административные</button>
                    <button className="btn btn-primary" > Жилые</button>
                    <button className="btn btn-primary"> Исторические</button>
                    <div className="col-md-4">
                                    <Select options={ options } />
                                </div>

                    <button className="btn btn-primary" onClick={this.addBuilding}> Добавить здание</button>
                 </div>
                 <br></br>

    <article class="container mt-5 mb-5">
    {
                                    this.state.buildings.map(
                                        building => 
        <div key = {building.id}>
            <aside class="col-md-3">
            </aside> 
            <div class="container mt-5 mb-5">
    <div class="d-flex justify-content-center row">
        <div class="col-md-10">
            <div class="row p-2 bg-white border rounded">
            <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" src={image}/></div>
                <div class="col-md-6 mt-1">
                <div class = "col-md-6 mt-1">
                    <h3 onClick={ () => this.viewBuilding(building.id)} class=""> { building.name}  </h3>
                    <div>
                        <div class="text-justify text-truncate para mb-0">{building.address}</div>
                    </div>
                    
                    <p class="text-justify text-truncate para mb-0"> {building.description}</p>
                </div>
            </div>
             <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                    <div class="d-flex flex-row align-items-center">
                    <div class="d-flex flex-column mt-4"> <Icon
        name = "edit"
        tooltip = "Edit"
        theme = "light"
        size = "medium"
        onClick={ () => this.editBuilding(building.id)}
      />
      </div>
      <div class="d-flex flex-column mt-4">
                           <Icon
        name = "delete"
        tooltip = "Edit"
        theme = "light"
        size = "medium"
        onClick={ () => this.deleteBuilding(building.id)}
      />
      </div>
      <div class="d-flex flex-column mt-4">
                           <Icon
        name = "browse"
        tooltip = "Edit"
        theme = "light"
        size = "medium"
        onClick={ () => this.viewBuilding(building.id)}
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

export default ListBuildingComponent
