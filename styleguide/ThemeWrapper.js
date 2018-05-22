import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../src/theme';

export default class ThemeWrapper extends Component {
  render() {
    return (
      <ThemeProvider theme={defaultTheme}>
        {this.props.children}
      </ThemeProvider>
    );
  }
}
