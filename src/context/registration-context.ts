// import moment from 'moment';
// import { AccountDetailsData } from './../components/account-details-component/model';
// import { OtherDetailsData } from './../components/other-details-component/model';
import React, { useCallback, useMemo, useState } from 'react';
// import { AddressDetailsData } from '../components/address-detail-component/model';
// import { MainDetailsData } from '../components/main-detail-component/model';
// import { NationalityData } from '../components/nationality-component/model';
import { RegistrationService } from '../service/registration-service';
// import { RegistrationData  } from '../types';

// const onboardingService = RegistrationService.instance();

export interface RegistrationContextData {
  validate: () => void;
  register: () => void;
  otpVerification: () => void;
  addUserPassword: () => void;
  isValidate: boolean;
  isValidating: boolean;
  errorValidate?: Error;

  validateToken?: string;
  passwordToken?: string;
  activationToken?: string;
  userMobileNumber?: string;

  isRegister: boolean;
  isRegistering: boolean;
  errorRegister?: Error;

  isVerify: boolean;
  isVerification: boolean;
  errorUserVerify?: Error;

  isPassword: boolean;
  isSetPassword: boolean;
  errorSetPassword?: Error;

  clearValidateError: () => void;
  clearRegisterError: () => void;
  clearUserVerificationError: () => void;
  clearSetPasswordError: () => void;
}

export const registrationDefaultValue: RegistrationContextData = {
  validate: async () => undefined,
  register: async () => undefined,
  otpVerification: async () => undefined,
  addUserPassword: async () => undefined,
  isValidate: false,
  isValidating: false,
  errorValidate: undefined,

  validateToken: undefined,
  passwordToken: undefined,
  activationToken: undefined,
  userMobileNumber: undefined,

  isRegister: false,
  isRegistering: false,
  errorRegister: undefined,

  isVerify: false,
  isVerification: false,
  errorUserVerify: undefined,

  isPassword: false,
  isSetPassword: false,
  errorSetPassword: undefined,

  clearValidateError: () => null,
  clearRegisterError: () => null,
  clearUserVerificationError: () => null,
  clearSetPasswordError: () => null,
};

export const RegistrationContext =
  React.createContext<RegistrationContextData>(registrationDefaultValue);

export function useRegistrationContextValue(): RegistrationContextData {
  const [_isValidating, setIsValidating] = useState<boolean>(false);
  const [_errorValidate, setErrorValidate] = useState<Error | undefined>();
  const [_isValidate, setIsValidate] = useState<boolean>(false);
  const [_validateToken, setValidateToken] = useState<string>('');

  const [_isRegistering, setIsRegistering] = useState<boolean>(false);
  const [_errorRegister, setErrorRegister] = useState<Error | undefined>();
  const [_isRegister, setIsRegister] = useState<boolean>(false);
  const [_passwordToken, setPasswordToken] = useState<string>('');
  const [_activationToken, setActivationToken] = useState<string>('');
  const [_userMobileNumber, setUserMobileNumber] = useState<string>('');

  const [_isVerify, setIsVerify] = useState<boolean>(false);
  const [_errorUserVerify, setErrorUserVerify] = useState<Error | undefined>();
  const [_isVerification, setIsVerification] = useState<boolean>(false);

  const [_isPassword, setIsPassword] = useState<boolean>(false);
  const [_errorSetPassword, setErrorSetPassword] = useState<Error | undefined>();
  const [_isSetPassword, setIsSetPassword] = useState<boolean>(false);

  const validate = useCallback(async (code: string) => {
    try {
      setIsValidating(true);
      const { data } = await RegistrationService.instance().verifyInviteCode(code);
      setIsValidate(true);
      setIsValidating(false);
      setValidateToken(data.token);
      return true;
    } catch (error) {
      setIsValidating(false);
      setErrorValidate(error as Error);
      setValidateToken('');
      return undefined;
    }
  }, []);

  const register = useCallback(
    async (inviteCode: string, mobileNumber: string, firstName: string, lastName: string) => {
      try {
        setIsRegistering(true);
        const data = await RegistrationService.instance().userRegistration(
          inviteCode,
          mobileNumber,
          firstName,
          lastName
        );

        setUserMobileNumber(mobileNumber);

        setPasswordToken(data.passwordToken);
        setActivationToken(data.activationToken);
        setIsRegister(true);
        setIsRegistering(false);
        return true;
      } catch (error) {
        setIsRegistering(false);
        setErrorRegister(error as Error);
        return undefined;
      }
    },
    []
  );

  const otpVerification = useCallback(async (activationToken: string, verificationCode: string) => {
    try {
      setIsVerify(true);
      const data = await RegistrationService.instance().userVerification(
        activationToken,
        verificationCode
      );
      if (data.passwordToken) {
        setPasswordToken(data.passwordToken);
      }

      setIsVerification(true);
      setIsVerify(false);

      return true;
    } catch (error) {
      setIsVerify(false);
      setErrorUserVerify(error as Error);
      return undefined;
    }
  }, []);

  const addUserPassword = useCallback(async (passwordToken: string, password: string) => {
    try {
      setIsPassword(true);
      await RegistrationService.instance().setUserPassword(passwordToken, password);
      setIsSetPassword(true);
      setIsPassword(false);

      return true;
    } catch (error) {
      setIsPassword(false);
      setErrorSetPassword(error as Error);
      return undefined;
    }
  }, []);

  const clearValidateError = useCallback(() => {
    setErrorValidate(undefined);
  }, []);

  const clearRegisterError = useCallback(() => {
    setErrorRegister(undefined);
  }, []);

  const clearUserVerificationError = useCallback(() => {
    setErrorUserVerify(undefined);
  }, []);

  const clearSetPasswordError = useCallback(() => {
    setErrorSetPassword(undefined);
  }, []);

  return useMemo(
    () => ({
      validate,
      register,
      otpVerification,
      addUserPassword,
      clearValidateError,
      clearRegisterError,
      clearUserVerificationError,
      clearSetPasswordError,
      isValidate: _isValidate,
      isValidating: _isValidating,
      errorValidate: _errorValidate,
      isRegister: _isRegister,
      isRegistering: _isRegistering,
      errorRegister: _errorRegister,
      isVerify: _isVerify,
      isVerification: _isVerification,
      errorUserVerify: _errorUserVerify,
      isPassword: _isPassword,
      isSetPassword: _isSetPassword,
      errorSetPassword: _errorSetPassword,
      validateToken: _validateToken,
      passwordToken: _passwordToken,
      activationToken: _activationToken,
      userMobileNumber: _userMobileNumber,
    }),

    [
      _isValidate,
      _isValidating,
      _errorValidate,
      _isRegister,
      _isRegistering,
      _errorRegister,
      _isVerify,
      _isVerification,
      _errorUserVerify,
      _isPassword,
      _isSetPassword,
      _errorSetPassword,
      _validateToken,
      _passwordToken,
      _activationToken,
      _userMobileNumber,
      validate,
      register,
      otpVerification,
      addUserPassword,
      clearValidateError,
      clearRegisterError,
      clearUserVerificationError,
      clearSetPasswordError,
    ]
  );
}
