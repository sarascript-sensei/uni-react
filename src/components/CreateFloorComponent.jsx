import React, { Component } from 'react'
import FloorService from '../services/FloorService';

class CreateFloorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            buildingId: this.props.match.params.id ? this.props.match.params.id : null,
            description: '',
            floorNumber: '',
            image: '',
            name: '',
            number: '',

        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeNumberHandler = this.changeNumberHandler.bind(this);
        this.changeStagesHandler = this.changeStagesHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.saveOrUpdateFloor = this.saveOrUpdateFloor.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.buildingId === null){
            return
        }else{
            FloorService.getFloorById(this.state.buildingId).then( (res) =>{
                let floor = res.data;
                this.setState({
                    buildingId: floor.buildingId,
                    description: floor.description,
                    floorNumber: floor.floorNumber,
                    image: floor.images,
                    name: floor.name,
                    number: floor.number,
                });
            });
        }        
    }
    saveOrUpdateFloor = (e) => {
        e.preventDefault();
        let floor = {
            buildingId: this.state.buildingId,
            description: this.state.description, 
            floorNumber: this.state.floorNumber, 
            image: this.state.image, 
            name: this.state.name,  
            number: this.state.number};

        // step 5
        if(this.state.buildingId === null){
            FloorService.createFloor(floor).then(res =>{
                this.props.history.push('/floors');
            });
        }else{
            FloorService.updateFloor(floor, this.state.buildingId).then( res => {
                this.props.history.push('/floors');
            });
        }
    }

    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeNumberHandler= (event) => {
        this.setState({number: event.target.value});
    }

    changeImageHandler= (event) => {
        this.setState({image: event.target.value});
    }

    changeStagesHandler= (event) => {
        this.setState({floorNumber: event.target.value});
    }
    changeDescriptionHandler= (event) => {
        this.setState({description: event.target.value});
    }




    cancel(){
        this.props.history.push('/floors');
    }

    getTitle(){
        if(this.state.buildingId === null){
            return <h3 className="text-center">Добавить Этаж</h3>
        }else{
            return <h3 className="text-center">Обновить этаж</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Назначение: </label>
                                            <input placeholder="Описание" name="description" className="form-control" 
                                                value={this.state.description} onChange={this.changeDescriptionHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Номер этажа: </label>
                                            <input placeholder="Номер этажа" name="floorNumber" className="form-control" 
                                                value={this.state.floorNumber} onChange={this.changeStagesHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Наименование организации: </label>
                                            <input placeholder="Наименование" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Количество кабинетов: </label>
                                            <input placeholder="Количество кабинетов" name="number" className="form-control" 
                                                value={this.state.number} onChange={this.changeNumberHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateFloor}>Сохранить</button>
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

export default CreateFloorComponent