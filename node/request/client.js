import response from './../tools/response.js';

export const requestFindId = (req, res, next) => {

    if (!req.params.id) {
        return response(res, 400, false, 'Required params id.');
    }

    next()
}

export const requestDestroy = (req, res, next) => {

    if (!req.params.id) {
        return response(res, 400, false, 'Required params id.');
    }

    next()
}

export const requestUpdate = (req, res, next) => {

    if (!req.params.id) {
        return response(res, 400, false, 'Required params id.');
    }

    if (!req.body.name) {
        return response(res, 400, false, 'Required input name.');
    }

    if (!req.body.email) {
        return response(res, 400, false, 'Required input email.');
    }

    if (!req.body.phone) {
        return response(res, 400, false, 'Required input phone..');
    }

    if (!req.body.lat) {
        return response(res, 400, false, 'Required input latitude.');
    }

    if (!req.body.long) {
        return response(res, 400, false, 'Required input longitude.');
    }

    next()
}

export const requestCreate = (req, res, next) => {

    if (!req.body.name) {
        return response(res, 400, false, 'Required input name.');
    }

    if (!req.body.email) {
        return response(res, 400, false, 'Required input email.');
    }

    if (!req.body.phone) {
        return response(res, 400, false, 'Required input phone..');
    }

    if (!req.body.lat) {
        return response(res, 400, false, 'Required input latitude.');
    }

    if (!req.body.long) {
        return response(res, 400, false, 'Required input longitude.');
    }

    next()
}