const util = require('./util');
const objectAssign = require('object-assign');

const toText = function(v){
    return v.replace(/([A-Z])/g, ' $1').toLowerCase().trim();
};

/**
 * 抽象方法（包括native服务方法和Rest API）调用统一返回（输出）类型，
 * 可以从其或展出标识不通语义的输出结果子类，但是内部结构不变
 * @param {string} code - 输出结果标识码
 * @param {string} subcode - 输出结果标识子码
 * @param {string} msg - 输出结果提示消息
 * @constructor
 * @class
 */
function Output(code, subcode, msg){
    this.code = code;
    subcode && (this.subcode = subcode);
    msg && (this.msg = msg);

    Object.defineProperty(this, 'code', {value: code, writable: false});
}

/**
 * Define a new Output class and return the initiated instance
 * 定义一个新输出结果类型，并返回一个初始化好数据的新实例
 * @param name - the name of the new Output class
 * @param {string} code - the code of the new Output class's instance
 * @param {string} subcode - the subcode of the new Output class's instance
 * @param {string} msg - the msg of the new Output class's instance
 * @returns {Output}
 */
Output.define = function(name, subcode, msg){
    const NewOutput = util.clone.call(Output, name);
    const code = toText(name);
    return new NewOutput(code, subcode, msg);
};


/**
 * Attach more biz data for the output
 * 附加更多业务数据，并返回本对象
 * @returns {Output}
 */
Output.prototype.attach = function(bizData){
    return objectAssign(this, bizData);
};

/**
 * Transform and return the pure object of the instance
 * 转换并返回一个本实例对象的一个纯JSON对象，不带类型，用于调用方消费
 * @returns {object} 纯JSON对象
 */
Output.prototype.toObject = function(){
    return objectAssign({}, this);
};

/**
 * 克隆当前对象并返回一个附加业务数据的新的结果输出对象
 * @example
 * Ok.clone({user: userLoaded});
 * @param {object} v - 克隆的同时，附加的业务数据对象
 * @returns {Output}
 */
Output.prototype.clone = function(v){
    const output = new this.constructor(this.code, this.subcode, this.msg);
    return objectAssign(output, v);
};

/**
 * Make an output to be subordinated to the current output.
 * 使当前对象附加一个子输出结果类型，增加更多的语义，帮助调用方进行业务
 * 判断和后续流程选择
 * @param subOutput 待附加的子类型对象
 * @returns {Output} 返回附加数据后的本对象
 */
Output.prototype.sub = function(subOutput){
    for(const p in subOutput){
        if(subOutput.hasOwnProperty(p)){
            if(p === 'code'){
                this.subcode = subOutput[p];
            }
            else if(p === 'msg'){
                this.msg = subOutput[p] || this.msg;
            }
            else{
                this[p] = subOutput[p];
            }
        }
    }

    return this;
};

module.exports = Output;