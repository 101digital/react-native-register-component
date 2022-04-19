type RegistrationClient = {
  customerValidationClient: any;
  userRegistrationClient: any;
};

export class RegistrationService {
  private static _instance: RegistrationService = new RegistrationService();

  private _customerValidationClient?: any;
  private _userRegistrationClient?: any;

  constructor() {
    if (RegistrationService._instance) {
      throw new Error(
        'Error: Instantiation failed: Use RegistrationService.getInstance() instead of new.'
      );
    }
    RegistrationService._instance = this;
  }

  public static instance(): RegistrationService {
    return RegistrationService._instance;
  }

  public initClients = (clients: RegistrationClient) => {
    this._customerValidationClient = clients.customerValidationClient;
    this._userRegistrationClient = clients.userRegistrationClient;
  };

  verifyInviteCode = async (code: string) => {
    if (this._customerValidationClient) {
      const response = await this._customerValidationClient.get(`access-codes/${code}/validation`);
      return response.data;
    } else {
      throw new Error('Registration Customer Client is not registered');
    }
  };

  userRegistration = async (
    inviteCode: string,
    mobileNumber: string,
    firstName: string,
    lastName: string
  ) => {
    if (this._userRegistrationClient) {
      const response = await this._userRegistrationClient.post('users', {
        inviteCode,
        mobileNumber,
        firstName,
        lastName,
      });
      return response.data;
    } else {
      throw new Error('Registration User Client is not registered');
    }
  };

  userVerification = async (activationToken: string, verificationCode: string) => {
    if (this._userRegistrationClient) {
      const response = await this._userRegistrationClient.put(
        `users/verifications/${activationToken}`,
        {
          verificationCode,
        }
      );
      return response.data;
    } else {
      throw new Error('Registration User Client is not registered');
    }
  };

  setUserPassword = async (newPasswordToken: string, password: string) => {
    if (this._userRegistrationClient) {
      const response = await this._userRegistrationClient.post('users/passwords', {
        passwordToken: newPasswordToken,
        password,
      });
      return response.data;
    } else {
      throw new Error('Registration User Client is not registered');
    }
  };
}
