import Boom from '@hapi/boom';
import _isEmpty from 'lodash/isEmpty';

/**
 * Middleware to handle empty JSON body requests and other edge cases if any.
 *
 * @param  {Object}   request
 * @param  {Object}   response
 * @param  {Function} next
 */
export default function json(request, response, next) {
    const { body, method } = request;
    const disallowedHttpHeaders = ['PUT', 'POST', 'PATCH'];

    response.body = 'test';

    if (
        request.is('application/json') &&
        disallowedHttpHeaders.includes(method) &&
        _isEmpty(body)
    ) {
        throw Boom.badRequest('Empty JSON');
    }

    var json = response.json;
    response.json = function (obj) {
        if (obj?.error) {
            obj = {
                status: 1,
                error: obj.error.code || 500,
                message: obj.error.message,
            };
        } else {
            if (Array.isArray(obj))
                obj = {
                    status: 0,
                    content: {
                        results: obj,
                    },
                };
            else
                obj = {
                    status: 0,
                    content: {
                        result: obj,
                    },
                };
        }
        json.call(this, obj);
    };

    next();
}
