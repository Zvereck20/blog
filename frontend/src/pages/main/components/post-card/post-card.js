import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Icon } from '../../../../components';

const PostCardContainer = ({
	className,
	id,
	title,
	publishedAt,
	imageUrl,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className="post-card-footer">
					<h4>{title}</h4>
					<div className="post-card-info">
						<div className="published-at">
							<Icon
								id="fa-calendar-o"
								margin="0 7px 0 0"
								size="18px"
								inactive={true}
							/>
							{publishedAt}
						</div>
						<div className="comments-count">
							<Icon
								id="fa-comment-o"
								margin="0 7px 0 0"
								size="18px"
								inactive={true}
							/>
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	margin: 20px;
	width: 280px;
	display: flex;
	flex-direction: column;
	border: 1px solid #000;

	& img {
		display: block;
		width: 100%;
	}

	& .post-card-footer {
		padding: 5px;
	}

	& h4 {
		margin: 0;
	}

	& .post-card-info {
		margin-top: 5px;
		display: flex;
		justify-content: space-between;
	}

	& .published-at {
		display: flex;
	}

	& .comments-count {
		display: flex;
	}
`;

PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
};
