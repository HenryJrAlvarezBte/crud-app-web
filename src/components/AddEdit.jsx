import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function AddEdit({ user, onSave, onDelete }) {
	const { handleSubmit, register, reset } = useForm();
	const [modalMessage, setModalMessage] = useState('');
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (user) {
			reset(user);
		} else {
			reset({
				first_name: '',
				last_name: '',
				email: '',
				password: '',
				birthday: '',
			});
		}
	}, [user, reset]);

	const onSubmit = (dataForm) => {
		if (user) {
			onSave(dataForm, user.id);
			setModalMessage(
				`El usuario ${dataForm.first_name} ${dataForm.last_name} se ha actualizado.`,
			);
		} else {
			onSave(dataForm);
			setModalMessage(
				`El usuario ${dataForm.first_name} ${dataForm.last_name} se ha agregado.`,
			);
		}

		setShowModal(true);
		setTimeout(() => setShowModal(false), 3000);
	};

	const handleDelete = () => {
		if (user) {
			onDelete(user.id);
			setModalMessage(
				`El usuario ${user.first_name} ${user.last_name} se ha eliminado.`,
			);
			setShowModal(true);
			setTimeout(() => setShowModal(false), 3000);
		}
	};

	return (
		<div className="card__edit">
			<h2 className="card__title">{user ? 'Actualizar' : 'Registro'}</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="card__form">
				<div className="card__field">
					<label className="card__label">Nombre</label>
					<input
						className="card__input"
						type="text"
						{...register('first_name')}
						placeholder="Nombre"
					/>
				</div>
				<div className="card__field">
					<label className="card__label">Apellido</label>
					<input
						className="card__input"
						type="text"
						{...register('last_name')}
						placeholder="Apellido"
					/>
				</div>
				<div className="card__field">
					<label className="card__label">Correo</label>
					<input
						className="card__input"
						type="email"
						{...register('email')}
						placeholder="Correo"
					/>
				</div>
				<div className="card__field">
					<label className="card__label">Contraseña</label>
					<input
						className="card__input"
						type="password"
						{...register('password')}
						placeholder="Contraseña"
					/>
				</div>
				<div className="card__field">
					<label className="card__label">Cumpleaños</label>
					<input
						className="card__input"
						type="date"
						{...register('birthday')}
					/>
				</div>
				<button className="card__button" type="submit">
					{user ? 'Actualizar' : 'Guardar'}
				</button>
			</form>

			{user && (
				<button onClick={handleDelete} className="delete-button">
					Eliminar Usuario
				</button>
			)}

			{showModal && (
				<div className="modal-overlay">
					<div className="modal-content">
						<p>{modalMessage}</p>
						<button className="modal__button">Aceptar</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default AddEdit;
