export const AppRoute = {
	LOGIN: '/',
	TASKS: '/tasks',
	TASK_VIEW: '/tasks/task',
	TASK_EDIT: '/task/edit/:id?',
	TASK_ADD: '/task/edit',
	USERS: '/users',
	USER: '/users/user'
}

export const Ranks = {
		'low': 'Низкий',
		'medium': 'Средний',
		'high': 'Высокий'
	}

export const Statuses = {
		'opened': 'Открыто',
		'inProgress': 'В работе',
		'testing': 'Тестирование',
		'complete': 'Сделано'
	}

export const Types = {
	'bug': 'Ошибка',
	'task': 'Задача'
}

export const DropdownTypes = {
	'rank': 'Приоритет',
	'status': 'Статус',
	'type': 'Тип',
	'executor': 'Пользователь'
}