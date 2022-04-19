import * as Yup from 'yup';
import { i18n } from '@/translations/translation-config';

export class ResetPasswordData {
  constructor(readonly password: string, readonly confirmPassword: string) {}

  static empty(): ResetPasswordData {
    return new ResetPasswordData('', '');
  }
}
/* eslint-disable no-useless-escape */
export const ResetPasswordSchema = Yup.object().shape({
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref('password')], i18n.t('password_verification.val_enter_valid_password'))
    .required(i18n.t('password_verification.val_enter_valid_password')),
});
