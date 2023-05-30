"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonAwesomeRadar = void 0;
require('node-fetch');
class JsonAwesomeRadar {
    getData() {
        fetch('../datas/AwesomeRadar.json')
            .then((response) => response.json())
            .then((data) => {
            const radarList = [];
            data.incidents.forEach((incident) => {
                const flashRadar = new FlashRadar(incident[0], null, null, null, new Date(incident[1]), null);
                const radar = new Radar(null, data.metadata.localisation, flashRadar, data.metadata.speedThreshold);
                radarList.push(radar);
            });
            return radarList;
        })
            .catch((error) => {
            // Gérez les erreurs
            throw new Error("Une erreur s'est produite.");
        });
        return [];
    }
}
exports.JsonAwesomeRadar = JsonAwesomeRadar;
