import PropTypes from 'prop-types';
import { Input, Icon } from '../../../../components';
import styled from 'styled-components';

const SearchContaier = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				onChange={onChange}
				placeholder="Поиск по заголовку..."
			/>
			<Icon id="fa-search" size="21px" inactive={true} />
		</div>
	);
};

export const Search = styled(SearchContaier)`
	margin: 40px auto 0;
	width: 340px;
	height: 40px;
	display: flex;
	position: relative;

	& > input {
		padding: 10px 32px 10px 10px;
	}

	& > div {
		position: absolute;
		right: 9px;
		top: 5px;
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
