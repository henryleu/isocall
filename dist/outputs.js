'use strict';

var Output = require('./output');

/**
 * 调用成功。具体业务结果，可以检查<code>subcode</code>属性来参考其子类结果。
 * @global
 * @augments Output
 * @see ServiceAvailability
 */
var Ok = new Output(''); // 空串来代表一切正常

/**
 * 一种抽象类型，用于对输出结果的分类。此类型代表"网络基础设施错误"。
 * 总而言之，无论是配置错误，还是实际网络不通，连接超时，或是服务端决绝连接，都包括在子类类型中
 * 基础设施错误：包括网络问题，连接超时问题等
 * @augments Output
 * @namespace InfrastructureError
 */

/**
 * 未知网络错误 - 客户端与服务器之间因为未知原因，
 * 例如，无网络，或IP/host无法识别或解析
 * @global
 * @augments Output
 * @see InfrastructureError
 */
var UnknownNetworkError = Output.define('UnknownNetworkError', null, '未知网络基础设施错误');

/**
 * 网络服务无法访问，连接被拒绝。原因包括：远程服务未启动，不存在，或由于安全原因，服务器主动拒绝连接等。
 * @global
 * @augments Output
 * @see InfrastructureError
 */
var NetworkRefused = Output.define('NetworkRefused', null, '网络服务无法访问，连接被拒绝');

/**
 * 网络服务请求超时。原因包括：客户端因为连接超时，为了用户体验，主动放弃等待响应结果。默认客户端5秒后超时。
 * @global
 * @augments Output
 * @see InfrastructureError
 */
var RequestAborted = Output.define('RequestAborted', null, '网络服务请求超时，主动断开');

/**
 * 一种抽象类型，用于对输出结果的分类。此类型代表"服务可访问性"结果，返回此类型结果，
 * 说明已经不存在"基础设施错误"，原因主要是由于服务器对于以下几种问题的反应：
 * 服务是否存在，访问是否合法，主体是否认证和授权，是否超频，是否恶意访问。
 * @augments Output
 * @namespace ServiceAvailability
 */

/**
 * 服务不存在. 原因包括：类似http 404错误。
 * @global
 * @augments Output
 * @see ServiceAvailability
 */
var NotFound = Output.define('NotFound', null, '服务不存在');

/**
 * 服务被拒绝. 原因包括很多，可以具体参考其子类。
 * @global
 * @augments Output
 * @see ServiceAvailability
 */
var Refused = Output.define('Refused', null, '服务被拒绝');

/**
 * 无效客户端. 原因包括：appId或appSecret不存在或不正确
 * @global
 * @augments Output
 * @see ServiceAvailability
 */
var InvalidClient = Output.define('InvalidClient', null, '无效客户端');

/**
 * 无效签名. 原因包括：签名算法错误，appSecret不正确，也可能是配置错了导致appSecret错了。总之签名错了，直接联系sdk开发者。
 * @global
 * @augments Output
 * @see InvalidClient
 * @see ServiceAvailability
 */
var InvalidSignature = Output.define('InvalidSignature', null, '无效签名'); // can be sub type

/**
 * 重播请求. 原因包括：签名算法错误，appSecret暴露了，或者是被恶意者重播了请求。直接联系sdk开发者。
 * @global
 * @augments Output
 * @see InvalidClient
 * @see ServiceAvailability
 */
var ReplayedRequest = Output.define('ReplayedRequest', null, '重播请求'); // can be sub type

/**
 * 请求过期. 原因包括：客户端时间与服务器时间不一致，或者是被恶意者重播了请求。直接联系sdk开发者。
 * @global
 * @augments Output
 * @see InvalidClient
 * @see ServiceAvailability
 */
var ExpiredRequest = Output.define('ExpiredRequest', null, '请求过期'); // can be sub type

/**
 * 一种抽象类型，用于对输出结果的分类。此类型代表"登录有效性"结果，返回此类型结果，
 * 说明已经不存在"基础设施错误"和"服务可访问性"。
 * 原因包括：无登录令牌，无效登录令牌，过期的登录令牌等
 * @augments Output
 * @namespace AuthenticationValidity
 */

/**
 * 无效登录. 原因包括：无登录令牌，无效登录令牌，过期的登录令牌等，具体原因参考子类。
 * @global
 * @augments Output
 * @see AuthenticationValidity
 */
var InvalidLogin = Output.define('InvalidLogin', null, '无效登录');

/**
 * 无登录令牌。
 * @global
 * @augments Output
 * @see InvalidLogin
 * @see AuthenticationValidity
 */
var WithoutLoginToken = Output.define('WithoutLoginToken', null, '无登录令牌'); // can be sub type

/**
 * 无效登录令牌。原因包括：令牌格式错误，令牌无法解码，令牌版本无法识别等。
 * @global
 * @augments Output
 * @see InvalidLogin
 * @see AuthenticationValidity
 */
var WrongLoginToken = Output.define('WrongLoginToken', null, '无效登录令牌'); // can be sub type

/**
 * 过期的登录令牌。原因包括：自上次登录六个月过去了，或者用户主动退出了应用。
 * @global
 * @augments Output
 * @see InvalidLogin
 * @see AuthenticationValidity
 */
var ExpiredLoginToken = Output.define('ExpiredLoginToken', null, '过期的登录令牌'); // can be sub type

