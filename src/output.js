/**
 * Created by henryleu on 14/07/2017.
 */
const util = require('./util');

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
 * @returns {Output}
 */
Output.prototype.attach = function(bizData){
    return Object.assign(this, bizData);
};

/**
 * Transform and return the pure object of the instance
 * @returns {object}
 */
Output.prototype.toObject = function(){
    return Object.assign({}, this);
};

/**
 * Clone output object with the same properties
 * @returns {Output}
 */
Output.prototype.clone = function(v){
    const output = new this.constructor(this.code, this.subcode, this.msg);
    return Object.assign(output, v);
};

/**
 * Make an output to be subordinated to the current output.
 * @param subOutput the sub output object
 * @returns {Output}
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