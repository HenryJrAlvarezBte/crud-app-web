import { FaRegPenToSquare } from 'react-icons/fa6';
import { LuTrash2 } from 'react-icons/lu';
import { TiGift } from 'react-icons/ti';
import '../App.css';

function UserCard({ user, deleteUser, openEdit }) {
	return (
		<div className="card">
			<h3 className="card_name">
				{user?.first_name} {user?.last_name}
			</h3>
			<div className="card_email">
				<div>
					<span>Correo:</span> <br />
					<strong>{user?.email}</strong>
				</div>
				<div className="card_birthday">
					<span>Cumpleaños:</span>
					<br />
					<strong>
						<TiGift /> {user?.birthday}
					</strong>
				</div>
			</div>
			<div className="card_btns">
				<button onClick={() => deleteUser(user?.id)}>
					<LuTrash2 />{' '}
				</button>
				<button onClick={() => openEdit(user)}>
					<FaRegPenToSquare />{' '}
				</button>
			</div>
		</div>
	);
}

export default UserCard;
