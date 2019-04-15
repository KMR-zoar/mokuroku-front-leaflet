import 'leaflet/dist/leaflet.css'
import './main.css'

import L from 'leaflet'
import axios from 'axios'

const colorStep = require('./colorStep')
const mokurokuURL = require('./config.json').mokurokuURL

const centerX = 36.03
const centerY = 139.3440306
const zoomLv = 10

const map = L.map('map')

const markerLayer = L.layerGroup().addTo(map)

const gsiMap = new L.tileLayer(
  'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
  {
    attribution:
      '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">地理院地図 標準タイル</a> | <a href="https://github.com/gsi-cyberjapan/mokuroku-spec">地理院タイル目録</a>をタイル型ポリゴンに加工',
    maxZoom: 18
  }
).addTo(map)

console.log(Math.floor(new Date().getTime() / 1000))

const getColor = unixtime => {
  const now = new Date()
  const nowUnixtime = (Math.floor(now.getTime() / 1000000000) + 1) * 1000000
  const baseTime = 1450176736
  const colorPalette = [
    '#CCFFFF',
    '#99FFFF',
    '#66FFFF',
    '#33FFFF',
    '#00FFFF',
    '#00FFCC',
    '#00FF99',
    '#00FF66',
    '#00FF33',
    '#00FF00'
  ]
  return colorStep(unixtime, nowUnixtime, baseTime, colorPalette)
}

const style = feature => {
  return {
    fillColor: getColor(feature.properties.unixtime),
    weight: 3,
    color: getColor(feature.properties.unixtime)
  }
}

const onEachFeature = feature => {
  const lat = feature.geometry.coordinates[0][0][1]
  const lng = feature.geometry.coordinates[0][0][0]
  const zoom = feature.properties.tilePath.split('/')[0]
  const icon = L.divIcon({
    html:
      '<div class="infoicon zoomlevel' +
      zoom +
      '">' +
      feature.properties.date +
      '<br>' +
      feature.properties.time +
      '<br>' +
      feature.properties.unixtime +
      '</div>'
  })
  const infoIcon = L.marker(new L.LatLng(lat, lng), { icon: icon })
  infoIcon.addTo(markerLayer)
}

const mokurokuLayer = L.geoJSON('', {
  style: style,
  onEachFeature: onEachFeature
}).addTo(map)

gsiMap.on('tileload', event => {
  const tilePath = event.coords
  const z = tilePath.z
  const x = tilePath.x
  const y = tilePath.y

  const jsonUri = mokurokuURL + z + '/' + x + '/' + y + '.json'

  axios.get(jsonUri).then(res => {
    mokurokuLayer.addData(res.data)
  })
})

map.on('zoomstart', () => {
  mokurokuLayer.clearLayers()
  markerLayer.clearLayers()
})

map.setView([centerX, centerY], zoomLv)
