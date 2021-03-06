import {handleActions} from 'redux-actions'
import {Map} from 'immutable'

const defaultState = Map({
  command: '',
  parameters: {}
})

export default handleActions({
  FIT_NETWORK: (state, action) => ({
    command: 'fit',
  }),
  ZOOM_IN_NETWORK: (state, action) => ({
    command: 'zoomIn'
  }),
  ZOOM_OUT_NETWORK: (state, action) => ({
    command: 'zoomOut'
  }),
  RESET: (state, action) => ({
    command: 'reset'
  }),

  FIND_PATH: (state, action) => ({
    command: 'findPath',
    parameters: action.payload,
    // target: action.payload.target
  }),
  SELECT: (state, action) => ({
    command: 'select',
    parameters: action.payload
  }),
  FOCUS: (state, action) => ({
    command: 'focus',
    parameters: action.payload
  }),
  FILTER: (state, action) => ({
    command: 'filter',
    parameters: action.payload,
    target: action.payload.target
  }),
  ZOOM_TO_NODE: (state, action) => ({
    command: 'zoomToNode',
    parameters: action.payload
  }),

  SHOW_NEIGHBOURS: (state, action) => ({
    command: 'showNeighbours',
    parameters: action.payload
  }),
  HIDE_NEIGHBOURS: (state, action) => ({
    command: 'hideNeighbours',
    parameters: action.payload
  }),
}, defaultState)