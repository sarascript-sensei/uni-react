import React, { Component } from 'react'
import CabinetService from '../../services/CabinetService'

import image from "../../assets/building.png";
import editIcon from "../../assets/edit.png";
import trashIcon from "../../assets/trash.png";
import viewIcon from "../../assets/eye.png";
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
            <br></br>
            <article class="container mt-5 mb-5">
            {this.state.cabinet.map((cabinet) => (
               <div key={cabinet.id}>
         <aside class="col-md-3"></aside>
         <div class="container mt-5 mb-5">
           <div class="d-flex justify-content-center row">
             <div class="building--list-item">
               <div class="building--list-block p-2 border rounded">
                 <div class="building--list-item--img">
                   <img
                     class="img-fluid img-responsive rounded product-image"
                     src={image}
                   />
                 </div>
                 <div class="building--list-item--text col-md-6 mt-1">
                   <div class="building--list-item--text--info">
                     <h3
                       onClick={() => this.viewCabinet(cabinet.id)}
                       class=""
                     >
                       {cabinet.name}
                     </h3>
                     <div class="text-justify text-truncate para mb-0">
                       {cabinet.number}
                     </div>
                     <p class="text-justify text-truncate para mb-0">
                       {cabinet.description}
                     </p>
                   </div>
                 </div>

                 <div class="building--list-item--icons">
                   <span
                     className="building--list-item--icons--item"
                     onClick={() => this.editCabinet(cabinet.id)}
                   >
                     <img src={editIcon} alt="" />
                   </span>
                   <span
                     className="building--list-item--icons--item"
                     onClick={() => this.deleteCabinet(cabinet.id)}
                   >
                     <img src={trashIcon} alt="" />
                   </span>
                   <span
                     className="building--list-item--icons--item"
                     onClick={() => this.viewBuilding(cabinet.id)}
                   >
                     <img src={viewIcon} alt="" />
                   </span>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     ))}
   </article>
 </div>
);
}
}

export default ListCabinetComponent