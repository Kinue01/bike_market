import axios from "axios";

const API_URL = 'http://localhost:8000/api/';

class ItemService {

    getItems(){
        return axios.get(API_URL + "getitems");
    }

    addItem(item){
        return axios.post(API_URL + "additem", {
            item_name: item.item_name,
            item_description: item.item_description,
            item_type: item.item_type
        });
    }

    getItemTypes(){
        return axios.get(API_URL + "getitemtypes");
    }
}

export default new ItemService();