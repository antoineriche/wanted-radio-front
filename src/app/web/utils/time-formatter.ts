/**
 * Return current time state color
 */
export function toHHMMSS(milliseconds: number): string{
    let seconds =  Math.floor(milliseconds / 1000);
    var h: number, m: number, s: number, result = '';
    // HOURs
    h = Math.floor(seconds/3600);
    seconds -= h*3600;
    if(h){
        result = h<10 ? '0'+h+':' : h+':';
    }
    // MINUTEs
    m = Math.floor(seconds/60);
    seconds -= m*60;
    result += m<10 ? '0'+m+':' : m+':';
    // SECONDs
    s=seconds%60;
    result += s<10 ? '0'+s : s;
    return result;
}