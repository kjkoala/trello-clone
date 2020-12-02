import React from 'react'
import { useDragLayer, XYCoord } from 'react-dnd'
import { Column } from './Column'
import { Card } from './Card'
import { CustomDragLayerContainer } from './styles'

export const CustomDragLayer: React.FC = () => {
  const { isDragging, item, currentOffset } = useDragLayer(monitor => ({
    item: monitor.getItem(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }))

  if(!isDragging) return null

  return isDragging ? (
    <CustomDragLayerContainer>
      <div style={getItemStyles(currentOffset)} >
        {item.type === 'COLUMN' ? <Column
          id={item.id}
          text={item.text}
          index={item.index}
          isPreview
        /> :
        <Card 
          columnId={item.columnId}
          isPreview
          index={0}
          id={item.id}
          text={item.text}
        /> }
      </div>
    </CustomDragLayerContainer>
  ) : null
}

function getItemStyles(currentOffset: XYCoord | null): React.CSSProperties {
  if (!currentOffset) {
    return {
      display: 'none'
    }
  }

  const { x, y } = currentOffset
  const transform = `translate(${x}px, ${y}px)`

  return {
    transform,
    WebkitTransform: transform
  }
}