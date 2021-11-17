import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListBuildingComponent from './components/Building/ListBuildingComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateBuildingComponent from './components/Building/CreateBuildingComponent';
import ViewBuildingComponent from './components/Building/ViewBuildingComponent';
import ViewCabinetComponent from './components/Cabinets/ViewCabinetComponent';
import CreateFloorComponent from './components/Floors/CreateFloorComponent';
import ListFloorComponent from './components/Floors/ListFloorComponent.jsx'
import CreateCabinetComponent from './components/Cabinets/CreateCabinetComponent'
import ViewFloorComponent from './components/Floors/ViewFloorComponent';
import Login from './components/LoginPage';
import ListCabinetComponent from './components/Cabinets/ListCabinetComponent';


function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch> 
                          <Route path = "/" exact component = {Login}></Route>

                          <Route path = "/buildings" component = {ListBuildingComponent}></Route>
                          <Route path = "/add-building/" component = {CreateBuildingComponent}></Route>
                          <Route path = "/add-building/id" exaxt="/add-building/" component = {CreateBuildingComponent}></Route>
                          <Route path = "/view-building/:id" component = {ViewBuildingComponent}></Route>

                          <Route path = "/floors" component = {ListFloorComponent}></Route>
                          <Route path = "/view-floor/:id" component = {ViewFloorComponent}></Route>
                          <Route path = "/add-floor/" component = {CreateFloorComponent}></Route>
                          <Route path = "/add-floor/:id" exact='/add-floor/' component = {CreateFloorComponent}></Route>
                          
                          <Route path = "/cabinet/" component = {ListCabinetComponent}></Route>
                          <Route path="/add-cabinet/" component={CreateCabinetComponent}></Route>
                          <Route path="/add-cabinet/:id" exact='/add-cabinet/' component={CreateCabinetComponent}></Route>
                          <Route path = "/view-cabinet/:id" component = {ViewCabinetComponent}></Route>
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;
