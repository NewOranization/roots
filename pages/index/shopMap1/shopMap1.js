var app = getApp();
Page({
  data: {
    markers: [{
      iconPath: "/imgs/location.png",
      id: 0,
      latitude: 120.169329,
      longitude: 30.242312,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        latitude: 120.169329,
        longitude: 30.242312,
      }, {
          latitude: 120.169329,
          longitude: 30.242312,
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})