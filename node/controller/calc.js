import response from '../tools/response.js';
import database from '../config/database.js';
import calcularCoordenadaMaisProxima from '../tools/calcRoute.js';

export const calculaDistancia = async (req, res) => {

    try {

        const resp = await database.query("SELECT id, lat, long FROM clients");
        var points = [];

        points.push({id:0, x:0, y:0});//Ponto de referencia (0,0)

        for (let index = 0; index < resp.rows.length; index++) {
            points.push(
                {
                    id:resp.rows[index].id, 
                    x:resp.rows[index].lat.replace(".",""),
                    y:resp.rows[index].long.replace(".","")
                }
            ); 
        }

        var points_ordenados = calcularCoordenadaMaisProxima(points);

        return response(res, 200, true, 'Ok', points_ordenados);
        
    } catch (error) {
        console.log(error);
        return response(res, 500, false, error);
    }   
}