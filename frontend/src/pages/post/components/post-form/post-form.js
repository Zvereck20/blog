import { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { savePostAsync } from '../../../../actions';
import { SpecialPanel } from '../special-panel/special-panel';
import { Icon, Input } from '../../../../components';
import { sanitizeContent } from './utils/sanitize-content';
import { PROP_TYPE } from '../../../../constans';
import styled from 'styled-components';

const PostFromContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState('');
	const [titleValue, setTitleValue] = useState('');

	const contentRef = useRef(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [title, imageUrl]);

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(id, {
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/post/${id}`));
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitleValue(target.value);

	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				placeholder="Изображение..."
				onChange={onImageChange}
			/>
			<Input
				value={titleValue}
				placeholder="Заголовок..."
				onChange={onTitleChange}
			/>

			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="20px 0"
				editButton={<Icon id="fa-floppy-o" size="21px" onClick={onSave} />}
			/>
			<div
				ref={contentRef}
				suppressContentEditableWarning={true}
				contentEditable={true}
				className="post-text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFromContainer)`
	& .post-text {
		padding: 10px;
		min-height: 80px;
		border: 1px solid #000;
		font-size: 18px;
		white-space: pre-line;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};