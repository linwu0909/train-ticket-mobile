function toSnakeCaseUpper(str) {
    // 将驼峰命名转换为下划线命名，并转换为大写
    return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();
}

function generateActionConstants(obj) {
    let constants = '';
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 转换键名为大写下划线形式
            const constantKey = `ACTION_SET_${toSnakeCaseUpper(key)}`;
            // 生成对应的action名称（这里只是简单地将键名转换为大写下划线形式，并加上'SET_'前缀）
            const actionValue = `SET_${toSnakeCaseUpper(key)}`;

            // 生成并拼接export语句
            // constants += `export const ${constantKey} = '${actionValue}';\n`;
            constants += `${constantKey},\n`;
        }
    }
    return constants;
}

// 示例用法
const actionObj = {
    from: null,
    to: null,
    departDate: '',
    highSpeed: false,
    trainList: [],
    orderType: '',
    onlyTickets: false,
    ticketTypes: [],
    checkedTicketTypes: {},
    trainTypes: [],
    checkedTrainTypes: {},
    departStations: [],
    checkedDepartStations: {},
    arriveStations: [],
    checkedArriveStations: {},
    departTimeStart: 0,
    departTimeEnd: 24,
    arriveTimeStart: 0,
    arriveTimeEnd: 24,
    isFiltersVisible: false,
    searchParsed: false,
};
const actionConstants = generateActionConstants(actionObj);

// 输出到控制台
// console.log(actionConstants);
// 期望输出:
// export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED';
// export const ACTION_SET_LOW_LATENCY = 'SET_LOW_LATENCY';
