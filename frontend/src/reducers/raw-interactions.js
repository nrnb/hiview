import {FETCH_INTERACTIONS, RECEIVE_INTERACTIONS, SET_VALUE, SET_MAX_EDGE_COUNT} from '../actions/raw-interactions'
import {Map} from 'immutable'

const DEF_MAX_EDGE_COUNT = 500

const defState = Map({
  loading: false,
  interactions: null,
  filters: null,
  extraEdges: null,
  maxEdgeCount: DEF_MAX_EDGE_COUNT
})

export default function networkState(state = defState, action) {

  switch (action.type) {
    case FETCH_INTERACTIONS:
      return state
        .set('loading', true)
        .set('interactions', null)
    case RECEIVE_INTERACTIONS:
      return state
        .set('loading', false)
        .set('interactions', action.network)
        .set('filters', action.filters)
        .set('groups', action.groups)
        .set('extraEdges', action.extraEdges)
    case SET_VALUE:

      const filters = state.get('filters')
      const attributeName = action.payload.attributeName
      let filterCount = attributeName.length

      let filter = null
      while(filterCount--) {
        const current = filters[filterCount]
        if(current.attributeName === attributeName) {
          filter = current;
          break;
        }
      }

      // const filter = state.get(action.payload.attributeName)
      if(filter.type === 'continuous') {
        filter.value = action.payload.value
      } else {
        filter.enabled = action.payload.enabled
      }


      return state.set('filters', filters)
    case SET_MAX_EDGE_COUNT:
      return set('maxEdgeCount', action.payload)

    default:
      return state
  }
}
