import { registerDecorator, ValidationOptions } from 'class-validator';
import { MatchConstraint } from './match.constraint';

type PropertyKeys<T> = Extract<keyof T, string>;

export function Match<T extends object>(
  property: PropertyKeys<T>,
  validationOptions?: ValidationOptions,
) {
  return function (object: T, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}
