import { configureStore, Action } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { ThunkAction } from 'redux-thunk'

import rootReducer from './reducer'

export type RootState = ReturnType<typeof rootReducer>

const defaultMiddleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        'FLUSH',
        'REHYDRATE',
        'PAUSE',
        'PERSIST',
        'PURGE',
        'REGISTER',
      ],
    },
  })

export const createAppStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as RootState,
    middleware: defaultMiddleware,
    devTools: process.env.NODE_ENV !== 'production',
  })

const createStoreAndPersistor = () => {
  const rootPersistConfig = {
    key: 'root',
    storage,
    blacklist: ['alerts'],
  }

  let store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: defaultMiddleware,
    devTools: process.env.NODE_ENV !== 'production',
  })

  let persistor = persistStore(store)
  return { store, persistor }
}

export type AppStore = ReturnType<typeof createAppStore>
export type AppDispatch = AppStore['dispatch']
export type Thunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default createStoreAndPersistor
