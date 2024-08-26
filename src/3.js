function toSnakeCaseUpper(str) {
    // 将驼峰命名转换为下划线命名，并转换为大写
    return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase();
}
function generateReducerTemplates(keys, initialState = null) {
    let template = '';
    const ACTION_PREFIX = 'ACTION_SET_';

    for (const key of keys) {
        // 构造action type
        const actionType = `${ACTION_PREFIX}${toSnakeCaseUpper(key)}`;

        // 构造函数体
        template += `${key}(state = ${JSON.stringify(
            initialState
        )}, action) {\n`;
        template += `    const { type, payload } = action;\n`;
        template += `    switch (type) {\n`;
        template += `        case ${actionType}:\n`;
        template += `            return payload;\n`;
        template += `        default:\n`;
        template += `    }\n`;
        template += `    return state;\n`;
        template += `},\n\n`; // 注意末尾的逗号和换行符，但最后一个函数后不需要
    }

    // 如果需要，可以移除最后一个多余的逗号和换行符
    if (template.endsWith(',\n\n')) {
        template = template.slice(0, -2);
    }

    return template;
}

// 示例对象
const actionKeys = {
    trainNumber: null,
    departStation: null,
    arriveStation: null,
    seatType: null,
    departDate: Date.now(),
    arriveDate: Date.now(),
    departTimeStr: null,
    arriveTimeStr: null,
    durationStr: null,
    price: null,
    passengers: [],
    menu: null,
    isMenuVisible: false,
    searchParsed: false,
};

// 调用函数并打印结果
const reducerTemplates = generateReducerTemplates(
    Object.keys(actionKeys),
    false
);
// console.log(reducerTemplates);
