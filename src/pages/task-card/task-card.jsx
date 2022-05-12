import React from 'react';
import Header from '../../components/header/header';
import TaskView from '../../components/task-view/task-view';
import '../../scss/blocks/board.scss';
import { observer } from 'mobx-react-lite';

const TaskCard = observer(() => {

	return (
		<>
			<Header />
			<TaskView />
		</>
	)
})

export default TaskCard;