import React from 'react';  // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import Styled from 'rsg-components/Styled';

const styles = ({ fontFamily, color }) => ({
  logo: {
    alignItems: 'center',
    margin: 0,
    fontFamily: fontFamily.base,
    fontSize: 18,
    fontWeight: 'normal',
    color: color.baseBackground,
    textAlign: 'center'
  },
  image: {
    width: '150px'
  }
});

export function LogoRenderer({ classes, children }) {
	return (
    <div>
      <img className={classes.image} src="https://static.ebates.com/static/fonts/svg/ebates-rakuten.svg" />
      <h1 className={classes.logo}>
        {children}
      </h1>
    </div>
	);
}

LogoRenderer.propTypes = {
	classes: PropTypes.object.isRequired,
	children: PropTypes.node
};

export default Styled(styles)(LogoRenderer);
