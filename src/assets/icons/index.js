import Vue from 'vue'
import iconSvg from '../../components/Icon-svg'

Vue.component('icon-svg', iconSvg)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
