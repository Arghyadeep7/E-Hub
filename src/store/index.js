import { configureStore } from '@reduxjs/toolkit';

import searchReducer from './Search';
import typeReducer from './Type';
import filterReducer from './Filter';

const store=configureStore({
    reducer:{
        search:searchReducer,
        filter:filterReducer,
        type:typeReducer
    }
});

export default store;