import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import sideBarSlice from './sideBarSlice'

const store = configureStore({
    reducer: {
        auth : authSlice,
        sideBar: sideBarSlice,

        //TODO: add more slices here for posts
    }
});


export default store;