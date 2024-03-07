import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import formatISO from 'date-fns/formatISO';


export const dateFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';

//Pour la scéance
export const getSceanceEvents = createAsyncThunk('agenda/events/getSceanceEvents', async () => {
    const response = await axios.get('http://localhost:4000/api/calendrier/agenda');
    const data = await response.data;

    return data;
})

export const addSceanceEvents = createAsyncThunk('agenda/events/addSceanceEvents', async (newSceanceEvent, { dispatch }) => {
    const response = await axios.post(('http://localhost/api/agenda/agenda'), newSceanceEvent)
    const data = await response.data;
    return data;
})

export const updateSceanceEvent = createAsyncThunk('agenda/events/updateSceanceEvent', async (sceanceEvent, { dispatch }) => {
    const response = await axios.put(`http://localhost:4000/api/calendrier/edit/${sceanceEvent.id}`, sceanceEvent)
    const data = await response.data;
    return data
})

export const removeSceanceEvent = createAsyncThunk('agenda/events/deleteSceanceEvent', async (sceanceId, { dispatch }) => {
    const response = await axios.delete(`http://localhost:4000/api/calendrier/seance/${sceanceId}`);
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
        [getSceanceEvents.fulfilled]: eventsAdapter.setAll,
        [addSceanceEvents.fulfilled]: eventsAdapter.addOne,
        [updateSceanceEvent.fulfilled]: eventsAdapter.upsertOne,
        [removeSceanceEvent.fulfilled]: eventsAdapter.removeOne,
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


