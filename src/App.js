import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ListBuildingComponent from './components/ListBuildingComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateBuildingComponent from './components/CreateBuildingComponent';
import ViewBuildingComponent from './components/ViewBuildingComponent';
import ViewCabinetComponent from './components/ViewCabinetComponent';
import CreateFloorComponent from './components/CreateFloorComponent';
import ListFloorComponent from './components/ListFloorComponent.jsx'
import CreateCabinetComponent from './components/CreateCabinetComponent'
import ViewFloorComponent from './components/ViewFloorComponent';
import Login from './components/LoginPage';
import ListCabinetComponent from './components/ListCabinetComponent';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
library.add(faTrash, faEdit, faPlus);


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
