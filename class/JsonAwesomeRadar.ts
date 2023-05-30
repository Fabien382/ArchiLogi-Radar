require('node-fecth');
export class JsonAwesomeRadar implements dataInterfaces {
  getData(): Radar[] {
    fetch('../datas/AwesomeRadar.json')
      .then((response) => response.json())
      .then((data: any) => {
        const radarList: Radar[] = [];

        data.incidents.forEach((incident: [string, string]) => {
          const flashRadar = new FlashRadar(
            incident[0],
            null,
            null,
            null,
            new Date(incident[1]),
            null
          );

          const radar = new Radar(
            null,
            data.metadata.localisation,
            flashRadar,
            data.metadata.speedThreshold
          );
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
