<template>
  <div :id="container_id" class="px-1 md:h-full h-80"></div>
</template>

<script>
const SCRIPT_ID = 'tradingview-widget-script'
const CONTAINER_ID = 'vue-trading-view'

export default {
  name: 'VueTradingView',
  data() {
    return {
      container_id: CONTAINER_ID,
      widget: null,
      symbol: 'BTCUSDT',
    }
  },

  props: ['market'],
  watch: {
    market: function (newVal, oldVal) {
      // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      let arr = newVal.split('-')
      this.symbol = arr[0] + arr[1]
      console.log(this.symbol)
      this.appendScript(this.initWidget)
    },
  },

  methods: {
    canUseDOM() {
      return typeof window !== 'undefined' && window.document && window.document.createElement
    },
    getScriptElement() {
      return document.getElementById(SCRIPT_ID)
    },
    updateOnloadListener(onload) {
      const script = this.getScriptElement()
      const oldOnload = script.onload
      return (script.onload = () => {
        oldOnload()
        onload()
      })
    },
    scriptExists() {
      return this.getScriptElement() !== null
    },
    appendScript(onload) {
      if (!this.canUseDOM()) {
        onload()
        return
      }

      if (this.scriptExists()) {
        if (typeof TradingView === 'undefined') {
          this.updateOnloadListener(onload)
          return
        }
        onload()
        return
      }
      const script = document.createElement('script')
      script.id = SCRIPT_ID
      script.type = 'text/javascript'
      script.async = true
      script.src = 'https://s3.tradingview.com/tv.js'
      script.onload = onload
      document.getElementsByTagName('head')[0].appendChild(script)
    },
    initWidget() {
      if (typeof TradingView === 'undefined') {
        return
      }

      this.widget = new window.TradingView.widget(
        Object.assign(
          {
            container_id: this.container_id,
            width: 920,
            // height: 1080,
            symbol: this.symbol,
            autosize: true,
            theme: 'Dark',
            overrides: {
              'paneProperties.background': '#131722',
              'paneProperties.vertGridProperties.color': '#363c4e',
              'paneProperties.horzGridProperties.color': '#363c4e',
              'symbolWatermarkProperties.transparency': 90,
              'scalesProperties.textColor': '#AAA',
              'mainSeriesProperties.candleStyle.wickUpColor': '#336854',
              'mainSeriesProperties.candleStyle.wickDownColor': '#7f323f',
            },
          },
          this.options
        )
      )
    },
  },
  mounted() {
    this.appendScript(this.initWidget)
  },
}
</script>
