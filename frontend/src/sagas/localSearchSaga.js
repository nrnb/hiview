import { all, call, put, takeLatest } from 'redux-saga/effects'

import {
  LOCAL_SEARCH_FAILED,
  LOCAL_SEARCH_SUCCEEDED,
  LOCAL_SEARCH_STARTED
} from '../actions/local-search'

export default function* localSearchSaga() {
  yield takeLatest(LOCAL_SEARCH_STARTED, watchSearch)
}

function* watchSearch(action) {
  let index = action.payload.index
  let query = action.payload.query

  const queryArray = query.split(' ')

  let resArray = []

  try {
    let len = queryArray.length
    while (len--) {
      const geneSymbol = queryArray[len]
      const results = index.search(geneSymbol)
      console.log('**************G = ', geneSymbol, results)

      resArray = [...resArray, ...results]
    }

    const resultJson = resArray
    console.log(
      'Got search results::::::::::::::::',
      action,
      resultJson,
      query,
      resArray.map(entry => (entry.Label))
    )
    yield put({
      type: LOCAL_SEARCH_SUCCEEDED,
      payload: {
        results: resultJson
      }
    })
  } catch (e) {
    console.warn('Local search error:', e)
    yield put({
      type: LOCAL_SEARCH_FAILED,
      payload: {
        message: 'Local search error',
        query: query,
        error: e.message
      }
    })
  }
}
