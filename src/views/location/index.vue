<template>
  <page-layout>
    <page-header>
      <h3>高德地图</h3>
    </page-header>
    <page-content>
      <div class="mobile-wrap">
        <div class="mobile-main">
          <div class="mobile-header">
            <div class="back-wrap">返回</div>
            <div class="search-container">
              <span class="icon-box">
                <SearchOutlined />
              </span>
              <input
                type="text"
                class="search-input"
                id="pickerInput"
                placeholder="写字楼/小区/学校等"
                @focus="isFocus = true"
                @blur="isFocus = false"
              />
            </div>
          </div>
          <div class="mobile-body" v-show="!isFocus">
            <div class="map-container" id="map-container"></div>
            <div class="poi-card-main">
              <div class="poi-card-header">
                <div
                  class="J_tab"
                  :class="{ active: tabActive === item }"
                  v-for="item in tabList"
                  :key="item"
                  @click="tabActive = item"
                  >{{ item }}</div
                >
              </div>
              <div class="poi-card-body">
                <div
                  class="poi-item"
                  v-for="item in poisList"
                  :key="item.name"
                  :style="{
                    background: `url(${poiIcon}) no-repeat 8px 15px`,
                    backgroundSize: `14px 20px`,
                  }"
                >
                  <div class="text">
                    <p class="name">{{ item.name }}</p>
                    <p class="addr">{{ item.address }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </page-content>
  </page-layout>
</template>

<script setup lang="ts">
  import AMapLoader from '@amap/amap-jsapi-loader'
  import { SearchOutlined } from '@ant-design/icons-vue'
  import poiIcon from '@/assets/images/poi_icon.png'

  interface Poi {
    id: string
    name: string
    type: string
    address: string
    distance: number
    tel: string
    location: {
      KL: number
      className: string
      kT: number
      lat: number
      lng: number
      pos: [number, number]
    }
    direction: string
    businessArea: string
  }

  const emit = defineEmits<{
    (
      e: 'selected',
      arg: { name: string; address: string; location: string },
    ): void
    (e: 'back'): void
  }>()

  const tabList = ['全部', '写字楼', '小区', '学校']
  const isFocus = ref(false)
  const pois = ref<Poi[]>([])
  const tabActive = ref('全部')

  const poisList = computed(() => {
    if (tabActive.value === '全部') {
      return pois.value
    }

    return pois.value.filter((item) => item.type.indexOf(tabActive.value) > -1)
  })

  const map = shallowRef<any>(null)
  const initMap = () => {
    AMapLoader.load({
      key: '16c13d21cf3cf59bcf57cff37f3670d9', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [''], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: {
        version: '1.1',
        plugins: ['overlay/SimpleMarker'],
      },
    })
      .then((AMap) => {
        //  var positionPicker = new PositionPicker({
        //     mode: 'dragMap',
        //     map: map
        // });
        // AMapUI.
        // console.log('AMapUI', window.AMapUI)
        window.AMapUI.loadUI(
          ['misc/PositionPicker', 'misc/PoiPicker'],
          function (PositionPicker: any, PoiPicker: any) {
            const mapConfig = {
              zoom: 15, //初始化地图级别
              cityName: '全国',
              viewMode: '2D', //是否为3D地图模式
              // center: [105.602725, 37.076636], //初始化地图中心点位置
            }
            map.value = new AMap.Map('map-container', mapConfig)
            var positionPicker = new PositionPicker({
              mode: 'dragMap',
              map: map.value,
            })
            positionPicker.on('success', function (positionResult: any) {
              // console.log(positionResult) //这里面试全部的信息数据想要什么数据就点某个值
              // vm.result = positionResult.regeocode.pois // pios所有信息（暂时用不到）
              // vm.address = positionResult.address //地址
              // vm.lnglatList = [
              //   positionResult.position.lng,
              //   positionResult.position.lat,
              // ] //经纬度
              pois.value = positionResult.regeocode.pois
              tabActive.value = '全部'
            })
            positionPicker.on('fail', function (positionResult: any) {
              console.log('error', positionResult) //这里面试全部的信息数据想要什么数据就点某个值
              // vm.result = positionResult.regeocode.pois // pios所有信息（暂时用不到）
              // vm.address = positionResult.address //地址
              // vm.lnglatList = [
              //   positionResult.position.lng,
              //   positionResult.position.lat,
              // ] //经纬度
            })
            positionPicker.start()

            var poiPicker = new PoiPicker({
              //city:'北京',
              input: 'pickerInput',
            })

            //初始化poiPicker
            poiPickerReady(poiPicker, AMap)
          },
        )
      })
      .catch((e) => {
        console.log(e)
      })
  }

  function poiPickerReady(poiPicker: any, AMap: any) {
    window.poiPicker = poiPicker

    var marker = new AMap.Marker()

    var infoWindow = new AMap.InfoWindow({
      offset: new AMap.Pixel(0, -20),
    })

    //选取了某个POI
    poiPicker.on('poiPicked', function (poiResult: any) {
      var source = poiResult.source,
        poi = poiResult.item,
        info = {
          source: source,
          id: poi.id,
          name: poi.name,
          location: poi.location.toString(),
          address: poi.address,
        }

      // console.log('poi.location', poi.location, poi.location.toString())

      onPoisClick(poi)

      marker.setMap(map.value)
      infoWindow.setMap(map.value)

      marker.setPosition(poi.location)
      infoWindow.setPosition(poi.location)

      infoWindow.setContent(
        'POI信息: <pre>' + JSON.stringify(info, null, 2) + '</pre>',
      )
      infoWindow.open(map.value, marker.getPosition())

      map.value.setCenter(marker.getPosition())
    })

    poiPicker.onCityReady(function () {
      poiPicker.suggest('美食')
    })
  }

  const onPoisClick = (poi: Poi) => {
    emit('selected', {
      name: poi.name,
      address: poi.address,
      location: poi.location.toString(),
    })
  }

  onMounted(() => {
    initMap()
  })
</script>

<style lang="less" scoped>
  .mobile-wrap {
    height: 667px;
    width: 375px;
    border: 5px saddlebrown solid;
    margin: 50px auto;
    .mobile-main {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .mobile-header {
      height: 48px;
      display: flex;
      align-items: center;
      position: relative;
      padding: 6px;
    }
    .search-container {
      height: 34px;
      flex: 1;
      position: relative;
      .icon-box {
        display: block;
        width: 36px;
        line-height: 34px;
        text-align: center;
        position: absolute;
        left: 0;
        top: 0;
      }
      .input-box {
        flex: 1;
      }
      .search-input {
        padding-left: 36px;
        display: block;
        height: 34px;
        width: 100%;
        border: 1px solid #bbb;
      }
      input[type='text']:focus {
        border: 1px solid #afecab !important;
      }
    }
    .search-bg {
      z-index: 1;
      background-color: #fff;
    }
    .search-bg,
    .mobile-body {
      position: absolute;
      top: 48px;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .mobile-body {
      .map-container {
        width: 100%;
        height: 40%;
      }
      .poi-card-main {
        width: 100%;
        height: 60%;
        position: relative;
        box-sizing: border-box;
      }
    }
    .poi-card-header {
      position: absolute;
      right: 0;
      left: 0;
      height: 44px;
      line-height: 44px;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      border-bottom: 1px solid #ebebeb;
      border-top: 1px solid #ebebeb;
      background-color: #fff;
      .J_tab {
        position: relative;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        text-align: center;
        display: block;
        &.active {
          border-bottom: 3px solid #0091ff;
          color: #0091ff;
        }
      }
    }
    .poi-card-body {
      position: absolute;
      top: 44px;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-y: auto;
    }
    .poi-item {
      padding-left: 29px;
      // background: url(../images/poi_icon.png) no-repeat 8px 15px;
      // background-size: 14px 20px;
      .text {
        padding: 11px 0;
        border-bottom: 1px solid #ddd;
        p {
          margin: 0;
        }
      }
      .name {
        color: #333;
        font-size: 14px;
      }
      .addr {
        color: #666;
        font-size: 12px;
      }
    }
  }
</style>
