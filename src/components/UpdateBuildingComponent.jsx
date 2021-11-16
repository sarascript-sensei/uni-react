import React, { Component } from 'react'
import BuildingService from '../services/BuildingService';

class UpdateBuildingComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            address: '',
            stages: '',
            description: ''

        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeStagesHandler = this.changeStagesHandler.bind(this);
        this.changeDescriptionHandler = this.changeAddressHandler.bind(this);
        this.updateBuilding = this.updateBuilding.bind(this);
    }

    componentDidMount(){
        BuildingService.getBuildingById(this.state.id).then( (res) =>{
            let building = res.data;
            this.setState({name: building.name,
                address: building.address,
                stages : building.stages,
                description : building.description
            });
        });
    }

    updateBuilding = (e) => {
        e.preventDefault();
        let building = {name: this.state.name, address: this.state.address, stages: this.state.stages, description: this.state.description};
        console.log('building => ' + JSON.stringify(building));
        console.log('id => ' + JSON.stringify(this.state.id));
        BuildingService.updateBuilding(building, this.state.id).then( res => {
            this.props.history.push('/buildings');
        });
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeAddressHandler= (event) => {
        this.setState({address: event.target.value});
    }

    changeStagesHandler= (event) => {
        this.setState({stages: event.target.value});
    }
    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }

    cancel(){
        this.props.history.push('/buildings');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Building</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Название: </label>
                                            <input placeholder="Название" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Адрес: </label>
                                            <input placeholder="Адрес" name="address" className="form-control" 
                                                value={this.state.address} onChange={this.changeAddressHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Количество этажей </label>
                                            <input placeholder="Этажи" name="stages" className="form-control" 
                                                value={this.state.stages} onChange={this.changeStagesHandler}/>
                                        </div>
                                        
                                        <div className = "form-group">
                                            <label> Описание </label>
                                            <input placeholder="Описание" name="description" className="form-control" 
                                                value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateBuilding}>Сохранить</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Отмена</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdateBuildingComponent
