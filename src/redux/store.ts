import { combineReducers, configureStore } from '@reduxjs/toolkit'
import orderReducer from './reducer/orderReducer'
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
import {name as appName} from '../../app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './reducer/authReducer';
import itemReducer from './reducer/itemReducer';

const combine = combineReducers({
    auth:authReducer,
    order:orderReducer,
    item:itemReducer
})

const persistConfig: any = {
    key: 'root',
    blacklist: [],
    whitelist: ['auth'],
    keyPrefix: appName,
    storage: AsyncStorage,
  };
  
  const persistedReducer = persistReducer(persistConfig, combine);
  

export const store = configureStore({
  reducer: persistedReducer,
  devTools: {trace: true, traceLimit: 25},
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store);