/**
 * 一种抽象类型，用于对输出结果的分类。此类型代表"输入参数有效性"结果，返回此类型结果，
 * 原因包括：数据格式错误，数据完整性错误，数据值域错误等。
 * @augments Output
 * @namespace InputValidity
 */

/**
 * 输入错误。原因包括：输入格式错误，输入完整性错误，输入值域错误或输入逻辑错误，具体可以参考子类型。
 * @global
 * @augments Output
 * @see InputValidity
 */
var InvalidInput = Output.define('InvalidInput', null, '输入错误');

/**
 * 输入格式错误。
 * @global
 * @augments Output
 * @see InvalidInput
 * @see InputValidity
 */
var InvalidInputFormat = Output.define('InvalidInputFormat', null, '输入格式错误'); // can be sub type

/**
 * 输入完整性错误。
 * @global
 * @augments Output
 * @see InvalidInput
 * @see InputValidity
 */
var InvalidInputIntegrity = Output.define('InvalidInputIntegrity', null, '输入完整性错误'); // can be sub type

/**
 * 输入值域错误。
 * @global
 * @augments Output
 * @see InvalidInput
 * @see InputValidity
 */
var InvalidInputRange = Output.define('InvalidInputRange', null, '输入值域错误'); // can be sub type

/**
 * 输入逻辑逻辑。
 * @global
 * @augments Output
 * @see InvalidInput
 * @see InputValidity
 */
var InvalidInputLogic = Output.define('InvalidInputLogic', null, '输入逻辑逻辑'); // can be sub type

/**
 * 一种抽象类型，用于对输出结果的分类。此类型代表"HTTP服务错误"结果，返回此类型结果，
 * 原因包括：HTTP请求错误，HTTP响应错误等。
 * @augments Output
 * @namespace WrongHttpAccess
 */

/**
 * HTTP请求错误。原因包括：请求数据格式或逻辑错误（未按约定协议请求）等。
 * @global
 * @augments Output
 * @see WrongHttpAccess
 */
var WrongHttpRequest = Output.define('WrongHttpRequest', null, 'HTTP请求错误');

/**
 * HTTP响应错误。原因包括：响应数据格式或逻辑错误（未按约定协议响应）等。
 * @global
 * @augments Output
 * @see WrongHttpAccess
 */
var WrongHttpResponse = Output.define('WrongHttpResponse', null, 'HTTP响应错误');

/**
 * 一种抽象类型，用于对输出结果的分类。此类型代表"内部服务有效性"结果，返回此类型结果，
 * 说明已经不存在"基础设施错误"、"服务可访问性"，"登录有效性"，"输入参数有效性"和"HTTP服务错误"等问题。
 * 原因包括：服务未实现，服务过载，服务维护中，内部服务错误，内部数据错误。
 * @augments Output
 * @namespace InternalServiceValidity
 */

/**
 * 服务未实现。此功能尚未实现，但是开发者即将实现此服务，返回此结果告诉调用方别急，可以联系开发者询问详情。
 * @global
 * @augments Output
 * @see InternalServiceValidity
 */
var NotImplemented = Output.define('NotImplemented', null, '服务未实现');

/**
 * 服务过载。原因是服务压力过大，此次调用被限频服务拒绝了。
 * @global
 * @augments Output
 * @see InternalServiceValidity
 */
var ServiceUnavailable = Output.define('ServiceUnavailable', null, '服务过载');

/**
 * 服务维护中。返回此结果告诉调用方服务正在升级维护，可以联系开发者询问详情。
 * @global
 * @augments Output
 * @see InternalServiceValidity
 */
var ServiceMaintaining = Output.define('ServiceMaintaining', null, '服务维护中');

/**
 * 内部服务错误。原因是服务器内部出错了，具体错误可以参考msg属性，
 * 这是错有内部错误的一个通用返回结果，暴露太多细节给用户无意义。
 * @global
 * @augments Output
 * @see InternalServiceValidity
 */
var InternalServiceError = Output.define('InternalServiceError', null, '内部服务错误');

/**
 * 内部数据错误。原因是数据库内部的数据状态错乱了，或者未按照约定格式存取。
 * 一般是由于不同程序访问的逻辑不一致，或者程序健壮性低造成的。
 * @global
 * @augments Output
 * @see InternalServiceValidity
 */
var InternalDataError = Output.define('InternalDataError', null, '内部数据错误');

module.exports = {
  Ok: Ok,
  UnknownNetworkError: UnknownNetworkError, NetworkRefused: NetworkRefused, RequestAborted: RequestAborted,
  NotFound: NotFound, Refused: Refused, InvalidClient: InvalidClient, InvalidSignature: InvalidSignature, ReplayedRequest: ReplayedRequest, ExpiredRequest: ExpiredRequest,
  InvalidLogin: InvalidLogin, WithoutLoginToken: WithoutLoginToken, WrongLoginToken: WrongLoginToken, ExpiredLoginToken: ExpiredLoginToken,
  InvalidInput: InvalidInput, InvalidInputFormat: InvalidInputFormat, InvalidInputIntegrity: InvalidInputIntegrity, InvalidInputRange: InvalidInputRange, InvalidInputLogic: InvalidInputLogic,
  WrongHttpRequest: WrongHttpRequest, WrongHttpResponse: WrongHttpResponse,
  NotImplemented: NotImplemented, ServiceUnavailable: ServiceUnavailable, ServiceMaintaining: ServiceMaintaining, InternalServiceError: InternalServiceError, InternalDataError: InternalDataError
};
//# sourceMappingURL=outputs.js.map