/**
 * Created by henryleu on 16/07/2017.
 */
const Output = require('..').Output;
const assert = require('chai').assert;

describe('Output#clone', function(){

    it('clone', function(done){
        const testCode = 'test 1';
        const testSubcode = 'subtest 1';
        const testMsg = 'test msg';
        const sourceOutput = new Output(testCode, testSubcode, testMsg);
        assert.equal(sourceOutput.code, testCode);
        assert.equal(sourceOutput.subcode, testSubcode);
        assert.equal(sourceOutput.msg, testMsg);

        const newSubcode = 'subcode 2';
        const newMsg = 'new test msg';
        const uid = 'asdf';
        const targetOutput = sourceOutput.clone({
            subcode: newSubcode, msg: newMsg, uid
        });
        assert.equal(targetOutput.code, testCode);
        assert.equal(targetOutput.subcode, newSubcode);
        assert.equal(targetOutput.msg, newMsg);
        assert.equal(targetOutput.uid, uid);

        done();
    });

});

describe('Output#sub', function(){

    it('sub', function(done){
        const code1 = 'code 1';
        const subcode1 = 'subcode 1';
        const msg1 = 'msg 1';
        const output = new Output(code1, subcode1, msg1);
        assert.equal(output.code, code1);
        assert.equal(output.subcode, subcode1);
        assert.equal(output.msg, msg1);

        const code2 = 'code 2';
        const subcode2 = 'subcode 2';
        const msg2 = 'msg 2';
        const subOutput = new Output(code2, subcode2, msg2);
        output.sub(subOutput);
        assert.equal(output.code, code1);
        assert.equal(output.subcode, subcode2);
        assert.equal(output.msg, msg2);

        done();
    });

    it('sub without msg', function(done){
        const code1 = 'code 1';
        const subcode1 = 'subcode 1';
        const msg1 = 'msg 1';
        const output = new Output(code1, subcode1, msg1);
        assert.equal(output.code, code1);
        assert.equal(output.subcode, subcode1);
        assert.equal(output.msg, msg1);

        const code2 = 'code 2';
        const subcode2 = 'subcode 2';
        const subOutput = new Output(code2, subcode2);
        output.sub(subOutput);
        assert.equal(output.code, code1);
        assert.equal(output.subcode, subcode2);
        assert.equal(output.msg, msg1);

        done();
    });
});

describe('Output#toObject', function(){

    it('toObject', function(done){
        const testCode = 'test 1';
        const testSubcode = 'subtest 1';
        const testMsg = 'test msg';
        const sourceOutput = new Output(testCode, testSubcode, testMsg);
        const sourceObj = sourceOutput.toObject();
        assert.equal(sourceObj.code, testCode);
        assert.equal(sourceObj.subcode, testSubcode);
        assert.equal(sourceObj.msg, testMsg);

        done();
    });

});

describe('Output#attach', function(){

    it('attach', function(done){
        const testCode = 'test 1';
        const testSubcode = 'subtest 1';
        const testMsg = 'test msg';
        const sourceOutput = new Output(testCode, testSubcode, testMsg);
        const attachObj = {
            user: {_id: '001', nickname: '张三'},
            testProp: 100
        };
        sourceOutput.attach(attachObj);
        assert.equal(sourceOutput.code, testCode);
        assert.equal(sourceOutput.subcode, testSubcode);
        assert.equal(sourceOutput.msg, testMsg);
        assert.equal(sourceOutput.user, attachObj.user);
        assert.equal(sourceOutput.testProp, attachObj.testProp);

        done();
    });

});


describe('Output.define', function(){

    it('define a new type of Output and return its new instance', function(done){
        const code = 'invalid parameters';
        const subcode = 'required';
        const msg = 'name is required';
        const invalidParameters = Output.define('InvalidParameters', subcode, msg);
        console.log(invalidParameters);
        assert.equal(invalidParameters.code, code);
        assert.equal(invalidParameters.subcode, subcode);
        assert.equal(invalidParameters.msg, msg);

        done();
    });

});