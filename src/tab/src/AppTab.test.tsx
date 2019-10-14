import React from 'react';
import ReactDOM from 'react-dom';
import { AppTab } from './AppTab';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppTab />, div);
  ReactDOM.unmountComponentAtNode(div);
});
