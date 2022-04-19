import { ReactNode } from 'react';
import { ErrorData } from 'react-native-theme-component';

export type UsernameCapturingComponentRef = {
  updateCountryCode: (code: string) => void;
};

export type UsernameCapturingScreenProps = {
  Root: {
    style?: LoginComponentStyles;
    props: {
      formatError?: (error: string) => string;
      genericError?: (error: Error) => ErrorData;
      onPress: () => void;
      onPressBack: () => void;
    };
    components?: {
      header?: ReactNode;
      footer?: ReactNode;
      renderRegisterButton?: () => React.ReactElement | null;
    };
  };
  InputForm?: {
    style?: InputFormStyles;
    props?: {
      initialSignInData?: SignInData;
      type?: 'phonenumber' | 'email';
      validationSchema?: any;
      onPressDialCode?: () => void;
    };
    component?: {
      usernameIcon?: ReactNode;
    };
  };
};
