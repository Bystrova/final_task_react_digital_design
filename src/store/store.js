
import {computed, makeAutoObservable, observable, onBecomeObserved, action, autorun, reaction} from 'mobx';
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
	deleteTask
 } from '../api';

export const authUserId = document.cookie.slice(document.cookie.indexOf('=') + 1);

class TasksStore {
	tasksData = [];
	taskData = {};
	id = '';
	total = null;
	taskLimit = 8;

	tasksFilter = {}

	constructor() {
		makeAutoObservable(this, {}, {
		autoBind: true
		})

		onBecomeObserved(this, 'tasksData', this.getTasks)
		onBecomeObserved(this, 'taskData', this.getTask)
	}

	*getTasks() {
		const response = yield getTasks(this.tasksFilter);
		this.tasksData = response.data.data;
		this.total = response.data.total;
	}

	*getTask() {
		const response = yield getTask(this.id);
		this.taskData = response.data;
	}

	*addOrEditTask(data) {
		yield addOrEditTask(data);
		yield this.getTasks();
	}

	*deleteTask(id){
		yield deleteTask(id);
		yield this.getTasks();
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

	*getAllUsers() {
		const response = yield getAllUsers();
		this.allUsersData = response.data;
	}

	*getUsers() {
		const response = yield getUsers(this.usersFilter);
		this.usersData = response.data.data;
		this.total = response.data.total;
	}

	*getUser() {
		const response = yield getUser(this.id);
		this.userData = response.data;
	}

	*editUser(data) {
		yield editUser(data);
		yield this.getUser();
	}
}
export const users = new UsersStore();
export const logIn = new UsersStore();

reaction(() => users.usersFilter, () => { users.getUsers() });

class CommentsStore {
	commentsData = [];
	id = '';

	constructor() {
		makeAutoObservable(this, {}, {
		autoBind: true
		})

		onBecomeObserved(this, 'commentsData', this.getComments);
	}

	*getComments() {
		const response = yield getComments(this.id);
		this.commentsData = response.data;
	}

	*addOrEditComment(data) {
		yield addOrEditComment(data);
		yield this.getComments();
	}

	*deleteComment(id) {
		yield deleteComment(id);
		yield this.getComments();
	}
}
export const comments = new CommentsStore();