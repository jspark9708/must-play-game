import { configureStore, createSlice } from '@reduxjs/toolkit';

const detailDataSlice = createSlice ({
    name: 'detailData',
    initialState: {},
    reducers: {
        addDetailData(state, action){
            state.data = action.payload;
            localStorage.setItem("itemData", JSON.stringify(action.payload));
        }
    }
});

export const { addDetailData } = detailDataSlice.actions;

const store = configureStore ({
    reducer: {
        detail: detailDataSlice.reducer
    }
});

export default store;