<template>
  <div id="container" class="map" :style="{height:height}" tabindex="0" />
</template>

<script>
import boundary from '@/assets/boundary.json'
import InfoWindowComponent from './infoWindow'
import Vue from 'vue'
import router from '@/router'
// import loc from '@/assets/marknew.png'

export default {
  name: 'Map',
  components: {
    // InfoWindowComponent
  },
  props: {
    center: {
      type: Object,
      default: function() {
        return {} // [102.827963, 24.890363]
      }
    },
    zoom: {
      type: Number,
      default: function() {
        return 11
      }
    },
    line: {
      type: Array,
      default: function() {
        this.clearSetMarker()
        return []
      }
    },
    markers: {
      type: Array,
      default: function() {
        this.clearSetMarker()
        return []
      }
    },
    boundarys: {
      type: Array,
      default: function() {
        return []
      }
    },
    polygons: {
      type: Array,
      default: function() {
        return []
      }
    },
    height: {
      type: String,
      default: function() {
        return 'calc(80vh - 64px)'
      }
    },
    showWindow: {
      type: Boolean,
      default: function() {
        return true
      }
    }
  },
  data() {
    return {
      map: {},
      polylineList: [],
      makerList: [],
      polygonList: [],
      polyline: null,
      polygonPointArr: [],
      polylinePointArr: [],
      polylinePointArrNew: [],
      polygonPointArrNew: [],
      editpolygon: false,
      editpolyline: false,
      editpolyMark: false,
      marker: null,
      delMarkerList: []
    }
  },
  computed: {
    lineData() {
      return this.line
    },
    markersData() {
      return this.markers
    },
    boundarysData() {
      return this.boundarys
    },
    polygonsData() {
      return this.polygons
    },
    centerData() {
      return this.center
    }
  },
  watch: {
    lineData: {
      handler(newV, oldV) {
        setTimeout(function() {
          this.madePolylines(newV)
        }.bind(this), 50)
      },
      deep: true
    },
    markersData: {
      handler(newV, oldV) {
        setTimeout(function() {
          this.madeMarker(newV)
        }.bind(this), 50)
      },
      deep: true
    },
    boundarysData: {
      handler(newV, oldV) {
        setTimeout(function() {
          this.madeBoundary(newV)
        }.bind(this), 50)
      },
      deep: true
    },
    polygonsData: {
      handler(newV, oldV) {
        setTimeout(function() {
          this.madePloyRegion(newV)
        }.bind(this), 100)
      },
      deep: true
    },
    centerData: {
      handler(newV, oldV) {
        setTimeout(function() {
          this.setCenter(newV)
        }.bind(this), 100)
      },
      deep: true
    }
  },
  created() {
  },

  mounted() {
    this.init()
    this.madePolylines(this.lineData)
    // this.madeBoundary([{ name: '昆明市', color: '#e4ff02' }])
    // this.madePloygon(this.polygonsData)
    this.madeMarker(this.markersData)
    this.madePloyRegion(this.polygonsData)
    this.setCenter(this.centerData)
  },
  beforeDestroy() {
  },
  methods: {
    init() {
      this.map = new window.BMap.Map('container', { minZoom: 4, maxZoom: 17 }) // 创建Map实例
      this.map.centerAndZoom(new window.BMap.Point(102.827963, 24.890363), 11) // 初始化地图,设置中心点坐标和地图级别
      // // 添加地图类型控件
      // this.map.addControl(new window.BMap.MapTypeControl({
      //   mapTypes: [
      //     window.BMAP_NORMAL_MAP,
      //     window.BMAP_HYBRID_MAP
      //   ] }))
      this.map.setCurrentCity('昆明市') // 设置地图显示的城市 此项是必须设置的
      this.map.enableScrollWheelZoom()
      this.map.addEventListener('zoomend', this.getZoomed)
    },
    setCenter(e) {
      this.map.removeOverlay(this.label)
      if (e.position !== undefined) {
        if (e.name !== '') {
          this.map.centerAndZoom(new window.BMap.Point(e.position[0], e.position[1]), 15)
          var opts = {
            position: new window.BMap.Point(e.position[0], e.position[1]), offset: new window.BMap.Size(-20, 0)
          }
          this.label = new window.BMap.Label(e.name, opts)
          this.label.setStyle({
            color: 'red',
            fontSize: '12px',
            height: '20px',
            lineHeight: '20px',
            fontFamily: '微软雅黑',
            cursor: 'pointer'
          })
          this.map.addOverlay(this.label)
          this.label.addEventListener('click', function(e) {
            router.push({
              path: '/monitoring-center/datatree',
              name: 'DataTreeDevice',
              params: { mapLabelTree: e.target.content }
            })
          })
        } else {
          this.map.centerAndZoom(new window.BMap.Point(e.position[0], e.position[1]), 11)
        }
      }
      // else {
      //   if (e.name !== undefined) {
      //     this.map.centerAndZoom(e.name, 11) // 暂不支持
      //     this.map.setCurrentCity(e.name)
      //   }
      // }
    },
    madePolylines(data) {
      if (data.length === 0) {
        this.polylineList = []
        return
      }
      for (const item of this.polylineList) {
        this.map.removeOverlay(item)
      }
      for (const item of data) {
        this.polylinePointArr = item.position
        const a = this.CreatePolyline(item.position)
        if (a !== undefined) {
          this.polylineList.push(a)
        }
      }
    },
    CreatePolyline(data) {
      if (data.length === 0) {
        this.polylineList = []
        return
      }
      const Line = this.createLine(data)
      this.polyline = new window.BMap.Polyline(Line, { strokeColor: '#11b95c', strokeWeight: 14, strokeOpacity: 0.7 }) // 创建折线
      this.map.addOverlay(this.polyline)
      return this.polyline
    },
    ImportLine(data) {
      this.CreatePolyline(data)
      this.map.centerAndZoom(new window.BMap.Point(data[0].longitude, data[0].latitude), 16)
    },

    createLine(data) {
      try {
        const List = []
        for (const item of data) {
          List.push(new window.BMap.Point(item.longitude, item.latitude))
        }
        return List
      } catch (e) {
        return []
      }
    },
    madePloyRegion(data) {
      if (data.length === 0) {
        this.polygonList = []
        return
      }
      for (const item of this.polygonList) {
        this.map.removeOverlay(item)
      }
      for (const item of data) {
        this.polygonPointArr = item.position
        const a = this.CreatePolygonline(item.position)
        if (a !== undefined) {
          a.data = item
          this.aregion = a
          this.tunnelRightMenu(a)
          this.polygonList.push(a)
        }
      }
    },
    CreatePolygonline(data) {
      if (data.length === 0) {
        this.polygonList = []
        return
      }
      const Line = this.createLine(data)
      this.mpolygon = new window.BMap.Polyline(Line, { strokeColor: '#0d7ade', strokeWeight: 20, strokeOpacity: 0.7 }) // 创建折线
      this.map.addOverlay(this.mpolygon)
      this.mpolygon.addEventListener('click', function(e) {
        var point = new window.BMap.Point(e.point.lng, e.point.lat)
        var infoWindow = new window.BMap.InfoWindow(e.target.data.name)
        this.map.openInfoWindow(infoWindow, point)
      })
      return this.mpolygon
    },
    // 隧道添加右键菜单
    tunnelRightMenu(line) {
      var markerMenu = new window.BMap.ContextMenu()
      markerMenu.addItem(new window.BMap.MenuItem('实时撤防', this.goto))
      line.addContextMenu(markerMenu)
    },
    goto(e, ee, marker) {
      this.$emit('withdrawal', marker.data)
    },
    madeMarker(data) {
      for (const marker of this.makerList) {
        this.map.removeOverlay(marker)
      }
      for (const item of data) {
        if (item.icon !== undefined) {
          this.marker = this.CreatePoint(item.position.longitude, item.position.latitude, item.icon)
        } else {
          this.marker = this.CreatePoint(item.position.longitude, item.position.latitude, '')
        }
        if (this.showWindow) {
          this.addClickHandler(this.marker, item)
        }
        this.makerList.push(this.marker)
      }
    },
    CreatePoint(lon, lat, icon) {
      var point = new window.BMap.Point(lon, lat)
      // var image = require('@/assets/gisIcon/Connector-normal.png')
      var marker2
      if (icon !== '') {
        var myIcon = new window.BMap.Icon(icon, new window.BMap.Size(25, 25), { imageSize: new window.BMap.Size(25, 25) }) //, new window.BMap.Size(300, 157)
        marker2 = new window.BMap.Marker(point, { icon: myIcon })
      } else {
        // var otherICon = new window.BMap.Icon(loc, new window.BMap.Size(25, 25))
        // marker2 = new window.BMap.Marker(point, { icon: otherICon })
        marker2 = new window.BMap.Marker(point)
      }
      this.map.addOverlay(marker2)
      return marker2
    },
    addClickHandler(marker, content) {
      marker.addEventListener('click', function(e) {
        this.openInfo(e, content)
      }.bind(this)
      )
    },
    openInfo(e, info) {
      var p = e.target
      var point = new window.BMap.Point(p.getPosition().lng, p.getPosition().lat)
      var infoWindow
      const content = `<div id="infowindowcontents"> </div>`
      var opts = { height: 330, width: 250 }
      infoWindow = new window.BMap.InfoWindow(content, opts) // 创建信息窗口对象
      this.map.openInfoWindow(infoWindow, point)
      setTimeout(() => {
        const aa = new Vue(InfoWindowComponent)
        aa.data = info
        aa.$mount('#infowindowcontents')
      }, 100)
    },
    madeBoundary(List) {
      for (const item of boundary) {
        for (const c of List) {
          if (c.name === item.name) {
            this.CreateBoundary(item.boundaries, c.color)
          }
        }
      }
    },
    CreateBoundary(data, color) {
      var pointArray = []
      for (const p of data) {
        var ply = new window.BMap.Polygon(p, { strokeWeight: 2, strokeColor: '#ff0000', fillOpacity: 0.3, fillColor: color }) // 建立多边形覆盖物
        this.map.addOverlay(ply) // 添加覆盖物
        pointArray = pointArray.concat(ply.getPath())
      }
      // this.map.setViewport(pointArray) // 调整视野
    },
    madePloygon(List) {
      if (List.length === 0) {
        return
      }
      for (const item of this.polygonList) {
        this.map.removeOverlay(item)
      }
      this.polygonList = []
      for (const item of List) {
        this.polygonPointArr = item.position
        const a = this.createLine(item.position)
        this.mpolygon = this.createPloygon(a, item.color)
        this.polygonList.push(this.mpolygon)
      }
    },
    createPloygon(data, color) {
      const mpolygon = new window.BMap.Polygon(data, { strokeColor: 'blue', strokeWeight: 2, strokeOpacity: 0.1, fillColor: color }) // 创建折线
      this.map.addOverlay(mpolygon)
      this.map.centerAndZoom(new window.BMap.Point(data[0].lng, data[0].lat), 14)
      return mpolygon
    },
    enableClick(type) {
      if (type === '隧道') {
        if (this.editpolygon === false) {
          this.map.addEventListener('click', this.translatePloygon)
          this.createDelMarker(this.polygonPointArr, '')
        }
        this.editpolygon = true
      } else if (type === '线路') {
        if (this.editpolyline === false) {
          this.map.addEventListener('click', this.translateline)
          this.createDelMarker(this.polylinePointArr, 'line')
        }
        this.editpolyline = true
      } else {
        if (this.editpolyMark === false) {
          this.map.addEventListener('click', this.translateMark)
        }
        this.editpolyMark = true
      }
    },

    closeClick() {
      this.map.removeEventListener('click', function() {
      })
    },
    translatePloygon(e) {
      if (this.editpolygon) {
        const obj = {
          longitude: e.point.lng,
          latitude: e.point.lat
        }
        this.polygonPointArr.push(obj)
        // 创建右键菜单
        this.createDelMarker(this.polygonPointArr, '')
      }
    },
    translateline(e) {
      if (this.editpolyline) {
        const obj = {
          longitude: e.point.lng,
          latitude: e.point.lat
        }
        this.polylinePointArr.push(obj)
        // 创建右键菜单
        this.createDelMarker(this.polylinePointArr, 'line')
      }
    },
    createDelMarker(List, type) {
      if (this.delMarkerList.length > 0) {
        for (const item of this.delMarkerList) {
          this.map.removeOverlay(item)
        }
      }
      this.delMarkerList = []
      for (const obj of List) {
        var markerMenu = new window.BMap.ContextMenu()
        var marker = new window.BMap.Marker(new window.BMap.Point(obj.longitude, obj.latitude))
        if (type === 'line') {
          markerMenu.addItem(new window.BMap.MenuItem('删除', this.removeLineMarker.bind(marker)))
        } else {
          markerMenu.addItem(new window.BMap.MenuItem('删除', this.removepolygonMarker.bind(marker)))
        }
        this.map.addOverlay(marker)
        marker.addContextMenu(markerMenu)
        this.delMarkerList.push(marker)
      }
    },
    removeLineMarker(e, ee, marker) {
      this.map.removeOverlay(marker)
      const x = this.polylinePointArr[0].longitude - e.lng
      const y = this.polylinePointArr[0].latitude - e.lat
      let min = x * x + y * y
      let minMarker = 0
      for (const i in this.polylinePointArr) {
        const x = this.polylinePointArr[i].longitude - e.lng
        const y = this.polylinePointArr[i].latitude - e.lat
        if (x * x + y * y < min) {
          min = x * x + y * y
          minMarker = i
        }
      }
      this.polylinePointArr.splice(minMarker, 1)
    },
    removepolygonMarker(e, ee, marker) {
      this.map.removeOverlay(marker)
      const x = this.polygonPointArr[0].longitude - e.lng
      const y = this.polygonPointArr[0].latitude - e.lat
      let min = x * x + y * y
      let minMarker = 0
      for (const i in this.polygonPointArr) {
        const x = this.polygonPointArr[i].longitude - e.lng
        const y = this.polygonPointArr[i].latitude - e.lat
        if (x * x + y * y < min) {
          min = x * x + y * y
          minMarker = i
        }
      }
      this.polygonPointArr.splice(minMarker, 1)
    },
    translateMark(e) {
      const obj = {
        longitude: e.point.lng,
        latitude: e.point.lat
      }
      // this.markersData.push({ position: obj })
      this.madeMarker([{ position: obj }])
    },
    edit(type) {
      if (this.delMarkerList.length > 0) {
        for (const item of this.delMarkerList) {
          this.map.removeOverlay(item)
        }
        this.delMarkerList = []
      }
      if (type === '隧道') {
        this.editPloygon()
      } else if (type === '线路') {
        this.editPolyline()
      } else {
        this.editＭark()
      }
    },
    editPloygon() {
      this.editpolygon = false
      this.mpolygon.enableEditing()
      var this_ = this
      this.mpolygon.addEventListener('lineupdate', function(e) {
        var newtargetarr = e.currentTarget.getPath()
        this_.polygonPointArrNew = []
        for (var i = 0; i < newtargetarr.length; i++) {
          var obj = {
            longitude: newtargetarr[i].lng,
            latitude: newtargetarr[i].lat
          }
          this_.polygonPointArrNew.push(obj)
        }
      })
    },
    editPolyline() {
      this.editpolyline = false
      this.polyline.enableEditing()
      var this_ = this
      this.polyline.addEventListener('lineupdate', function(e) {
        var newtargetarr = e.currentTarget.getPath()
        this_.polylinePointArrNew = []
        for (var i = 0; i < newtargetarr.length; i++) {
          var obj = {
            longitude: newtargetarr[i].lng,
            latitude: newtargetarr[i].lat
          }
          this_.polylinePointArrNew.push(obj)
        }
      })
    },
    editＭark() {
      this.editpolyMark = false
      this.map.removeOverlay(this.marker)
    },
    clear(type) {
      if (this.delMarkerList.length > 0) {
        for (const item of this.delMarkerList) {
          this.map.removeOverlay(item)
        }
        this.delMarkerList = []
      }
      switch (type) {
        case '隧道':
          this.clearPloygon()
          break
        case '线路':
          this.clearPloyline()
          break
        case '接头':
          this.clearＭark()
          break
        default:
      }
    },
    clearPloygon() {
      this.map.removeOverlay(this.label)
      this.polygonPointArr.splice(0, this.polygonPointArr.length)
      this.map.removeOverlay(this.mpolygon)
    },
    clearPloyline() {
      this.map.removeOverlay(this.label)
      this.polylinePointArr.splice(0, this.polylinePointArr.length)
      this.map.removeOverlay(this.polyline)
    },
    clearＭark() {
      this.map.removeOverlay(this.label)
      this.markersData.splice(0, this.markersData.length)
      this.map.removeOverlay(this.marker)
    },
    save(type) {
      if (type === '隧道') {
        this.savePloygon()
        this.clearSetMarker()
      } else if (type === '线路') {
        this.savePloyline()
        this.clearSetMarker()
      } else {
        this.saveMarker()
      }
    },
    clearSetMarker() {
      if (this.delMarkerList.length > 0) {
        for (const item of this.delMarkerList) {
          this.map.removeOverlay(item)
        }
        this.delMarkerList = []
      }
    },
    savePloygon() {
      if (this.editpolygon) {
        this.$emit('savepolyline', this.polygonPointArr)
        this.editpolygon = false
      } else {
        this.mpolygon.disableEditing()
        if (this.polygonPointArrNew.length === 0) {
          this.polygonPointArrNew = this.polygonPointArr
        }
        this.$emit('savepolyline', this.polygonPointArrNew)
      }
    },
    savePloyline() {
      if (this.editpolyline) {
        this.editpolyline = false
        this.$emit('savepolyline', this.polylinePointArr)
      } else {
        this.polyline.disableEditing()
        if (this.polylinePointArrNew.length === 0) {
          this.polylinePointArrNew = this.polylinePointArr
        }
        this.$emit('savepolyline', this.polylinePointArrNew)
      }
    },
    saveMarker() {
      this.$emit('savepolyline', this.marker)
    },
    RoutePlan() {
      var p1 = new window.BMap.Point(102.840305, 24.887714)
      var p2 = new window.BMap.Point(102.840593, 24.884305)
      var driving = new window.BMap.DrivingRoute(this.map, { renderOptions: { map: this.map, autoViewport: true }})
      driving.search(p1, p2)
    },
    getCenter() {
      const e = this.map.getCenter()
      this.$emit('getCenter', e)
    },
    getZoomed() {
      try {
        window.map = this.map
        const e = this.map.getZoom()
        this.$emit('getZoom', e)
        this.getCenter()
      } catch (err) {
        console.log(err)
      }
    },
    setCenterAndZoom(e, zoom) {
      this.map.centerAndZoom(new window.BMap.Point(e[0], e[1]), zoom)
    },
    delete() {

    }
  }
}

</script>
