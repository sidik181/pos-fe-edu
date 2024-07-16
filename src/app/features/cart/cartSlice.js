import { createSlice } from '@reduxjs/toolkit';


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        status: 'idle'
    },
    reducers: {
        addItemState(state, action) {
            state.items.push(action.payload);
        },
        updateProductQuantityState: (state, action) => {
            const { id, qty, sub_total } = action.payload;
            const item = state.items.find(item => item._id === id);
            if (item) {
                item.qty = qty;
                item.sub_total = sub_total
            }
        },
        removeItemState(state, action) {
            const { id } = action.payload;
            state.items = state.items.filter(item => item._id !== id);
        },
        clearCartState(state) {
            state.items = [];
            state.status = 'idle';
        },
    }
});

export const { addItemState, updateProductQuantityState, removeItemState, clearCartState } = cartSlice.actions;

export default cartSlice.reducer;