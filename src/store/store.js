
import {
	computed, 
	makeAutoObservable,
	onBecomeObserved,  
	reaction
} from 'mobx';

import { 
	getTasks, 
	getTask, 
	getAllUsers, 
	getUsers, 
	getUser, 
	getComments, 
	addOrEditComment, 
	deleteComment, 
	addOrEditTask,
	editUser,
	deleteTask,
	addTaskWorktime,
	changeTaskStatus
 } from '../api';

class TasksStore {
	tasksData = [];
	taskData = {};
	id = '';
	total = null;
	taskLimit = 8;
	page = 0;
	pageInUserCard = 0;
	

	tasksFilter = {
		'filter': {
			'query': '',
			'assignedUsers': [],
			'userIds': [],
			'type': [],
			'status': [],
			'rank': []
		},
		'page': 0,
		'limit': this.taskLimit
	}

	constructor() {
		makeAutoObservable(this, {}, {
		autoBind: true
		})

		onBecomeObserved(this, 'tasksData', this.getTasks)
		onBecomeObserved(this, 'taskData', this.getTask)
	}

	async getTasks() {
		const response = await getTasks(this.tasksFilter);
		this.tasksData = response.data.data;
		this.total = response.data.total;
	}

	async getTask() {
		const response = await getTask(this.id);
		this.taskData = response.data;
	}

	async addTask(data) {
		await addOrEditTask(data);
		await this.getTasks();
	}

	async editTask(data) {
		await addOrEditTask(data);
		await this.getTask();
		await this.getTasks();
	}

	async addTaskWorktime(id, data){
		await addTaskWorktime(id, data);
		await this.getTask();
		await comments.getComments();
	}

	async changeTaskStatusFromCard(id, status){
		await changeTaskStatus(id, status);
		await this.getTask();
	}

	async changeTaskStatusFromList(id, status){
		await changeTaskStatus(id, status);
		await this.getTasks();
	}

	async deleteTask(id){
		await deleteTask(id);
		await this.getTasks();
	}
}

export const tasks = new TasksStore();

reaction(() => tasks.tasksFilter, () => { tasks.getTasks() });

class UsersStore {
	allUsersData = [];
	usersData = [];
	userData = {};
	id = '';
	usersFilter = {};
	total = null;
	userLimit = 9;
	lastLocation = '';
	
	constructor() {
		makeAutoObservable(this, {}, {
		autoBind: true,
		sortedData: computed
		})

		onBecomeObserved(this, 'allUsersData', this.getAllUsers);
		onBecomeObserved(this, 'usersData', this.getUsers);
		onBecomeObserved(this, 'userData', this.getUser);
	}

	get allUsersDataSorted() {
		return this.allUsersData.slice().sort((a, b) => a.username > b.username ? 1 : -1);
	}

	async getAllUsers() {
		const response = await getAllUsers();
		this.allUsersData = response.data;
	}

	async getUsers() {
		const response = await getUsers(this.usersFilter);
		this.usersData = response.data.data;
		this.total = response.data.total;
	}

	async getUser() {
		const response = await getUser(this.id);
		this.userData = response.data;
	}

	async editUser(data) {
		await editUser(data);
		await this.getUser();
	}
}
export const users = new UsersStore();
export const logIn = new UsersStore();

reaction(() => users.usersFilter, () => { users.getUsers() });
reaction(() => users.id, () => { users.getUser() });

class CommentsStore {
	commentsData = [];
	id = '';

	constructor() {
		makeAutoObservable(this, {}, {
		autoBind: true
		})

		onBecomeObserved(this, 'commentsData', this.getComments);
	}

	async getComments() {
		const response = await getComments(this.id);
		this.commentsData = response.data;
	}

	async addOrEditComment(data) {
		await addOrEditComment(data);
		await this.getComments();
	}

	async deleteComment(id) {
		await deleteComment(id);
		await this.getComments();
	}
}
export const comments = new CommentsStore();