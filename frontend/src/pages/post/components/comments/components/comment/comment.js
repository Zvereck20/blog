import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, openModal, removeCommentAsync } from '../../../../../../actions';
import { Icon } from '../../../../../../components';
import styled from 'styled-components';
import { ROLE } from '../../../../../../constans';
import { selectUserRole } from '../../../../../../selectors';

const CommentContainer = ({ className, id, author, content, publishedAt, postId }) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(id, postId));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon
							id="fa-user-circle-o"
							margin="0 10px 0 0"
							size="18px"
							onClick={() => {}}
						/>
						{author}
					</div>
					<div className="published-at">
						<Icon
							id="fa-calendar-o"
							margin="0 10px 0 0"
							size="18px"
							onClick={() => {}}
						/>
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon
					id="fa-trash-o"
					margin="0 0 0 10px"
					size="22px"
					onClick={() => onCommentRemove(id)}
				/>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;

	& .comment {
		padding: 5px 10px;
		width: 100%;
		border: 1px solid black;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
	}

	& .published-at {
		display: flex;
	}
`;

Comment.propTypes = {
	id: PropTypes.string.isRequired, 
	author: PropTypes.string.isRequired, 
	content: PropTypes.string.isRequired, 
	publishedAt: PropTypes.string.isRequired, 
	postId: PropTypes.string.isRequired,
};