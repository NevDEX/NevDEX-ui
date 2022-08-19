<template>
  <div class="btn-group w-full">
    <li @click="toggleMenu()" class="dropdown-toggle flex flex-row" v-if="selectedOption.name !== undefined">
      <img class="h-6 mr-2" :src="getTokenLogo(selectedOption.name)" alt="" />
      {{ selectedOption.name }}
      <span class="caret"></span>
    </li>  
 
    <li @click="toggleMenu()" class="dropdown-toggle dropdown-toggle-placeholder" v-if="selectedOption.name === undefined">
      {{ placeholderText }}
      <span class="caret"></span>
    </li>

    <ul class="dropdown-menu bg-gray-800" v-if="showMenu">
      <div v-for="(option, idx) in options" :key="idx" class="text-gray-50">
        <a href="javascript:void(0)" class="flex py-2 px-2 hover:bg-gray-500 justify-between" @click="updateOption(option)">
          <div class="flex flex-row">
            <img class="h-6 mr-2" :src="getTokenLogo(option.name)" alt="" />
            {{ option.name }}
          </div>
          <div>
            <span>{{ getTokenBalance(option.name) }}</span>
          </div>
        </a>
      </div>
    </ul>
  </div>
</template>

<script>
import { getTokenAddress, getTokenCfg } from '../../utils/token'
import { getBalance } from '../../contract'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      selectedOption: {
        name: '',
      },
      showMenu: false,
      placeholderText: 'Please select an item',
      balances: [],
    }
  },
  props: {
    options: {
      type: [Array, Object],
    },
    selected: {},
    placeholder: [String],
    closeOnOutsideClick: {
      type: [Boolean],
      default: true,
    },
  },
  computed: {
    ...mapGetters(['isConnected', 'account']),
  },
  mounted() {
    this.selectedOption = this.selected
    if (this.placeholder) {
      this.placeholderText = this.placeholder
    }
    if (this.closeOnOutsideClick) {
      document.addEventListener('click', this.clickHandler)
    }
  },
  beforeDestroy() {
    document.removeEventListener('click', this.clickHandler)
  },
  methods: {
    updateOption(option) {
      this.selectedOption = option
      this.showMenu = false
      this.$emit('updateOption', this.selectedOption)
    },
    toggleMenu() {
      this.showMenu = !this.showMenu
      if (this.showMenu) {
        this.balances = []
        Promise.all(
          this.options.map(async (item) => {
            let tokenAddress = getTokenAddress(item.name)
            let balance = await getBalance(tokenAddress, this.account)
            this.balances[item.name] = balance
          })
        )
      }
    },
    clickHandler(event) {
      const { target } = event
      const { $el } = this
      if (!$el.contains(target)) {
        this.showMenu = false
      }
    },
    getTokenLogo(symbol) {
      return getTokenCfg(symbol)?.logoURI
    },
    getTokenBalance(symbol) {
      return this.balances[symbol]
    },
  },
}
</script>

<style>
.btn-group {
  min-width: 100%;
  height: 40px;
  position: relative;
  margin: 10px 0px;
  display: inline-block;
  vertical-align: middle;
}
.btn-group a:hover {
  text-decoration: none;
}

.dropdown-toggle {
 
}

.dropdown-toggle:hover {
 background-color: aquamarine;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  float: left;
  min-width: 160px;
  width: 100%;
  padding: 5px 0px;
  margin: 2px 0 0;
  list-style: none;
  font-size: 14px;
  text-align: left;
  /* background-color: rgb(66, 45, 45); */
  /* border: 1px solid rgb(66, 45, 45); */
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(119, 36, 36, 0.175);
  background-clip: padding-box;
}

.dropdown-menu > li > a {
  padding: 10px 60px;
  display: block;
  clear: both;
  font-weight: normal;
  line-height: 1.6;
  color: #333333;
  white-space: nowrap;
  text-decoration: none;
}
.dropdown-menu > li > a:hover {
  background:  red;
  color: #282727;
}

.dropdown-menu > li {
  /* padding:0 20px; */
  overflow: hidden;
  width: 100%;
  position: relative;
  margin: 0;
}

.caret {
  width: 0;
  position: absolute;
  top: 19px;
  height: 0;
  margin-left: -24px;
  vertical-align: middle;
  border-top: 4px dashed;
  border-top: 4px solid \9;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  right: 10px;
}

li {
  list-style: none;
}
</style>
