<template>
  <div v-if="reseted" ref="videoParent" style="position: relative;">
    <video
      :id="videoPlayer"
      :ref="videoPlayer"
      class="video-js vjs-big-play-centered"
      :class="classObject"
      style="width:calc(100% - 0px);"
    />
    <div v-if="videoLength>0" class="progress">
      <el-slider
        v-model="currentTime"
        class="commonSlider"
        :show-tooltip="true"
        :format-tooltip="formatshow"
        :max="videoLength"
        @change="changeVideoTime"
      />
      <div class="time">
        <span>{{ start }}</span>
        <span style="float:right;margin-right:20px">{{ end }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js'
import 'video.js/dist/video-js.min.css'
import 'videojs-flash'
require('video.js/dist/alt/video.core.min.js')
import { convertUTCLocalTime } from '@/utils/validate'

export default {
  name: 'VideoPlayer',
  props: {
    src: {
      type: Object,
      default() {
        return {
          rtmp: '',
          hls: '',
          flv: ''
        }
      }
    },
    videoPlayer: {
      type: String,
      default() {
        return 'videoPlayer'
      }
    },
    play: {
      type: Boolean,
      default() {
        return false
      }
    },
    controls: {
      type: Boolean,
      default() {
        return true
      }
    },
    autoplay: {
      type: Boolean,
      default() {
        return false
      }
    },
    videoLength: {
      type: Number,
      default() {
        return 0
      }
    },
    start: {
      type: String,
      default() {
        return ''
      }
    },
    end: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      reseted: true,
      options: {
        fluid: false,
        liveui: true,
        sources: [],
        techOrder: ['html5'],
        autoplay: false,
        controls: this.controls,
        // poster:require("@/assets/videobackground.jpg"),
        controlBar: {
          progressControl: false
        },
        height: '',
        muted: true,
        preload: 'auto',
        flash: { hls: { withCredentials: false }},
        html5: { hls: { withCredentials: false }}
      },
      player: null,
      videoPlay: false,
      timer: null,
      starttime: '',
      currentTime: -1,
      playbutton: null
    }
  },
  computed: {
    classObject: function() {
      return {
        'vjs-has-started': this.play
      }
    }
  },
  watch: {
    videoPlay(val) {
      if (val) {
        this.timer = setInterval(() => {
          this.currentTime++
        }, 1000)
      } else {
        if (this.timer) {
          clearInterval(this.timer)
        }
        this.timer = null
      }
    },
    src: {
      handler(val, o) {
        if (this.player) {
          this.dispose(() => {
            this.new(val)
          })
        } else {
          this.new(val)
        }
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    if (!this.player) {
      this.new(this.src)
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.dispose()
      this.player = null
    }
  },
  methods: {
    formatshow(val) {
      const n = new Date(this.start).getTime() + val * 1000
      return convertUTCLocalTime(n) || ''
    },
    changeVideo() {
      this.videoPlay = false
      this.currentTime = 0
    },
    new(src) {
      this.options.sources = [
        {
          withCredentials: false,
          type: 'application/x-mpegURL',
          src: this.src.hls
        },
        {
          type: 'rtmp/mp4',
          src: this.src.rtmp
        },
        {
          type: 'rtmp/flv',
          src: this.src.flv
        }
      ]
      this.options.autoplay = this.autoplay
      var video = document.getElementById(this.videoPlayer)
      var width = video.offsetWidth
      this.options.height = Math.floor((width * 9) / 16) + 'px'
      const that = this
      this.player = videojs(
        this.$refs[this.videoPlayer],
        this.options,
        function onPlayerReady() {
          this.muted(true)
          console.log('onPlayerReady', this)
          this.on('loadeddata', function() {
            console.log('loadeddata---渲染播放画面----') // autoPlay必须为false
            if (that.playbutton === null) {
              that.playbutton = document.getElementsByClassName('vjs-play-control vjs-control vjs-button vjs-playing')
            }
            that.playbutton[0].addEventListener('click', (e) => {
              if (!that.videoPlay) {
                that.$emit('setCurrentTime', that.currentTime)
              }
            }, false)
          })
          this.on('canplay', function() {
            console.log('canplay---能够播放----')
          })
          this.on('play', function() {
            console.log('play---播放----')
            that.videoPlay = false
          })
          this.on('canplaythrough', function() {
            console.log('canplaythrough---正常播放且无需停顿时执行----')
          })
          this.on('pause', function() {
            console.log('pause---暂停----')
            that.videoPlay = false
          })
          this.on('waiting', function() {
            console.log('waiting---等待----')
            that.videoPlay = false
          })
          this.on('playing', function() {
            console.log('playing---播放中----')
            that.videoPlay = true
          })
          this.on('ended', function() {
            console.log('ended------------')
            that.videoPlay = false
          })
          this.on('loadstart', function() {
            console.log('loadstart------------')
          })
          this.on('loadedmetadata', function() {
            console.log('loadedmetadata---视频源数据加载完成----')
          })
          this.on('progress', function() {
            console.log('progress-------加载过程----')
            that.videoPlay = false
          })
          this.on('timeupdate', function() {})
          this.on('dispose', function() {
            console.log('dispose-------释放播放器----')
          })
          this.on('error', function() {
            console.log('error-------错误----')
          })
        }
      )
    },
		resizeHeight(){
			var video = document.getElementById(this.videoPlayer)
      var width = video.offsetWidth
      video.style.height = Math.floor((width * 9) / 16) + 'px'
			this.$forceUpdate()
		},
    dispose(callback) {
      if (this.player) {
        console.log('player dispose')
        this.player.dispose()
        this.player = null
        this.$nextTick(() => {
          this.reseted = false
          this.$nextTick(() => {
            this.reseted = true
            this.$nextTick(() => {
              callback && callback()
            })
          })
        })
      }
    },
    changeVideoTime(val) {
      this.$emit('setCurrentTime', val)
    }
  }
}
</script>
<style  scoped>
.progress{
	position: relative;
	left:20px;
	width:calc(100% - 20px)
}
.time span{

		font-size:14px;

}
</style>
