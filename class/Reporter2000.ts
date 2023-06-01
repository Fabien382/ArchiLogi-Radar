// require('node-fetch');
// require('xml2js');
// import { dataInterfaces } from '../interfaces/dataInterfaces';
// import { Radar } from '../models/Radar';
// import { FlashRadar } from '../models/FlashRadar';

// export class Reporter2000 implements dataInterfaces {
//   getData(): Radar[] {
//     fetch('../datas/Reporter2000.xml')
//       .then((response) => response.json())
//       .then((data: any) => {
//         const radarList: Radar[] = [];

//         let flashRadar: FlashRadar[] = [];
//         data.reports.forEach((reports: any) => {
//           flashRadar.push(
//             new FlashRadar(
//               reports.licensePlate,
//               null,
//               null,
//               reports.speed,
//               reports.date,
//               reports.evidenceUrl
//             )
//           );
//         });
//         const radar = new Radar(data.name, data.localisation, flashRadar, null);
//         radarList.push(radar);
//         return radarList;
//       })
//       .catch((error) => {
//         // Gérez les erreurs
//         throw new Error("Une erreur s'est produite.");
//       });

//     return [];
//   }
// }
