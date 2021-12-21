import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Barrels/";

class BarrelService {
    getActiveBarrels() {
        return axios.get(API_URL + "allActive", { headers: authHeader() });
    }

    getInactiveBarrels() {
        return axios.get(API_URL + "allInActive", { headers: authHeader() });
    }

    createBarrel(sort, amountMonth) {
        return axios.post(API_URL + "create", { sort, amountMonth }, { headers: authHeader() });
    }

    deleteBarrel(id) {
        return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
    }

    editBarrel(barrelId, sort, amountMonth) {
        return axios.put(API_URL + "edit/" + barrelId, { barrelId, sort, amountMonth }, { headers: authHeader() });
    }
}

export default new BarrelService();