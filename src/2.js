function toSnakeCaseUpper(str) {
    // 将驼峰命名转换为下划线命名，并转换为大写
    return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();
}

function generateFunctionTemplates(actions) {
    let template = '';
    for (const key in actions) {
        if (actions.hasOwnProperty(key)) {
            // 假设 ACTION_TYPES 是一个全局对象或映射，用于存储已定义的 action types
            // 如果 ACTION_TYPES 中没有定义该 key 的 type，则动态生成
            const actionType = `ACTION_SET_${toSnakeCaseUpper(key)}`; // 这里简单地将 key 转换为大写作为 action type
            // 构造函数定义的模板字符串
            template += `export function set${key
                .charAt(0)
                .toUpperCase()}${key.slice(1)}(${key}) {\n`;
            template += `    return {\n`;
            template += `        type: ${actionType},\n`;
            template += `        payload: ${key}\n`; // 注意：这里直接使用 key 作为参数名和 payload，可能不是您想要的
            template += `    };\n`;
            template += `}\n\n`;
        }
    }
    return template;
}

// 示例对象
const actions = {
    departDate: Date.now(),
    arriveDate: Date.now(),
    departTimeStr: null,
    arriveTimeStr: null,
    departStation: null,
    arriveStation: null,
    trainNumber: null,
    durationStr: null,
    tickets: [],
    isScheduleVisible: false,
    searchParsed: false,
};

// 调用函数并打印结果
// console.log(generateFunctionTemplates(actions));

// 输出结果将类似于：
// export function setHighSpeed(highSpeed) {
//     return {
//         type: 'ACTION_SET_HIGHSPEED',
//         payload: highSpeed
//     };
// }
//
// export function setLowLatency(lowLatency) {
//     return {
//         type: 'ACTION_SET_LOWLATENCY',
//         payload: lowLatency
//     };
// }
