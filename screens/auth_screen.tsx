import React from 'react';
import {Auth} from '../components/auth';

import {IAuth} from '../types';

export const AuthScreen = ({onAuthenticate}: IAuth) => {
  return <Auth onAuthenticate={onAuthenticate} />;
};
