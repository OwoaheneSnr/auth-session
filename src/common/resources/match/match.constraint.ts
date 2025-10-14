import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'MatchAdvanced', async: false })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;

    const relatedValue = (args.object as any)[relatedPropertyName];

    return value === relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `El campo ${args.property} debe coincidir con el campo ${relatedPropertyName}.`;
  }
}
