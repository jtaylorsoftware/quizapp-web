import { configureStore, Action } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { ThunkAction } from 'redux-thunk'

import rootReducer from './reducer'

const createStoreAndPersistor = () => {
  const rootPersistConfig = {
    key: 'root',
    storage,
    blacklist: ['alerts'],
  }

  let store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['FLUSH', 'REHYDRATE', 'PAUSE', 'PERSIST', 'PURGE', 'REGISTER'],
      }
    }),
    devTools: process.env.NODE_ENV !== 'production',
  })

  let persistor = persistStore(store)
  return { store, persistor }
}

export type RootState = ReturnType<typeof rootReducer>
export type Thunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default createStoreAndPersistor
