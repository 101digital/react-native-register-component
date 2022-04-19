import * as Yup from 'yup';

export class InviteCodeData {
  constructor(readonly code: string) {}

  static empty(): InviteCodeData {
    return new InviteCodeData('');
  }
}
export const InviteCodeSchema = Yup.object().shape({
  code: Yup.string().trim().required('Please enter invite code'),
});
