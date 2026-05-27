import { BackendDto, FormValueControls, FormValueType } from './form-models';

const toBackendDto = (formValue: FormValueType): BackendDto => {
  return {
    name: formValue.name,
    email: formValue.email,
  }
}

const toFormValueTypes = (formValueControl: FormValueControls): FormValueType => {
  return {
    name: formValueControl.name.value,
    email: formValueControl.email.value,
  }
}

export {
  toBackendDto,
  toFormValueTypes,
}
