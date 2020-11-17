import React, { useState } from 'react'
import { useFocus } from './utils/useFocus'
import { NewItemFromContainer, NewItemButton, NewItemInput } from './styles'

interface NewItemFormProps {
  onAdd(text: string): void
}

export const NewItemForm = ({ onAdd }: NewItemFormProps) => {
  const [text, setText] = useState('')
  const inputRef = useFocus()

  return (
    <NewItemFromContainer>
      <NewItemInput
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <NewItemButton onClick={() => onAdd(text)}>
        Добавить
        </NewItemButton>
    </NewItemFromContainer>
  )
}

