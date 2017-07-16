/**
 * Created by henryleu on 15/07/2017.
 */
const Output = require('./output');

const Ok = new Output(''); //成功

/*
 * 基础设施错误：包括网络问题，连接超时问题等
 */
const UnknownNetworkError = Output.define('UnknownNetworkError', null, '未知网络基础设施错误');

const NetworkRefused = Output.define('NetworkRefused', null, '网络服务无法访问，连接被拒绝');

const RequestAborted = Output.define('RequestAborted', null, '网络服务请求超时，主动断开');

/*
 * 服务可访问性：包括服务是否存在，访问是否合法，主体是否认证和授权，是否超频，是否恶意访问
 */
const NotFound = Output.define('NotFound', null, '服务不存在');

const Refused = Output.define('Refused', null, '服务被拒绝');

const InvalidClient = Output.define('InvalidClient', null, '无效客户端');

const InvalidSignature = Output.define('InvalidSignature', null, '无效签名'); //can be sub type

const ReplayedRequest = Output.define('ReplayedRequest', null, '重播请求'); //can be sub type

const ExpiredRequest = Output.define('ExpiredRequest', null, '过期请求'); //can be sub type

/*
 * 登录有效性：
 */
const InvalidLogin = Output.define('InvalidLogin', null, '无效登录');

const WithoutLoginToken = Output.define('WithoutLoginToken', null, '无登录令牌'); //can be sub type

const WrongLoginToken = Output.define('WrongLoginToken', null, '无效登录令牌'); //can be sub type

const ExpiredLoginToken = Output.define('ExpiredLoginToken', null, '过期的登录令牌'); //can be sub type


/*
 * 服务前端输入校验：参数错误，参数不完整，参数格式错误，参数域值是否合法等
 */
const WrongParameters = Output.define('WrongParameters', null, '参数错误');

const WrongFormat = Output.define('WrongFormat', null, '数据格式错误'); //can be sub type

const WrongIntegrity = Output.define('WrongIntegrity', null, '数据完整性错误'); //can be sub type

const WrongRange = Output.define('WrongRange', null, '数据值域错误'); //can be sub type

/*
 * HTTP 请求与相应：
 */
const WrongRequest = Output.define('WrongRequest', null, 'HTTP请求错误');

const WrongRequestFormat = Output.define('WrongRequestFormat', null, 'HTTP请求格式错误');

const WrongResponse = Output.define('WrongResponse', null, 'HTTP响应错误');

const WrongResponseFormat = Output.define('WrongResponseFormat', null, 'HTTP响应格式错误');


/*
 * 服务内部错误：内部服务错误，内部数据错误
 */
const NotImplemented = Output.define('NotImplemented', null, '服务未实现');

const ServiceUnavailable = Output.define('ServiceUnavailable', null, '服务过载');

const ServiceMaintaining = Output.define('ServiceMaintaining', null, '服务维护中');

const InternalServiceError = Output.define('InternalServiceError', null, '内部服务错误');

const InternalDataError = Output.define('InternalDataError', null, '内部数据错误');


module.exports = {
    Ok,
    UnknownNetworkError, NetworkRefused, RequestAborted,
    NotFound, Refused, InvalidClient, InvalidSignature, ReplayedRequest, ExpiredRequest,
    InvalidLogin, WithoutLoginToken, WrongLoginToken, ExpiredLoginToken,
    WrongParameters, WrongFormat, WrongIntegrity, WrongRange,
    WrongRequest, WrongRequestFormat, WrongResponse, WrongResponseFormat,
    NotImplemented, ServiceUnavailable, ServiceMaintaining, InternalServiceError, InternalDataError,
};

