import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {AuthScreen} from '../screens/auth_screen';

describe('<AuthScreen/>', () => {
  it('renders correctly', () => {
    render(<AuthScreen onAuthenticate={jest.fn()} />);
  });
  it('the authenticate button is clicked', () => {
    const {getByTestId} = render(<AuthScreen onAuthenticate={jest.fn()} />);
    const authenticateButton = getByTestId('authenticateButton');
    fireEvent.press(authenticateButton);
  });
});
