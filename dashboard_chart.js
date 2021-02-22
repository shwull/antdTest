function chart(method) {
    let res = null
    switch(method) {
        case 'GET':
            res = [20,30,40,50,55,10]
            break;
        default:
            res = null;    
    }
    return res
}
module.exports = chart;//模块化规范