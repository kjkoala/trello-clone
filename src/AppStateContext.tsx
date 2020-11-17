import { nanoid } from 'nanoid'
import React, { createContext, useContext, useReducer } from 'react'
import { DragItem } from './DragItem'
import { moveItem } from './moveItem'
import { findItemIndexById } from './utils/findItemIndexById'

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps)

export const AppStateProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(AppStateReducer, AppData)

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => useContext(AppStateContext)

type Action =
  | {
    type: 'ADD_LIST'
    payload: string
  }
  | {
    type: 'ADD_TASK'
    payload: { text: string; listId: string }
  }
  | {
    type: 'MOVE_LIST'
    payload: {
      dragIndex: number
      hoverIndex: number
    }
  }
  | {
    type: 'SET_DRAGGED_ITEM'
    payload: DragItem | undefined
  }


interface AppStateContextProps {
  state: AppState
}


interface Task {
  id: string,
  text: string
}

interface List {
  id: string,
  text: string,
  tasks: Task[]
}

interface AppStateContextProps {
  state: AppState
  dispatch: React.Dispatch<Action>
}

export interface AppState {
  lists: List[]
  draggedItem: DragItem | undefined;
}

const AppData: AppState = {
  lists: [
    {
      id: '0',
      text: 'Сделать',
      tasks: [{ id: 'c0', text: 'Создать каркас приложения' }]
    },
    {
      id: '1',
      text: 'В процессе',
      tasks: [{ id: 'c2', text: 'Выучить тайпскрипт' }]
    },
    {
      id: '2',
      text: 'Выполнено',
      tasks: [{ id: 'c3', text: 'Выучить статические типы' }]
    }
  ],
  draggedItem: undefined
}

const AppStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_LIST': {
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: nanoid(), text: action.payload, tasks: [] }
        ]
      }
    }
    case 'ADD_TASK': {
      const targetLaneIndex = findItemIndexById(
        state.lists,
        action.payload.listId
      )
      state.lists[targetLaneIndex].tasks.push({
        id: nanoid(),
        text: action.payload.text
      })
      return { ...state }
    }
    case 'MOVE_LIST': {
      const { dragIndex, hoverIndex } = action.payload
      state.lists = moveItem(state.lists, dragIndex, hoverIndex)
      return { ...state }
    }
    case 'SET_DRAGGED_ITEM': {
      return { ...state, draggedItem: action.payload }
    }
    default:
      return {
        ...state
      }
  }
}
