import React, { Component } from 'react'
import CabinetService from '../services/CabinetService'


class ViewCabinetComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
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
                            <span> Название: </span>
                            <span className="cabinet__item"> { this.state.cabinet.name }</span>
                        </div>
                        <div className = "row">
                            <span> Номер: </span>
                            <span className="cabinet__item"> { this.state.cabinet.number}</span>
                        </div>
                        <div className = "row cabinet-row">
                            <span> Описание: </span>
                            <span className="cabinet__item"> { this.state.cabinet.description }</span>
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

export default ViewCabinetComponent