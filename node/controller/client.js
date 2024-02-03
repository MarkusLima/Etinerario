import response from '../tools/response.js';
import database from '../config/database.js';

export const all = async (req, res) => {

    try {
        var where = [];
        var query = "SELECT * FROM clients";

        if (req.query.id){
            where.push(` id = ${req.query.id}`); 
        }

        if (req.query.name){
            where.push(` name like '%${req.query.name}%'`); 
        }

        if (req.query.email){
            where.push(` email like '%${req.query.email}%'`); 
        }

        if (req.query.phone){
            where.push(` phone like '%${req.query.phone}%'`); 
        }

        if (where.length > 0) {
            
            for (let index = 0; index < where.length; index++) {
                
                if (index == 0) {
                    query += ` where`+where[index];
                } else {
                    query += ` and`+where[index];
                }
                
            }
        }

        var cloneCount = query;
        cloneCount = cloneCount.replace("*", "count(id) as qtd");
        var count = await database.query(cloneCount);
        var totalPages = Math.ceil(parseInt(count.rows[0].qtd) / 10);
        var totalItens = count.rows[0].qtd;
        var totalItensPage = 10;
        
        var pageCurrent = 1;

        if (req.query.page && req.query.page > 1){
            pageCurrent = parseInt(req.query.page) + 1;
            var offSet = (parseInt(req.query.page) - 1 ) * 10;
            console.log(offSet)
            query += ` ORDER BY id DESC LIMIT ${totalItensPage} OFFSET ${offSet} `; 
        } else {
            query += ` ORDER BY id DESC LIMIT ${totalItensPage}`; 
        }

        const resp = await database.query(query);
        const body = {
            body:resp.rows,
            totalPages:totalPages,
            totalItens:totalItens,
            pageCurrent:pageCurrent,
            totalItensPage:totalItensPage
        };
        
        return response(res, 200, true, 'Ok', body);
        
    } catch (error) {
        console.log(error);
        return response(res, 500, false, error);
    } 
}

export const findId = async (req, res) => {

    try {
        const id = req.params.id;
        const resp = await database.query(`SELECT * FROM clients where id = ${id}`);

        if (resp.rowCount > 0) {
            return response(res, 200, true, 'Ok', resp.rows);
        } else {
            return response(res, 400, false, 'Client not found.', resp.rows);
        }
        
        
    } catch (error) {
        console.log(error);
        return response(res, 500, false, error);
    } 
}

export const destroy = async (req, res) => {

    try {
        const id = req.params.id;
        const resp = await database.query(`DELETE FROM clients where id = ${id}`);

        console.log(resp)

        if (resp.rowCount > 0) {
            return response(res, 200, true, 'Ok', resp.rows);
        } else {
            return response(res, 400, false, 'Client not found.', resp.rows);
        }
        
        
    } catch (error) {
        console.log(error);
        return response(res, 500, false, error);
    } 
}

export const update = async (req, res) => {

    try {
        const id = req.params.id;
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const lat = req.body.lat;
        const long = req.body.long;

        const resp = await database.query(
            `UPDATE clients SET name = '${name}', email = '${email}', phone = '${phone}', lat = '${lat}', long = '${long}' where(id = ${id})`
        );

        console.log(resp)

        if (resp.rowCount > 0) {
            return response(res, 200, true, 'Ok', resp.rows);
        } else {
            return response(res, 400, false, 'Client not found.', resp.rows);
        }
        
    } catch (error) {
        console.log(error);
        return response(res, 500, false, error);
    } 
}

export const create = async (req, res) => {

    try {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const lat = req.body.lat;
        const long = req.body.long;

        const resp = await database.query(
            `INSERT INTO clients (name,email,phone,lat,long) VALUES ('${name}','${email}','${phone}','${lat}','${long}');`
        );

        if (resp.rowCount > 0) {
            return response(res, 200, true, 'Created success.', resp.rows);
        } else {
            return response(res, 400, false, 'Fail created clients.', resp.rows);
        }
        
    } catch (error) {
        console.log(error);
        return response(res, 500, false, error.detail);
    }  
}