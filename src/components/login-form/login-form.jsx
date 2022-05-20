import React from 'react';
import './login-form.scss';
import '../../scss/fonts.scss';
import '../../scss/blocks/label-text.scss';
import '../../scss/blocks/form-input.scss';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { getLogIn } from '../../api';
import { AppRoute } from '../../const';
import { observer } from 'mobx-react-lite';

const LoginForm = observer(() => {

	const [form, setForm] = useState({
		login: '',
		password: ''
	})

	const handleFieldChange = (evt) => {
		const { name, value } = evt.target;
		setForm({ ...form, [name]: value });
	}

	const [isLogin, setIsLogin] = useState(false);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		getLogIn({
			'login': form.login,
			'password': form.password
		}, setIsLogin)
	}

	if (isLogin) {
		localStorage.password = form.password;
		return <Redirect to={AppRoute.TASKS} />
	}

	return (
		<section className='center center-login'>
			<form className='login-form' onSubmit={handleSubmit}>
				<h1 className='login-form-heading'>Авторизация</h1>
				<div className='login-form-inputs'>
					<label
						className='label-text'
						htmlFor='login'
					>Логин
					</label>
					<input
						className='form-input'
						type='text'
						id='login'
						placeholder='username'
						name='login'
						required
						onChange={handleFieldChange}>
					</input>
					<label
						className='label-text'
						htmlFor='password'
					>Пароль
					</label>
					<input
						className='form-input'
						type='password'
						id='password'
						placeholder='********'
						name='password'
						required
						onChange={handleFieldChange}
					></input>
				</div>
				<button
					className='button button-success'
					type='submit'>Вход</button>
			</form>
		</section>
	)
})

export default LoginForm;