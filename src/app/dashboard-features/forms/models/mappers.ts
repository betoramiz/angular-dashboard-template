import { BackendDto, FormValueType } from './form-models';

const toBackendDto = (formValue: FormValueType): BackendDto => {
  return {
    name: formValue.name,
    email: formValue.email,
  }
}

export {
  toBackendDto
}
