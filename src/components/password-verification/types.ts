import { ReactNode } from 'react';
import { ErrorData } from 'react-native-theme-component';
import { ErrorData, InputFieldStyles, CheckBoxStyles } from 'react-native-theme-component';

export type PasswordVerificationRef = {
  updateCountryCode: (code: string) => void;
};

export type PasswordVerificationProps = {
  Root: {
    style?: LoginComponentStyles;
    props: {
      formatError?: (error: string) => string;
      genericError?: (error: Error) => ErrorData;
      onPress: (data: any) => void;
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

export type InputFormStyles = {
  passwordInputFieldStyle?: InputFieldStyles;
  checkBoxInputFieldStyle?: CheckBoxStyles;
};
