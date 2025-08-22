import * as yup from 'yup';
import { ErrorForm } from './error';

export const schemaTest = {
  isIncludedLetter: (value: string) => !!value?.match(/[a-z]/g),
  isIncludedCapitalLetter: (value: string) => !!value?.match(/[A-Z]/g),
  isIncludedNumber: (value: string) => !!value?.match(/[0-9]/g),
  isIncludedSymbol: (value: string) =>
    !!value?.match(/[-._!"`'#%&,:;<>=@{}~$()*+/\\?[\]^|]+/g),
  isValidPassword: (value: string) => {
    const passed = [];
    if (value.length >= 8) {
      passed.push('safeLength');
    }
    if (schemaTest.isIncludedLetter(value)) {
      passed.push('isIncludedLetter');
    }
    if (schemaTest.isIncludedCapitalLetter(value)) {
      passed.push('isIncludedCapitalLetter');
    }
    if (schemaTest.isIncludedNumber(value)) {
      passed.push('isIncludedNumber');
    }
    if (schemaTest.isIncludedSymbol(value)) {
      passed.push('isIncludedSymbol');
    }
    return {
      isValid: passed.length === 5,
      passed,
    };
  },
  isValidUsername: (value: string) =>
    !value ? true : !!value?.match(/^[a-z0-9]+(?:[a-z0-9]+)*$/g),
  isValidAlias: (value: string) =>
    !value
      ? true
      : !!value?.match(/^(?!-)([A-Za-z0-9-](?!.*--)){0,62}[A-Za-z0-9]$/g),
  isValidEmail: (value: string) =>
    !value
      ? true
      : !!value?.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
        ),
  isValidGoogleMapUrl: (value: string) =>
    !value
      ? true
      : !!value?.match(
          /^(https:\/\/)(goo\.gl|google\.com)\/maps\/([^\s\\]+)$/g
        ),
  isValidDomain: (value: string) =>
    !!value.match(
      /^(((?!-)[A-Za-z0-9-]{0,62}[A-Za-z0-9])\.)+((?!-)[A-Za-z0-9-]{1,62}[A-Za-z0-9])(\.)?$/g
    ),
  isValidUrl: (value: string) =>
    !value
      ? true
      : !!value?.match(
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
        ),
};

export const ChangePasswordSchema = yup.object().shape({
  password: yup.string().required(ErrorForm.Required),
  newPassword: yup.string().required(ErrorForm.Required),
  passwordConf: yup
    .string()
    .oneOf([yup.ref('newPassword'), undefined], ErrorForm.PasswordNotSame)
    .required(ErrorForm.Required),
});
