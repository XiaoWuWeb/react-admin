import AppStateClass from './app-state'

export const AppState = AppStateClass

export default {
  AppState,
}

export const createStoreMap = () => { // 服务端渲染
  return {
    appState: new AppState(),
  }
}
