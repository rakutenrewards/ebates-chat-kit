import React from 'react';
import PropTypes from 'prop-types';

export default class Chat extends React.Component {
  static propTypes = {
    /** Description of prop "foo". */
    foo: PropTypes.number,
    /** Description of prop "baz". */
    baz: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }

  render() {
    return (
      <div>
      Helloe World! Foooo
      </div>
    );
  }
}
