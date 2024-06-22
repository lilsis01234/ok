import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import formatISO from 'date-fns/formatISO';


export const dateFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';

//Pour la séance
export const getSeanceEvents = createAsyncThunk('agenda/events/getSeanceEvents', async () => {
    const response = await axios.get('http://localhost:4000/api/calendrier/agenda');
    const data = await response.data;

    return data;
})

export const addSeanceEvents = createAsyncThunk('agenda/events/addSeanceEvents', async (newSeanceEvent, { dispatch }) => {
    const response = await axios.post(('http://localhost/api/agenda/agenda'), newSeanceEvent)
    const data = await response.data;
    return data;
})

export const updateSeanceEvent = createAsyncThunk('agenda/events/updateSeanceEvent', async (seanceEvent, { dispatch }) => {
    const response = await axios.put(`http://localhost:4000/api/calendrier/edit/${seanceEvent.id}`, seanceEvent)
    const data = await response.data;
    return data
})

export const removeSeanceEvent = createAsyncThunk('agenda/events/deleteSeanceEvent', async (seanceId, { dispatch }) => {
    const response = await axios.delete(`http://localhost:4000/api/calendrier/seance/${seanceId}`);
    const data = await response.data;

    return data;
})

const eventsAdapter = createEntityAdapter({});

export const {
    selectAll: selectEvents,
    selectIds: selectEventIds,
    selectById: selectEventbYId,
} = eventsAdapter.getSelectors((state) => state.calendarApp?.event);

const eventsSlice = createSlice({
    name: 'calendarApp/events',
    initialState: eventsAdapter.getInitialState({
        eventDialog: {
            type: 'new',
            props: {
                open: false,
                anchorPosition: { top: 200, left: 400 },
            },
            data: null,
        }
    }),
    reducers: {
        openNewEventDialog: {
            prepare: (selectInfo) => {
                const { start, end, jsEvent } = selectInfo;
                const payload = {
                    type: 'new',
                    props: {
                        open: true,
                        anchorPosition: { top: jsEvent.pageY, left: jsEvent.pageX },
                    },
                    data: {
                        start: formatISO(new Date(start)),
                        end: formatISO(new Date(end)),
                    },
                };
                return { payload };
            },
            reducer: (state, action) => {
                state.eventDialog = action.payload;
            }
        },
        openEditEventDialog: {
            prepare: (clickInfo) => {
                const { jsEvent, event } = clickInfo;
                const { id, title, allDay, start, end, extendedProps } = event;

                const payload = {
                    type: 'edit',
                    props: {
                        open: true,
                        anchorPosition: { top: jsEvent.pageY, left: jsEvent.pageX },
                    },
                    data: {
                        id,
                        title,
                        allDay,
                        extendedProps,
                        start: formatISO(new Date(start)),
                        end: formatISO(new Date(end)),
                    },
                };
                return { payload };
            },
            reducer: (state, action) => {
                state.eventDialog = action.payload;
            },
        },
        closeNewEventDialog: (state, action) => {
            state.eventDialog = {
                type: 'new',
                props: {
                    open: false,
                    anchorPosition: { top: 200, left: 400 },
                },
                data: null,
            };
        },
        closeEditEventDialog: (state, action) => {
            state.eventDialog = {
                type: 'edit',
                props: {
                    open: false,
                    anchorPosition: { top: 200, left: 400 },
                },
                data: null,
            };
        },
    },
    extraReducers: {
        [getSeanceEvents.fulfilled]: eventsAdapter.setAll,
        [addSeanceEvents.fulfilled]: eventsAdapter.addOne,
        [updateSeanceEvent.fulfilled]: eventsAdapter.upsertOne,
        [removeSeanceEvent.fulfilled]: eventsAdapter.removeOne,
    },
})

export const {
    openNewEventDialog,
    closeNewEventDialog,
    openEditEventDialog,
    closeEditEventDialog,
} = eventsSlice.actions;

export const selectFilteredEvents = createSelector(
    [selectEvents],
    ( events) => {
        // return events.filter((item) => selectedLabels.includes(item.extendedProps.label));
        return events;
    }
);

export const selectEventDialog = ({ calendarApp }) => calendarApp?.events?.eventDialog;

export default eventsSlice.reducer;


