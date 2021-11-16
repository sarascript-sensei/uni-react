import React, { Component } from 'react'
import CabinetService from '../services/CabinetService'

class ViewFloortComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: 1,
            cabinet: {}
        }
    }

    componentDidMount(){
        CabinetService.getCabinetById(this.state.id).then( res => {
            this.setState({cabinet: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Cabinet Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Название </label>
                            <div> { this.state.cabinet.name }</div>
                        </div>
                        <div className = "row">
                            <label> Номер: </label>
                            <div> { this.state.cabinet.number}</div>
                        </div>
                        <div className = "row">
                            <label> Описание </label>
                            <div> { this.state.cabinet.description }</div>
                        </div>
                    </div>

                </div>
                <div className="d-flex justify-content-between">
                    <img width="300px" src="https://dekoriko.ru/images/article/thumb/718-0/2018/03/tonkosti-sozdaniya-garmonichnogo-dizajna-kabineta-59.jpg"></img>
                    <img width="300px" src="https://dekoriko.ru/images/article/thumb/718-0/2018/03/tonkosti-sozdaniya-garmonichnogo-dizajna-kabineta-59.jpg"></img>
                    <img width="300px" src="https://dekoriko.ru/images/article/thumb/718-0/2018/03/tonkosti-sozdaniya-garmonichnogo-dizajna-kabineta-59.jpg"></img>
                </div>
            </div>
        )
    }
}

export default ViewFloortComponent