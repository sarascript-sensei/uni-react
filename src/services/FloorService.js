import axios from 'axios';

const FLOOR_API_BASE_URL = "https://back-for-uni.herokuapp.com";

class FloorService {
    config = { headers: {"Authorization" : `Bearer ${localStorage.user}`} }

    getFloor(){
        return axios.get(FLOOR_API_BASE_URL, this.config);
    }

    createFloor(floor){
        return axios.post(FLOOR_API_BASE_URL + '/cabinet/add', floor, this.config);
    }

    getFloorById(floorId){
        return axios.get(FLOOR_API_BASE_URL + `/cabinet/get-by-id/${floorId}`, this.config);
    }

    updateFloor(floor, floorId){
        return axios.put(FLOOR_API_BASE_URL + `/cabinet/edit/${floorId}`, floor, this.config);
    }

    deleteFloor(floorId){
        return axios.delete(FLOOR_API_BASE_URL + `/cabinet/delete/${floorId}`, this.config);
    }
}

export default new FloorService()