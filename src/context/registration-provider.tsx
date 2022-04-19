import React, { ReactNode } from 'react';
import { useRegistrationContextValue, RegistrationContext } from './registration-context';

export type RegistrationProviderProps = {
  children: ReactNode;
};

const RegistrationProvider = (props: RegistrationProviderProps) => {
  const { children } = props;
  const onboardingContextData = useRegistrationContextValue();

  return (
    <RegistrationContext.Provider value={onboardingContextData}>
      {children}
    </RegistrationContext.Provider>
  );
};

export default RegistrationProvider;
