import { Request, Response, NextFunction } from "express";

const httpStatusCodes = {
  100: "Continue",
  101: "SwitchingProtocols",
  102: "Processing",
  200: "Ok",
  201: "Created",
  202: "Accepted",
  203: "NonAuthoritativeInformation",
  204: "NoContent",
  205: "ResetContent",
  206: "PartialContent",
  207: "MultiStatus",
  300: "MultipleChoices",
  301: "MovedPermanently",
  302: "MovedTemporarily",
  303: "SeeOther",
  304: "NotModified",
  305: "UseProxy",
  307: "TemporaryRedirect",
  308: "PermanentRedirect",
  400: "BadRequest",
  401: "Unauthorized",
  402: "PaymentRequired",
  403: "Forbidden",
  404: "NotFound",
  405: "MethodNotAllowed",
  406: "NotAcceptable",
  407: "ProxyAuthenticationRequired",
  408: "RequestTimeout",
  409: "Conflict",
  410: "Gone",
  411: "LengthRequired",
  412: "PreconditionFailed",
  413: "RequestTooLong",
  414: "RequestUriTooLong",
  415: "UnsupportedMediaType",
  416: "RequestedRangeNotSatisfiable",
  417: "ExpectationFailed",
  418: "ImATeapot",
  419: "InsufficientSpaceOnResource",
  420: "MethodFailure",
  422: "UnprocessableEntity",
  423: "Locked",
  424: "FailedDependency",
  428: "PreconditionRequired",
  429: "TooManyRequests",
  431: "RequestHeaderFieldsTooLarge",
  451: "UnavailableForLegalReasons",
  500: "InternalServerError",
  501: "NotImplemented",
  502: "BadGateway",
  503: "ServiceUnavailable",
  504: "GatewayTimeout",
  505: "HttpVersionNotSupported",
  507: "InsufficientStorage",
  511: "NetworkAuthenticationRequired",
};

declare global {
  namespace Express {
    interface Response {
      statusAccepted: (message: string, content?: object) => void
      statusBadGateway: (message: string, content?: object) => void
      statusBadRequest: (message: string, content?: object) => void
      statusConflict: (message: string, content?: object) => void
      statusContinue: (message: string, content?: object) => void
      statusCreated: (message: string, content?: object) => void
      statusExpectationFailed: (message: string, content?: object) => void
      statusFailedDependency: (message: string, content?: object) => void
      statusForbidden: (message: string, content?: object) => void
      statusGatewayTimeout: (message: string, content?: object) => void
      statusGone: (message: string, content?: object) => void
      statusHttpVersionNotSupported: (message: string, content?: object) => void
      statusImATeapot: (message: string, content?: object) => void
      statusInsufficientSpaceOnResource: (message: string, content?: object) => void
      statusInsufficientStorage: (message: string, content?: object) => void
      statusInternalServerError: (message: string, content?: object) => void
      statusLengthRequired: (message: string, content?: object) => void
      statusLocked: (message: string, content?: object) => void
      statusMethodFailure: (message: string, content?: object) => void
      statusMethodNotAllowed: (message: string, content?: object) => void
      statusMovedPermanently: (message: string, content?: object) => void
      statusMovedTemporarily: (message: string, content?: object) => void
      statusMultiStatus: (message: string, content?: object) => void
      statusMultipleChoices: (message: string, content?: object) => void
      statusNetworkAuthenticationRequired: (message: string, content?: object) => void
      statusNoContent: (message: string, content?: object) => void
      statusNonAuthoritativeInformation: (message: string, content?: object) => void
      statusNotAcceptable: (message: string, content?: object) => void
      statusNotFound: (message: string, content?: object) => void
      statusNotImplemented: (message: string, content?: object) => void
      statusNotModified: (message: string, content?: object) => void
      statusOk: (message: string, content?: object) => void
      statusPartialContent: (message: string, content?: object) => void
      statusPaymentRequired: (message: string, content?: object) => void
      statusPermanentRedirect: (message: string, content?: object) => void
      statusPreconditionFailed: (message: string, content?: object) => void
      statusPreconditionRequired: (message: string, content?: object) => void
      statusProcessing: (message: string, content?: object) => void
      statusProxyAuthenticationRequired: (message: string, content?: object) => void
      statusRequestHeaderFieldsTooLarge: (message: string, content?: object) => void
      statusRequestTimeout: (message: string, content?: object) => void
      statusRequestTooLong: (message: string, content?: object) => void
      statusRequestUriTooLong: (message: string, content?: object) => void
      statusRequestedRangeNotSatisfiable: (message: string, content?: object) => void
      statusResetContent: (message: string, content?: object) => void
      statusSeeOther: (message: string, content?: object) => void
      statusServiceUnavailable: (message: string, content?: object) => void
      statusSwitchingProtocols: (message: string, content?: object) => void
      statusTemporaryRedirect: (message: string, content?: object) => void
      statusTooManyRequests: (message: string, content?: object) => void
      statusUnauthorized: (message: string, content?: object) => void
      statusUnprocessableEntity: (message: string, content?: object) => void
      statusUnsupportedMediaType: (message: string, content?: object) => void
      statusUseProxy: (message: string, content?: object) => void
    }
  }
}
const hasAnyKey = (obj: object) => Object.keys(obj).length !== 0

const easyResponse = (req: Request, res: Response, next: NextFunction) => {
  for(const [code, status] of Object.entries(httpStatusCodes)){
    const success = ['1','2'].includes(String(code).charAt(0));
    (res as any)['status'+status] = function(message: string, content?: object) {
      const hasContent =  content && hasAnyKey(content)
      this.status(code).json({
        success,
        message,
        data: content && success ? content : undefined,
        errors: content && !success ? content : undefined
      })
    }
  }
  next()
}

export default easyResponse