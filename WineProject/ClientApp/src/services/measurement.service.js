import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Measurements/";

class MeasurementService {
    getMeasurements(id) {
        return axios.get(API_URL + "all/" + id, { headers: authHeader() });
    }

    createMeasurement(id) {
        return axios.post(API_URL + "createRandom/" + id, { }, { headers: authHeader() });
    }
}

export default new MeasurementService();