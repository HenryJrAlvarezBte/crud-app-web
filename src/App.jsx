import { useEffect, useState } from 'react';
import './App.css';
import Layout from './layouts/Layout';
import useFetch from './hooks/useFetch';
import AddEdit from './components/AddEdit';
import Modal from './components/Modal';
import UserList from './components/UserList';
import { HiOutlinePlus } from 'react-icons/hi2';

const baseUrl = 'https://users-crud-api-81io.onrender.com/api/v1/';
function App() {
	const [users, setUsers, loading] = useFetch();
	const [isOpen, setIsOpen] = useState(false);
	const [currentChild, setCurrentChild] = useState(null);

	useEffect(() => {
		readUsers();
	}, []);

	// Create user
	const createUser = (dataForm) => {
		setUsers({
			url: `${baseUrl}users`,
			method: 'POST',
			body: dataForm,
		});
		setIsOpen(false);
	};

	// Read all users
	const readUsers = () => {
		setUsers({ url: `${baseUrl}users` });
	};

	// Update users

	const updateUser = (dataForm, userId) => {
		setUsers({
			url: `${baseUrl}users/${userId}`,
			method: 'PATCH',
			body: dataForm,
		});
		setIsOpen(false);
	};

	// Delete users

	const deleteUser = (userId) => {
		setUsers({
			url: `${baseUrl}users/${userId}`,
			method: 'DELETE',
		});
	};

	//HandlerOpenModal

	const openAdd = () => {
		setIsOpen(true);
		setCurrentChild(<AddEdit onSave={createUser} />);
	};

	const openEdit = (user) => {
		setIsOpen(true);
		setCurrentChild(<AddEdit user={user} onSave={updateUser} />);
	};

	return (
		<Layout>
			<div className="header">
				<div className="header__container">
					<h1 className="header__title">Usuarios</h1>
					<div className="header__button">
						<button type="button" className="btn" onClick={openAdd}>
							<HiOutlinePlus /> Crear nuevo usuario
						</button>
					</div>
				</div>
			</div>

			<div>
				{loading ? (
					<h2>Cargando ...</h2>
				) : (
					<UserList users={users} openEdit={openEdit} deleteUser={deleteUser} />
				)}
			</div>

			<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
				{currentChild}
			</Modal>
		</Layout>
	);
}

export default App;
