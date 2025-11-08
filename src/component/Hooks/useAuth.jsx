import React, { use} from 'react';
import { AuthContext } from '../Context and Provider/Context';

const useAuth = () => {
  const authInfo = use(AuthContext)
  return authInfo;
};

export default useAuth;