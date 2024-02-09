const { combineReducers } = require("@reduxjs/toolkit");
import events from './eventsSlice'

const reducer = combineReducers({
    events,
})

export default reducer;