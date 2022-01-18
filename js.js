
function getDistanceFromLatLongInKm(originLat, originLong, destinationLat, destinationLong) {

  var Radius = 6371; // dünya yarıçapı km 
  var dLat = deg2rad(destinationLat - originLat);
  var dLong = deg2rad(destinationLong - originLong);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(originLat)) * Math.cos(deg2rad(destinationLat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var result = Radius * c;// KM cinsinden mesafe 
  return result;
}

function deg2rad(mDeg) {
  // Açıları dereceden radyana dönüştürme
  return mDeg * (Math.PI / 180)
}

//Başlangıçta çekilen konum
var centerLng = 39;
var centerLat = 37;


var map = L.map('map').setView([centerLng, centerLat], 6);
var buffer = 0.04;
var collection = [];
var geojsonlist = [];


//https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
//http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '<a style="color:#000" target="_blank" href="https://ciftklik.net">CiftKlik</a> | <a style="color:#000" href="https://github.com/mzuvin">@mzuvin</a>' }).addTo(map);

//dugumler = şehirler grafı

dugumler = {
  '0': { coord: [37, 35.321333] },
  '1': { coord: [37.764751, 38.278561] },
  '2': { coord: [38.750714, 30.556692] },
  '3': { coord: [39.626922, 43.021596] },
  '4': { coord: [40.64991, 35.83532] },
  '5': { coord: [39.92077, 32.85411] },
  '6': { coord: [36.88414, 30.70563] },
  '7': { coord: [41.18277, 41.818292] },
  '8': { coord: [37.856041, 27.841631] },
  '9': { coord: [39.648369, 27.88261] },
  '10': { coord: [40.056656, 30.066524] },
  '11': { coord: [39.062635, 40.76961] },
  '12': { coord: [38.393799, 42.12318] },
  '13': { coord: [40.575977, 31.578809] },
  '14': { coord: [37.461267, 30.066524] },
  '15': { coord: [40.266864, 29.063448] },
  '16': { coord: [40.155312, 26.41416] },
  '17': { coord: [40.601343, 33.613421] },
  '18': { coord: [40.550556, 34.955556] },
  '19': { coord: [37.77652, 29.08639] },
  '20': { coord: [37.91441, 40.230629] },
  '21': { coord: [41.681808, 26.562269] },
  '22': { coord: [38.680969, 39.226398] },
  '23': { coord: [39.75, 39.5] },
  '24': { coord: [39.9, 41.27] },
  '25': { coord: [39.776667, 30.520556] },
  '26': { coord: [37.06622, 37.38332] },
  '27': { coord: [40.912811, 38.38953] },
  '28': { coord: [40.438588, 39.508556] },
  '29': { coord: [37.583333, 43.733333] },
  '30': { coord: [36.401849, 36.34981] },
  '31': { coord: [37.764771, 30.556561] },
  '32': { coord: [36.8, 34.633333] },
  '33': { coord: [41.00527, 28.97696] },
  '34': { coord: [38.41885, 27.12872] },
  '35': { coord: [40.616667, 43.1] },
  '36': { coord: [41.38871, 33.78273] },
  '37': { coord: [38.73122, 35.478729] },
  '38': { coord: [41.733333, 27.216667] },
  '39': { coord: [39.14249, 34.17091] },
  '40': { coord: [40.85327, 29.88152] },
  '41': { coord: [37.866667, 32.483333] },
  '42': { coord: [39.416667, 29.983333] },
  '43': { coord: [38.35519, 38.30946] },
  '44': { coord: [38.619099, 27.428921] },
  '45': { coord: [37.585831, 36.937149] },
  '46': { coord: [37.321163, 40.724477] },
  '47': { coord: [37.215278, 28.363611] },
  '48': { coord: [38.946189, 41.753893] },
  '49': { coord: [38.69394, 34.685651] },
  '50': { coord: [37.966667, 34.683333] },
  '51': { coord: [40.983879, 37.876411] },
  '52': { coord: [41.02005, 40.523449] },
  '53': { coord: [40.693997, 30.435763] },
  '54': { coord: [41.292782, 36.33128] },
  '55': { coord: [37.933333, 41.95] },
  '56': { coord: [42.02314, 35.153069] },
  '57': { coord: [39.747662, 37.017879] },
  '58': { coord: [40.983333, 27.516667] },
  '59': { coord: [40.316667, 36.55] },
  '60': { coord: [41.00145, 39.7178] },
  '61': { coord: [39.307355, 39.438778] },
  '62': { coord: [37.159149, 38.796909] },
  '63': { coord: [38.682301, 29.40819] },
  '64': { coord: [38.48914, 43.40889] },
  '65': { coord: [39.818081, 34.81469] },
  '66': { coord: [41.456409, 31.798731] },
  '67': { coord: [38.36869, 34.03698] },
  '68': { coord: [40.255169, 40.22488] },
  '69': { coord: [37.17593, 33.228748] },
  '70': { coord: [39.846821, 33.515251] },
  '71': { coord: [37.881168, 41.13509] },
  '72': { coord: [37.418748, 42.491834] },
  '73': { coord: [41.581051, 32.460979] },
  '74': { coord: [41.110481, 42.702171] },
  '75': { coord: [39.887984, 44.004836] },
  '76': { coord: [40.65, 29.266667] },
  '77': { coord: [41.2061, 32.62035] },
  '78': { coord: [36.718399, 37.12122] },
  '79': { coord: [37.213026, 36.176261] },
  '80': { coord: [40.843849, 31.15654] }
};

isimler = ["Adana", "Adıyaman", "Afyon", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
  "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan",
  "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri",
  "Kırklareli", "Kırşehir", "Kocaeli", "Konya", "Kütahya", "Malaytya", "Manisa", "Maraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu",
  "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Urfa", "Uşak", "Van", "Yozgat",
  "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye",
  "Düzce"];


function hn(hedef) {
  // sezgisel maaliyetin(h(n)) fonksiyon
  var hedef = dugumler[hedef].coord;
  var kusMesafeDizi = [];
  for (var i in dugumler) {
    var uzaklik = getDistanceFromLatLongInKm(dugumler[i].coord[0], dugumler[i].coord[1], hedef[0], hedef[1]);
    kusMesafeDizi.push(parseInt(uzaklik.toFixed(0)));
  }
  return kusMesafeDizi;
}

function StartFinishAc(start, finish) {
  L.circleMarker(dugumler[start].coord, { radius: 8, color: "#00ff00", fillOpacity: 1 }).bindPopup("start: " + isimler[start] + "" + start + '').addTo(map);
  L.circleMarker(dugumler[finish].coord, { radius: 8, color: "#0", fillOpacity: 1 }).bindPopup('finish: ' + isimler[finish] + finish + '').addTo(map);
}

function dugumleriAc(dugumler) {
  for (var a in dugumler) {
    L.marker(dugumler[a].coord).addTo(map).bindPopup(a + "." + isimler[a]).openPopup();
  }
}
dugumleriAc(dugumler);



var yollar = [76, 15, 16, 44, 63, 2, 5, 70, 65, 59, 4, 36, 73, 56, 36, 56, 54, 51, 57, 23, 28, 27, 60, 27, 51, 59, 57, 59, 37, 65, 49, 37, 57, 45, 43, 57, 23, 61, 11, 24, 48, 24, 35, 74, 24, 74, 7, 24, 7, 52, 60, 28, 68, 24, 23, 61, 22, 11, 22, 20, 11, 48, 12, 3, 35, 75, 3, 64, 55, 12, 71, 20, 22, 43, 1, 45, 26, 1, 62, 20, 46, 71, 55, 72, 64, 29, 72, 46, 62, 26, 78, 79, 30, 79, 0, 32, 50, 49, 67, 50, 49, 39, 70, 17, 70, 65, 17, 18, 36, 65, 18, 4, 54, 36, 73, 77, 36, 17, 77, 66, 73, 77, 80, 66, 13, 17, 5, 70, 39, 67, 5, 25, 53, 80, 13, 5, 41, 2, 31, 41, 67, 69, 32, 6, 69, 41, 6, 14, 19, 2, 14, 19, 8, 47, 6, 19, 44, 8, 34, 44, 9, 42, 63, 2, 42, 25, 10, 42, 15, 9, 16, 15, 10, 76, 40, 10, 53, 40, 33, 58, 21, 38, 58, 33, 40, 33, 40, 10, 42, 2, 31, 19, 31, 41, 67, 50, 79, 45, 50, 45, 37, 43, 23, 57, 28, 52, 68, 23];//yollar i den j ye gider şeklinde

yollardizi2 = [];
for (i in yollar) {
  yollardizi2.push(dugumler[yollar[i]].coord);
}
yollariciz(yollardizi2);

function yollariciz(coord) {
  L.polyline(coord, { color: '#1E90FF', weight: 2 }).addTo(map);
}

var komsuMesafeGraf = [
  { start: "0", finish: "32", distance: 85 },//Adana
  { start: "0", finish: "79", distance: 98 },

  { start: "1", finish: "45", distance: 161 },//Adıyaman
  { start: "1", finish: "26", distance: 152 },
  { start: "1", finish: "62", distance: 111 },
  { start: "1", finish: "43", distance: 106 },

  { start: "2", finish: "42", distance: 227 },//Afyon
  { start: "2", finish: "63", distance: 110 },
  { start: "2", finish: "19", distance: 219 },
  { start: "2", finish: "14", distance: 164 },
  { start: "2", finish: "31", distance: 165 },
  { start: "2", finish: "41", distance: 227 },
  { start: "2", finish: "5", distance: 261 },

  { start: "3", finish: "35", distance: 178 },//Ağrı
  { start: "3", finish: "75", distance: 200 },
  { start: "3", finish: "64", distance: 227 },
  { start: "3", finish: "12", distance: 233 },

  { start: "4", finish: "36", distance: 250 },//Amasya
  { start: "4", finish: "54", distance: 124 },
  { start: "4", finish: "59", distance: 113 },
  { start: "4", finish: "18", distance: 93 },

  { start: "5", finish: "13", distance: 187 },//Ankara
  { start: "5", finish: "25", distance: 233 },
  { start: "5", finish: "2", distance: 261 },
  { start: "5", finish: "41", distance: 271 },
  { start: "5", finish: "67", distance: 237 },
  { start: "5", finish: "70", distance: 72 },
  { start: "5", finish: "17", distance: 131 },

  { start: "6", finish: "47", distance: 312 },//Antalya
  { start: "6", finish: "19", distance: 224 },
  { start: "6", finish: "14", distance: 127 },
  { start: "6", finish: "41", distance: 303 },
  { start: "6", finish: "69", distance: 326 },
  { start: "6", finish: "32", distance: 556 },

  { start: "7", finish: "52", distance: 149 },//Artvin
  { start: "7", finish: "24", distance: 195 },
  { start: "7", finish: "74", distance: 135 },

  { start: "8", finish: "34", distance: 112 },//Aydın
  { start: "8", finish: "44", distance: 136 },
  { start: "8", finish: "19", distance: 125 },
  { start: "8", finish: "47", distance: 98 },

  { start: "9", finish: "16", distance: 193 },//Balıkesir
  { start: "9", finish: "44", distance: 154 },
  { start: "9", finish: "42", distance: 227 },
  { start: "9", finish: "15", distance: 148 },

  { start: "10", finish: "15", distance: 96 },//Bilecik
  { start: "10", finish: "76", distance: 110 },
  { start: "10", finish: "40", distance: 140 },
  { start: "10", finish: "53", distance: 107 },
  { start: "10", finish: "25", distance: 78 },
  { start: "10", finish: "42", distance: 114 },

  { start: "11", finish: "24", distance: 180 },//Bingöl
  { start: "11", finish: "48", distance: 115 },
  { start: "11", finish: "20", distance: 142 },
  { start: "11", finish: "22", distance: 141 },
  { start: "11", finish: "61", distance: 107 },

  { start: "12", finish: "48", distance: 83 },//Bitlis
  { start: "12", finish: "3", distance: 120 },
  { start: "12", finish: "71", distance: 134 },
  { start: "12", finish: "55", distance: 95 },

  { start: "13", finish: "80", distance: 50 },//Bolu
  { start: "13", finish: "66", distance: 158 },
  { start: "13", finish: "17", distance: 207 },
  { start: "13", finish: "5", distance: 187 },

  { start: "14", finish: "19", distance: 149 },//Burdur
  { start: "14", finish: "2", distance: 165 },
  { start: "14", finish: "6", distance: 125 },

  { start: "15", finish: "76", distance: 69 },//Bursa
  { start: "15", finish: "10", distance: 96 },
  { start: "15", finish: "42", distance: 182 },
  { start: "15", finish: "9", distance: 145 },
  { start: "15", finish: "16", distance: 273 },

  { start: "16", finish: "9", distance: 193 },//Çanakkale
  { start: "16", finish: "44", distance: 315 },
  { start: "16", finish: "15", distance: 273 },

  { start: "17", finish: "36", distance: 106 },//Çankırı
  { start: "17", finish: "18", distance: 155 },
  { start: "17", finish: "65", distance: 172 },
  { start: "17", finish: "70", distance: 107 },
  { start: "17", finish: "77", distance: 160 },
  { start: "17", finish: "13", distance: 207 },
  { start: "17", finish: "5", distance: 131 },

  { start: "18", finish: "4", distance: 93 },//Çorum
  { start: "18", finish: "17", distance: 155 },
  { start: "18", finish: "36", distance: 200 },
  { start: "18", finish: "65", distance: 104 },

  { start: "19", finish: "44", distance: 202 },//Denizli
  { start: "19", finish: "8", distance: 125 },
  { start: "19", finish: "6", distance: 224 },
  { start: "19", finish: "14", distance: 149 },
  { start: "19", finish: "2", distance: 219 },
  { start: "19", finish: "31", distance: 165 },

  { start: "20", finish: "11", distance: 142 },//Diyarbakır
  { start: "20", finish: "22", distance: 154 },
  { start: "20", finish: "71", distance: 97 },
  { start: "20", finish: "46", distance: 93 },
  { start: "20", finish: "62", distance: 179 },

  { start: "21", finish: "38", distance: 62 },//Edirne
  { start: "21", finish: "58", distance: 65 },

  { start: "22", finish: "43", distance: 100 },//Elazığ
  { start: "22", finish: "61", distance: 77 },
  { start: "22", finish: "11", distance: 141 },
  { start: "22", finish: "20", distance: 154 },

  { start: "23", finish: "28", distance: 130 },//Erzincan
  { start: "23", finish: "24", distance: 188 },
  { start: "23", finish: "57", distance: 246 },
  { start: "23", finish: "61", distance: 126 },
  { start: "23", finish: "43", distance: 363 },
  { start: "23", finish: "68", distance: 155 },

  { start: "24", finish: "23", distance: 188 },//Erzurum
  { start: "24", finish: "68", distance: 125 },
  { start: "24", finish: "7", distance: 195 },
  { start: "24", finish: "74", distance: 227 },
  { start: "24", finish: "35", distance: 211 },
  { start: "24", finish: "48", distance: 204 },
  { start: "24", finish: "11", distance: 180 },

  { start: "25", finish: "5", distance: 233 },//Eskişehir
  { start: "25", finish: "10", distance: 78 },
  { start: "25", finish: "53", distance: 181 },
  { start: "25", finish: "42", distance: 76 },

  { start: "26", finish: "78", distance: 56 },//Antep
  { start: "26", finish: "45", distance: 77 },
  { start: "26", finish: "1", distance: 152 },
  { start: "26", finish: "62", distance: 154 },

  { start: "27", finish: "51", distance: 48 },//Giresun
  { start: "27", finish: "60", distance: 130 },
  { start: "27", finish: "28", distance: 163 },

  { start: "28", finish: "27", distance: 163 },//Gümüşhane
  { start: "28", finish: "60", distance: 101 },
  { start: "28", finish: "68", distance: 78 },
  { start: "28", finish: "23", distance: 130 },
  { start: "28", finish: "57", distance: 356 },
  { start: "28", finish: "52", distance: 176 },

  { start: "29", finish: "64", distance: 202 },//Hakkari
  { start: "29", finish: "72", distance: 189 },

  { start: "30", finish: "79", distance: 129 },//Hatay

  { start: "31", finish: "41", distance: 261 },//Isparta
  { start: "31", finish: "2", distance: 165 },
  { start: "31", finish: "19", distance: 165 },

  { start: "32", finish: "6", distance: 556 },//Mersin
  { start: "32", finish: "69", distance: 235 },
  { start: "32", finish: "0", distance: 85 },
  { start: "32", finish: "50", distance: 198 },

  { start: "33", finish: "40", distance: 111 },//İstanbul
  { start: "33", finish: "58", distance: 132 },

  { start: "34", finish: "8", distance: 112 },//İzmir
  { start: "34", finish: "44", distance: 35 },

  { start: "35", finish: "74", distance: 93 },//Kars
  { start: "35", finish: "24", distance: 211 },
  { start: "35", finish: "3", distance: 178 },
  { start: "35", finish: "75", distance: 140 },

  { start: "36", finish: "73", distance: 183 },//Kastamonu
  { start: "36", finish: "77", distance: 114 },
  { start: "36", finish: "17", distance: 106 },
  { start: "36", finish: "65", distance: 300 },
  { start: "36", finish: "18", distance: 200 },
  { start: "36", finish: "4", distance: 250 },
  { start: "36", finish: "54", distance: 290 },
  { start: "36", finish: "56", distance: 183 },

  { start: "37", finish: "49", distance: 81 },//Kayseri
  { start: "37", finish: "65", distance: 175 },
  { start: "37", finish: "59", distance: 263 },
  { start: "37", finish: "57", distance: 194 },
  { start: "37", finish: "45", distance: 273 },
  { start: "37", finish: "43", distance: 339 },

  { start: "38", finish: "21", distance: 62 },//Kırklareli
  { start: "38", finish: "58", distance: 121 },

  { start: "39", finish: "70", distance: 113 },//Kırşehir
  { start: "39", finish: "67", distance: 110 },
  { start: "39", finish: "49", distance: 91 },

  { start: "40", finish: "33", distance: 100 },//Kocaeli
  { start: "40", finish: "53", distance: 37 },
  { start: "40", finish: "10", distance: 140 },
  { start: "40", finish: "76", distance: 65 },

  { start: "41", finish: "2", distance: 227 },//Konya
  { start: "41", finish: "31", distance: 261 },
  { start: "41", finish: "6", distance: 303 },
  { start: "41", finish: "69", distance: 119 },
  { start: "41", finish: "67", distance: 148 },
  { start: "41", finish: "5", distance: 271 },

  { start: "42", finish: "10", distance: 114 },//Kütahya
  { start: "42", finish: "25", distance: 76 },
  { start: "42", finish: "2", distance: 227 },
  { start: "42", finish: "9", distance: 227 },
  { start: "42", finish: "15", distance: 182 },
  { start: "42", finish: "63", distance: 339 },

  { start: "43", finish: "57", distance: 246 },//Malatya
  { start: "43", finish: "45", distance: 220 },
  { start: "43", finish: "1", distance: 106 },
  { start: "43", finish: "22", distance: 100 },
  { start: "43", finish: "37", distance: 339 },
  { start: "43", finish: "23", distance: 363 },

  { start: "44", finish: "9", distance: 154 },//Manisa
  { start: "44", finish: "19", distance: 202 },
  { start: "44", finish: "34", distance: 35 },
  { start: "44", finish: "8", distance: 136 },
  { start: "44", finish: "16", distance: 315 },
  { start: "44", finish: "63", distance: 195 },

  { start: "45", finish: "57", distance: 339 },//Maraş
  { start: "45", finish: "43", distance: 220 },
  { start: "45", finish: "1", distance: 161 },
  { start: "45", finish: "26", distance: 77 },
  { start: "45", finish: "79", distance: 105 },
  { start: "45", finish: "50", distance: 397 },
  { start: "45", finish: "37", distance: 273 },

  { start: "46", finish: "62", distance: 188 },//Mardin
  { start: "46", finish: "20", distance: 93 },
  { start: "46", finish: "71", distance: 149 },
  { start: "46", finish: "72", distance: 149 },

  { start: "47", finish: "6", distance: 312 },//Muğla
  { start: "47", finish: "8", distance: 98 },

  { start: "48", finish: "12", distance: 83 },//Muş
  { start: "48", finish: "11", distance: 115 },
  { start: "48", finish: "24", distance: 204 },

  { start: "49", finish: "39", distance: 91 },//Nevşehir
  { start: "49", finish: "65", distance: 190 },
  { start: "49", finish: "37", distance: 81 },
  { start: "49", finish: "50", distance: 82 },
  { start: "49", finish: "67", distance: 75 },

  { start: "50", finish: "49", distance: 82 },//Niğde
  { start: "50", finish: "67", distance: 123 },
  { start: "50", finish: "32", distance: 198 },
  { start: "50", finish: "79", distance: 292 },
  { start: "50", finish: "45", distance: 397 },

  { start: "51", finish: "54", distance: 151 },//Ordu
  { start: "51", finish: "59", distance: 218 },
  { start: "51", finish: "57", distance: 314 },
  { start: "51", finish: "27", distance: 48 },

  { start: "52", finish: "60", distance: 75 },//Rize
  { start: "52", finish: "7", distance: 149 },
  { start: "52", finish: "28", distance: 176 },
  { start: "52", finish: "68", distance: 254 },

  { start: "53", finish: "40", distance: 37 },//Sakarya
  { start: "53", finish: "10", distance: 140 },
  { start: "53", finish: "25", distance: 181 },
  { start: "53", finish: "80", distance: 69 },

  { start: "54", finish: "56", distance: 155 },//Samsun
  { start: "54", finish: "36", distance: 250 },
  { start: "54", finish: "4", distance: 124 },
  { start: "54", finish: "51", distance: 151 },

  { start: "55", finish: "71", distance: 87 },//Siirt
  { start: "55", finish: "12", distance: 95 },
  { start: "55", finish: "64", distance: 260 },
  { start: "55", finish: "72", distance: 95 },

  { start: "56", finish: "36", distance: 290 },//Sinop
  { start: "56", finish: "54", distance: 155 },
  { start: "56", finish: "73", distance: 366 },

  { start: "57", finish: "59", distance: 108 },//Sivas
  { start: "57", finish: "51", distance: 314 },
  { start: "57", finish: "23", distance: 246 },
  { start: "57", finish: "43", distance: 246 },
  { start: "57", finish: "45", distance: 339 },
  { start: "57", finish: "37", distance: 194 },
  { start: "57", finish: "28", distance: 356 },

  { start: "58", finish: "33", distance: 132 },//Tekirdağ
  { start: "58", finish: "38", distance: 121 },
  { start: "58", finish: "21", distance: 65 },

  { start: "59", finish: "4", distance: 113 },//Tokat
  { start: "59", finish: "65", distance: 207 },
  { start: "59", finish: "37", distance: 263 },
  { start: "59", finish: "57", distance: 108 },
  { start: "59", finish: "51", distance: 218 },

  { start: "60", finish: "27", distance: 130 },//Trabzon
  { start: "60", finish: "28", distance: 101 },
  { start: "60", finish: "52", distance: 75 },

  { start: "61", finish: "11", distance: 107 },//Tunceli
  { start: "61", finish: "22", distance: 77 },
  { start: "61", finish: "23", distance: 126 },

  { start: "62", finish: "1", distance: 111 },//Urfa
  { start: "62", finish: "26", distance: 154 },
  { start: "62", finish: "20", distance: 179 },
  { start: "62", finish: "46", distance: 188 },

  { start: "63", finish: "44", distance: 195 },//Uşak
  { start: "63", finish: "42", distance: 339 },
  { start: "63", finish: "2", distance: 110 },

  { start: "64", finish: "3", distance: 227 },//Van
  { start: "64", finish: "55", distance: 264 },
  { start: "64", finish: "72", distance: 335 },
  { start: "64", finish: "29", distance: 202 },

  { start: "65", finish: "17", distance: 172 },//Yozgat
  { start: "65", finish: "36", distance: 300 },
  { start: "65", finish: "18", distance: 104 },
  { start: "65", finish: "70", distance: 140 },
  { start: "65", finish: "59", distance: 207 },
  { start: "65", finish: "49", distance: 190 },
  { start: "65", finish: "37", distance: 175 },

  { start: "66", finish: "13", distance: 158 },//Zonguldak
  { start: "66", finish: "73", distance: 89 },
  { start: "66", finish: "77", distance: 102 },
  { start: "66", finish: "80", distance: 114 },

  { start: "67", finish: "5", distance: 237 },//Aksaray
  { start: "67", finish: "39", distance: 110 },
  { start: "67", finish: "49", distance: 75 },
  { start: "67", finish: "50", distance: 123 },
  { start: "67", finish: "69", distance: 210 },
  { start: "67", finish: "41", distance: 148 },

  { start: "68", finish: "24", distance: 125 },//Bayburt
  { start: "68", finish: "28", distance: 78 },
  { start: "68", finish: "52", distance: 254 },
  { start: "68", finish: "23", distance: 155 },

  { start: "69", finish: "41", distance: 119 },//Karaman
  { start: "69", finish: "67", distance: 210 },
  { start: "69", finish: "6", distance: 326 },
  { start: "69", finish: "32", distance: 235 },

  { start: "70", finish: "5", distance: 72 },//Kırıkkale
  { start: "70", finish: "17", distance: 107 },
  { start: "70", finish: "39", distance: 113 },
  { start: "70", finish: "65", distance: 140 },

  { start: "71", finish: "12", distance: 134 },//Batman
  { start: "71", finish: "55", distance: 87 },
  { start: "71", finish: "46", distance: 149 },
  { start: "71", finish: "20", distance: 97 },

  { start: "72", finish: "46", distance: 149 },//Şırnak
  { start: "72", finish: "55", distance: 87 },
  { start: "72", finish: "29", distance: 189 },
  { start: "72", finish: "64", distance: 335 },

  { start: "73", finish: "66", distance: 89 },//Bartın
  { start: "73", finish: "77", distance: 89 },
  { start: "73", finish: "36", distance: 183 },
  { start: "73", finish: "56", distance: 366 },

  { start: "74", finish: "7", distance: 135 },//Ardahan
  { start: "74", finish: "24", distance: 227 },
  { start: "74", finish: "35", distance: 93 },

  { start: "75", finish: "3", distance: 200 },//Iğdır
  { start: "75", finish: "35", distance: 140 },

  { start: "76", finish: "15", distance: 69 },//Yalova
  { start: "76", finish: "40", distance: 65 },
  { start: "76", finish: "10", distance: 10 },

  { start: "77", finish: "66", distance: 102 },//Karabük
  { start: "77", finish: "73", distance: 89 },
  { start: "77", finish: "17", distance: 160 },
  { start: "77", finish: "36", distance: 114 },
  { start: "77", finish: "80", distance: 179 },

  { start: "78", finish: "26", distance: 56 },//Kilis
  { start: "78", finish: "79", distance: 161 },

  { start: "79", finish: "30", distance: 129 },//Osmaniye
  { start: "79", finish: "78", distance: 161 },
  { start: "79", finish: "0", distance: 98 },
  { start: "79", finish: "50", distance: 292 },
  { start: "79", finish: "45", distance: 105 },

  { start: "80", finish: "53", distance: 69 },//Düzce
  { start: "80", finish: "13", distance: 50 },
  { start: "80", finish: "77", distance: 179 },
  { start: "80", finish: "66", distance: 114 },

];

//  { start: "", finish: "", distance:},


function indexsiragetir(test) {
  var result = Array.from(Array(test.length).keys()).sort((a, b) => test[a] < test[b] ? -1 : (test[b] < test[a]) | 0);
  return result;
}

function enkisa(arr) {
  var len = arr.length
  var min = Infinity;
  var index;
  while (len--) {
    if (arr[len] < min) {
      min = arr[len];
      index = len;
    }
  }
  var obj = {
    min: min,
    index: index,
    il: isimler[index]
  };
  return obj;

}

yol = mesafeGrafi(komsuMesafeGraf);
function mesafeGrafi(komsuMesafeGraf) {
  var graph = {};
  for (var i in komsuMesafeGraf) {
    var path = komsuMesafeGraf[i];
    var start = path["start"];
    var finish = path["finish"];
    var distance = path["distance"];
    if (typeof graph[start] == "undefined") {
      graph[start] = {};
    }
    graph[start][finish] = distance;

    if (typeof graph[finish] == "undefined") {
      graph[finish] = {};
    }
    graph[finish][start] = distance;

  }
  return graph;
}

yoltoplami = 0;
gidilen = [];
gercekdeger = 0;

function astar(start, finish) {
  secim = [];
  for (var i in gidilen) {
    if (gidilen.length > 1) {
      if (typeof gidilen[parseInt(i) + 1] != 'undefined')
        yoltoplami += yol[gidilen[i]][gidilen[parseInt(i) + 1]];
    }
  }
  for (var i in yol[start]) {
    gercekdeger = yol[start][i];
    secim[i] = kusMesafe[i] + gercekdeger + yoltoplami;
  }
  for (var j in gidilen) {
    delete secim[gidilen[j]];
  }
  obje = enkisa(secim);
  yeniRota = obje.index;
  gidilen.push(start);
  if (yeniRota != finish) {
    astar(yeniRota, finish);
  }
  if (yeniRota == finish) {
    gidilen.push(yeniRota);
    return;
  }
}

function showPath(start, path) {
  lineCoords = [];
  lineCoords.push(dugumler[start].coord);
  for (var i = 0; i < path.length; i++) {
    var nodeName = path[i];
    lineCoords.push(dugumler[nodeName].coord);
  }

  var polyline = L.polyline(lineCoords, { color: '#FF0000' }).addTo(map);
}

bas = 0;
son = 0;
function ciz(bas, son) {
  //astar 
  kusMesafe = hn(son);
  astar(bas, son);
  showPath(bas, gidilen);
  StartFinishAc(bas, son);
}