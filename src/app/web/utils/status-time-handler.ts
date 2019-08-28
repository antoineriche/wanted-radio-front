import {TimeState} from "../../model/time-state";

/**
 * Return current time state color
 */
export function getStatusTimeFontColor(status:TimeState){
    return status == TimeState.NORMAL ? 'black' : 
        status == TimeState.URGENT ? 'orange' : 'red';
}

export function getStatusTimeFontStyle(status:TimeState) {
    return {
        'color' : getStatusTimeFontColor(status),
        'font-weight': status == TimeState.OUT_OF_TIME ? 'bold' : 'normal'
    }
}