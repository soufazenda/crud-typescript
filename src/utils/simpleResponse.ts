import { Request, Response, NextFunction } from 'express'

const httpStatusCodes = {
  100: 'Continue',
  101: 'SwitchingProtocols',
  102: 'Processing',
  200: 'Ok',
  201: 'Created',
  202: 'Accepted',
  203: 'NonAuthoritativeInformation',
  204: 'NoContent',
  205: 'ResetContent',
  206: 'PartialContent',
  207: 'MultiStatus',
  300: 'MultipleChoices',
  301: 'MovedPermanently',
  302: 'MovedTemporarily',
  303: 'SeeOther',
  304: 'NotModified',
  305: 'UseProxy',
  307: 'TemporaryRedirect',
  308: 'PermanentRedirect',
  400: 'BadRequest',
  401: 'Unauthorized',
  402: 'PaymentRequired',
  403: 'Forbidden',
  404: 'NotFound',
  405: 'MethodNotAllowed',
  406: 'NotAcceptable',
  407: 'ProxyAuthenticationRequired',
  408: 'RequestTimeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'LengthRequired',
  412: 'PreconditionFailed',
  413: 'RequestTooLong',
  414: 'RequestUriTooLong',
  415: 'UnsupportedMediaType',
  416: 'RequestedRangeNotSatisfiable',
  417: 'ExpectationFailed',
  418: 'ImATeapot',
  419: 'InsufficientSpaceOnResource',
  420: 'MethodFailure',
  422: 'UnprocessableEntity',
  423: 'Locked',
  424: 'FailedDependency',
  428: 'PreconditionRequired',
  429: 'TooManyRequests',
  431: 'RequestHeaderFieldsTooLarge',
  451: 'UnavailableForLegalReasons',
  500: 'InternalServerError',
  501: 'NotImplemented',
  502: 'BadGateway',
  503: 'ServiceUnavailable',
  504: 'GatewayTimeout',
  505: 'HttpVersionNotSupported',
  507: 'InsufficientStorage',
  511: 'NetworkAuthenticationRequired',
}

export interface Options {
  headers: {[key: string]: any}
}

declare global {
  namespace Express {
    interface Response {
      statusAccepted: (message: string, content?: object, options?: Options) => void
      statusBadGateway: (message: string, content?: object, options?: Options) => void
      statusBadRequest: (message: string, content?: object, options?: Options) => void
      statusConflict: (message: string, content?: object, options?: Options) => void
      statusContinue: (message: string, content?: object, options?: Options) => void
      statusCreated: (message: string, content?: object, options?: Options) => void
      statusExpectationFailed: (message: string, content?: object, options?: Options) => void
      statusFailedDependency: (message: string, content?: object, options?: Options) => void
      statusForbidden: (message: string, content?: object, options?: Options) => void
      statusGatewayTimeout: (message: string, content?: object, options?: Options) => void
      statusGone: (message: string, content?: object, options?: Options) => void
      statusHttpVersionNotSupported: (message: string, content?: object, options?: Options) => void
      statusImATeapot: (message: string, content?: object, options?: Options) => void
      statusInsufficientSpaceOnResource: (message: string, content?: object, options?: Options) => void
      statusInsufficientStorage: (message: string, content?: object, options?: Options) => void
      statusInternalServerError: (message: string, content?: object, options?: Options) => void
      statusLengthRequired: (message: string, content?: object, options?: Options) => void
      statusLocked: (message: string, content?: object, options?: Options) => void
      statusMethodFailure: (message: string, content?: object, options?: Options) => void
      statusMethodNotAllowed: (message: string, content?: object, options?: Options) => void
      statusMovedPermanently: (message: string, content?: object, options?: Options) => void
      statusMovedTemporarily: (message: string, content?: object, options?: Options) => void
      statusMultiStatus: (message: string, content?: object, options?: Options) => void
      statusMultipleChoices: (message: string, content?: object, options?: Options) => void
      statusNetworkAuthenticationRequired: (message: string, content?: object, options?: Options) => void
      statusNoContent: (message: string, content?: object, options?: Options) => void
      statusNonAuthoritativeInformation: (message: string, content?: object, options?: Options) => void
      statusNotAcceptable: (message: string, content?: object, options?: Options) => void
      statusNotFound: (message: string, content?: object, options?: Options) => void
      statusNotImplemented: (message: string, content?: object, options?: Options) => void
      statusNotModified: (message: string, content?: object, options?: Options) => void
      statusOk: (message: string, content?: object, options?: Options) => void
      statusPartialContent: (message: string, content?: object, options?: Options) => void
      statusPaymentRequired: (message: string, content?: object, options?: Options) => void
      statusPermanentRedirect: (message: string, content?: object, options?: Options) => void
      statusPreconditionFailed: (message: string, content?: object, options?: Options) => void
      statusPreconditionRequired: (message: string, content?: object, options?: Options) => void
      statusProcessing: (message: string, content?: object, options?: Options) => void
      statusProxyAuthenticationRequired: (message: string, content?: object, options?: Options) => void
      statusRequestHeaderFieldsTooLarge: (message: string, content?: object, options?: Options) => void
      statusRequestTimeout: (message: string, content?: object, options?: Options) => void
      statusRequestTooLong: (message: string, content?: object, options?: Options) => void
      statusRequestUriTooLong: (message: string, content?: object, options?: Options) => void
      statusRequestedRangeNotSatisfiable: (message: string, content?: object, options?: Options) => void
      statusResetContent: (message: string, content?: object, options?: Options) => void
      statusSeeOther: (message: string, content?: object, options?: Options) => void
      statusServiceUnavailable: (message: string, content?: object, options?: Options) => void
      statusSwitchingProtocols: (message: string, content?: object, options?: Options) => void
      statusTemporaryRedirect: (message: string, content?: object, options?: Options) => void
      statusTooManyRequests: (message: string, content?: object, options?: Options) => void
      statusUnauthorized: (message: string, content?: object, options?: Options) => void
      statusUnprocessableEntity: (message: string, content?: object, options?: Options) => void
      statusUnsupportedMediaType: (message: string, content?: object, options?: Options) => void
      statusUseProxy: (message: string, content?: object, options?: Options) => void
    }
    export interface Request {
      userId: string
      profileType: 'common' | 'corporate'
    }
  }
}
const hasAnyKey = (obj: object) => Object.keys(obj).length !== 0

const easyResponse = (req: Request, res: Response, next: NextFunction) => {
  for (const [code, status] of Object.entries(httpStatusCodes)) {
    const success = ['1', '2'].includes(String(code).charAt(0))

    
    ;(res as Response)['status' + status] = function (
      message: string,
      content?: object,
      options?: Options
      ) {

      const headers = options?.headers
      const hasContent = content && hasAnyKey(content)
      if(headers && hasAnyKey(headers)){
        const headersList = Object.keys(headers)
        headersList.forEach( key => this.set(key, headers[key]))
      }

      
      this.status(Number(code)).json({
        success,
        message,
        data: hasContent && success ? content : undefined,
        errors: hasContent && !success ? content : undefined,
      })
    }
  }
  next()
}

export default easyResponse
