import { useEffect, useMemo, useState } from 'react';
import { Pagination, PostCard, Search } from './components';
import styled from 'styled-components';
import { PAGINATION_LIMIT } from '../../constans';
import { debounce } from './utils';
import { request } from '../../utils';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shuoldSearch, setShuoldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');

	useEffect(() => {
		request(
			`/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { posts, lastPage } }) => {
			setPosts(posts);
			setLastPage(lastPage);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, shuoldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShuoldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shuoldSearch);
	};

	return (
		<div className={className}>
			<Search onChange={onSearch} searchPhrase={searchPhrase} />
			{posts.length ? (
				<div className="post-list">
					{posts.map(({ id, title, publishedAt, imageUrl, comments }) => (
						<PostCard
							key={id}
							id={id}
							title={title}
							publishedAt={publishedAt}
							imageUrl={imageUrl}
							commentsCount={comments.length}
						/>
					))}
				</div>
			) : (
				<div className="no-posts-found">Статьи не найдены</div>
			)}

			{lastPage > 1 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	& .post-list {
		padding: 20px 20px 80px;
		display: flex;
		flex-wrap: wrap;
	}

	& .no-posts-found {
		margin-top: 40px;
		text-align: center;
		font-size: 18px;
	}
`;
