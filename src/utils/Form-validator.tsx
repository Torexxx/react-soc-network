export const required = (value: any) => value ? undefined : 'Required!!';
export const maxLength = (max: any) => (value: any) => value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const number = (value: any) => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

