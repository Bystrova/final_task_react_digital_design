import React from 'react';
import Header from '../../components/header/header';
import User from '../../components/user/user';
import Pagination from '../../components/pagination/pagination';
import '../../scss/blocks/board.scss';
import { users } from '../../store/store';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import isEqual from 'lodash.isequal';

const Users = observer(() => {

	const { userLimit, usersFilter } = users;
	const [page, setPage] = useState(0);
	const filter = {
		'filter': {
			'query': ''
		},
		'page': page,
		'limit': userLimit
	}

	if (!isEqual(filter, usersFilter)) {
		users.usersFilter = filter;
	}

	const { usersData, total } = users;

	return (
		<>
			<Header />
			<main className='center'>
				<section className='board'>
					<section className='board-top'>
						<h1 className='board-heading'>Пользователи</h1>
					</section>
					<section className='board-wrapper'>
						<div className='board-inner'>
							{usersData.map(user => <User {...user} key={user.id} />)}
						</div>
						<Pagination total={total} limit={userLimit} setPage={setPage} page={page} dataLength={usersData.length} />
					</section>
				</section>
			</main >
		</>
	)
})

export default Users;