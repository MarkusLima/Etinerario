const calcularCoordenadaMaisProxima = (coordenadas) => {
    try {
        
        const coordenadasOrdenadas = coordenadas.map((coordenada) => {
            var x = coordenada.x;
            var y = coordenada.y;
            var id = coordenada.id;
            return { x, y, id };
        }).sort((a, b) => {
            const distanciaA = calcularDistancia(a.x, a.y, 0, 0);
            const distanciaB = calcularDistancia(b.x, b.y, 0, 0);
            return distanciaA - distanciaB;
        });
    
        const coordenadasMaisProximas = coordenadasOrdenadas.map((coordenada, index) => {
            const coordenadaMaisProxima = encontrarCoordenadaMaisProxima(
                coordenadasOrdenadas.slice(index + 1), 
                coordenada.x, 
                coordenada.y
            );
            return { coordenada, coordenadaMaisProxima };
        });
    
        return coordenadasMaisProximas;
        
    } catch (error) {
        console.log(error.message);
        
    }
}
  
function encontrarCoordenadaMaisProxima(pontos, x, y) {
    let distanciaMinima = Infinity;
    let coordenadaMaisProxima = null;

    for (const ponto of pontos) {
        const distancia = calcularDistancia(x, y, ponto.x, ponto.y);
        if (distancia < distanciaMinima) {
            distanciaMinima = distancia;
            coordenadaMaisProxima = ponto;
        }
    }

    return coordenadaMaisProxima;
}
  
function calcularDistancia(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export default calcularCoordenadaMaisProxima;