import React from 'react';
import ReactDOM from 'react-dom';
import FeedEdit from './FeedEdit';

it('FeedEdit renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FeedEdit />, div);
});