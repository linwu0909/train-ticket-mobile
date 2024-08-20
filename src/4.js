// function toSnakeCaseUpper(str) {
//     // 将驼峰命名转换为下划线命名，并转换为大写
//     return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();
// }

function generateActionConstants(obj) {
    let constants = '';
    obj = obj
        .replaceAll('\n', '')
        .replaceAll(' ', '')
        .split(',');
    for (const key of obj) {
        // if (obj.hasOwnProperty(key)) {
        constants += `${key}={${key}}\n`;
        // }
    }
    return constants;
}

// 示例用法
const actionObj = `
ticketTypes,
trainTypes,
departStations,
arriveStations,
checkedTicketTypes,
checkedTrainTypes,
checkedDepartStations,
checkedArriveStations,
departTimeStart,
departTimeEnd,
arriveTimeStart,
arriveTimeEnd, 
setCheckedTicketTypes,
setCheckedTrainTypes,
setCheckedDepartStations,
setCheckedArriveStations,
setDepartTimeStart,
setDepartTimeEnd,
setArriveTimeStart,
setArriveTimeEnd`;
const actionConstants = generateActionConstants(actionObj);

// 输出到控制台
// window.console.log(actionConstants);
// console.log(actionConstants);
// 期望输出:
// from={from}
// to={to}
