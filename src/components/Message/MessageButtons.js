import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


function computeBorderRadius(sharpBorderRadius, ovalBorderRadius, isOwn, childIndexName = 'single') {
  const reorder = function reorder(order, arr) {
    return order.map((position) => {
      return arr[position];
    });
  };

  const flipStyleHorizontally = reorder.bind(null, [1, 0, 3, 2]);

	const borderRadiusMap = {
		single: [sharpBorderRadius, ovalBorderRadius, ovalBorderRadius, ovalBorderRadius],
		first: [ovalBorderRadius, ovalBorderRadius, ovalBorderRadius, sharpBorderRadius],
		middle: [sharpBorderRadius, ovalBorderRadius, ovalBorderRadius, sharpBorderRadius],
		last: [sharpBorderRadius, ovalBorderRadius, ovalBorderRadius, ovalBorderRadius]
	};
	const style = borderRadiusMap[childIndexName];
	const result = (isOwn ? flipStyleHorizontally(style) : style).join(' ');
  return result;
}

function computeButtonBorderRadius(edge, borderRadius) {
  const borderSplit = borderRadius.split(' ');
  const topLeft = borderSplit[0];
  const topRight = borderSplit[1];
  const bottomLeft = borderSplit[2];
  const bottomRight = borderSplit[3];

	if (edge === 'top') {
    return topLeft + ' ' + topRight + ' 0 0';
  }

	return '0 0 ' + bottomLeft + ' ' + bottomRight;
}

function computeChildBorderRadius(parentBorderRadius, namedIndex) {
	const parentBorderRadiusSplit = parentBorderRadius.split(' ');
	if (namedIndex === 'middle') {
		return '0 0 0 0';
	}
	if (namedIndex === 'single') {
		return parentBorderRadius;
	}
	if (namedIndex === 'first') {
		return parentBorderRadiusSplit[0] + ' ' + parentBorderRadiusSplit[1] + ' 0 0';
	}
	return '0 0 ' + parentBorderRadiusSplit[2] + ' ' + parentBorderRadiusSplit[3];
}

const StyledMessageButtons = styled.div`
  button{
    border-radius:0;
  }
  ${props => {
    const { isOwn, childIndexName, theme: { Message, MessageButtons }} = props.theme;

    const computedParentBorderRadius = computeBorderRadius(Message.sharpBorderRadius, Message.ovalBorderRadius, isOwn, childIndexName);
    const ownBorderRadius = computeChildBorderRadius(computedParentBorderRadius, childIndexName);
    const firstBorderTop = childIndexName === 'single' || childIndexName === 'first' ? '0' : '1px solid rgba(0, 0, 0, 0.1)';
    const lastBorderBottom = childIndexName === 'last' || childIndexName === 'single' ? '0' : '1px solid rgba(0, 0, 0, 0.1)';

    const style = {
      borderRadius: ownBorderRadius,
      'button:first-child': {
        borderTop: firstBorderTop,
        borderRadius: computeButtonBorderRadius('top', ownBorderRadius)
      },
      'button:last-child': {
        borderBottom: lastBorderBottom,
        borderRadius: computeButtonBorderRadius('bottom', ownBorderRadius)
      },
      'button:first-child:last-child': {
        borderRadius: ownBorderRadius
      }
    };

    return Object.assign({}, style, MessageButtons.css);
  }}
`;

class MessageButtons extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    isOwn: PropTypes.bool,
    namedIndex: PropTypes.string,
    parentNamedIndex: PropTypes.string
  }

  render() {
    const { children } = this.props;
    return (
      <StyledMessageButtons>{children}</StyledMessageButtons>
    );
  }
}

export default MessageButtons;
