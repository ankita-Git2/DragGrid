// src/components/TaskBoard.js
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Task 1' },
    'task-2': { id: 'task-2', content: 'Task 2' },
    'task-3': { id: 'task-3', content: 'Task 3' },
    'task-4': { id: 'task-4', content: 'Task 4' },
    'task-5': { id: 'task-5', content: 'Task 5' },
    'task-6': { id: 'task-6', content: 'Task 6' },
    'task-7': { id: 'task-7', content: 'Task 7' },
    'task-8': { id: 'task-8', content: 'Task 8' },
    'task-9': { id: 'task-9', content: 'Task 9' },
    'task-10': { id: 'task-10', content: 'Task 10' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Today',
      taskIds: [],
    },
    'column-2': {
      id: 'column-2',
      title: 'Tomorrow',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'This Week',
      taskIds: [],
    },
    'column-4': {
      id: 'column-4',
      title: 'Next Week',
      taskIds: [],
    },
    'column-5': {
      id: 'column-5',
      title: 'Unplanned',
      taskIds: [
        'task-1',
        'task-2',
        'task-3',
        'task-4',
        'task-5',
        'task-6',
        'task-7',
        'task-8',
        'task-9',
        'task-10',
      ],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3', 'column-4', 'column-5'],
};

const TaskBoard = () => {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="task-board">
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
