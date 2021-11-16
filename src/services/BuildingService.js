import axios from 'axios';

const BUILDING_API_BASE_URL = "https://back-for-uni.herokuapp.com";


class BuildingService {

    config = { headers: {"Authorization" : `Bearer ${localStorage.user}`} }

    getBuilding(){
        return axios.get(BUILDING_API_BASE_URL + "/building/get-all-building", this.config);
    }

    createBuilding(building){
        return axios.post(BUILDING_API_BASE_URL + '/building/add', building, this.config);
    }

    getBuildingById(buildingId){
        return axios.get(BUILDING_API_BASE_URL + `/building/get-by-id/${buildingId}`, this.config);
    }

    getBuildingFloors(buildingId){
        return axios.get(BUILDING_API_BASE_URL + `/building/get-all-floor-by-build/${buildingId}`, this.config);
    }

    updateBuilding(building, buildingId){
        return axios.put(BUILDING_API_BASE_URL + `/building/edit/${buildingId}`, building, this.config);
    }

    deleteBuilding(buildingId){
        return axios.delete(BUILDING_API_BASE_URL + `/building/delete/${buildingId}`, this.config);
    }
}

export default new BuildingService()