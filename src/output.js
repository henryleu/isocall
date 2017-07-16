/**
 * Created by henryleu on 14/07/2017.
 */
const util = require('./util');

const toText = function(v){
    return v.replace(/([A-Z])/g, ' $1').toLowerCase().trim();
};

const Output = function(code, subcode, msg){
    this.code = code;
    subcode && (this.subcode = subcode);
    msg && (this.msg = msg);

    Object.defineProperty(this, 'code', {value: code, writable: false});
};

/**
 * Define a new Output class and return the initiated instance
 * @param name - the name of the new Output class
 * @param code - the code of the new Output class's instance
 * @param subcode - the subcode of the new Output class's instance
 * @param msg - the msg of the new Output class's instance
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

/**
 * Wrap and return a static promise object returning Output object.
 * @returns {Promise.<Output>}
 */
Output.prototype.resolve = function(){
    return Promise.resolve(this.toObject());
};

module.exports = Output;