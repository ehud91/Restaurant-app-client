import { CONSTANTS } from './consts.js';
import { CONFIG } from './config.js';


const isStatusCodeValid = (status) => (status == CONSTANTS.HTTP_OK);
const isServiceSuccess = (success) => (success == 'true');
const urlToService = (method, service) => `http://${CONFIG.SERVER_APP_PREFIX}/${service}/${method}`;


const getMenu = async() => {
    const method = `displayMenuById/93e45368-426b-4485-b2c6-2c9bfa64a6fd`;
    const url =  urlToService(method, CONFIG.SERVICES_NAMES.TABLE);
     
    try {
        const menu = await fetch(url, { method: 'GET' });

        if (menu && isStatusCodeValid(menu.status)) {
            const {status, success, message, data} = await menu.json()
            
            if (!isStatusCodeValid(status) || !isServiceSuccess(success)) { 
                console.log('Got errors from server', {status: status, success: success, message: message});
                throw new HttpException('Got errors from server'); 
            }
    
            return data;
        } else {
            console.log('Got errors from server', {status: status, success: success, message: message});
            throw new HttpException('Got errors from server');
        }
    } catch (error) {
        console.log(error);
        throw new HttpException('Cannot reach the server...'); 
    }

    
}

const placeOrder = async(newOrder) => {

    const method = `placeNewOrder`;
    const url =  urlToService(method, CONFIG.SERVICES_NAMES.ORDERS);
    try {
        const newOrderResult = await fetch(url, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newOrder)
        });

        return isStatusCodeValid(newOrderResult.status);
    } catch (error) {
        console.log(error);
        throw new HttpException('Could not reach the server', error);
    }
}

export {
    getMenu,
    placeOrder
}