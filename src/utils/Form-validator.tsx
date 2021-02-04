export type FieldValidatorType = (value: string) => string | undefined;

export const required: FieldValidatorType = (value) => value ? undefined : 'Required!!';
export const maxLength = (max: number): FieldValidatorType => (value) => value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const number: FieldValidatorType = (value) => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

