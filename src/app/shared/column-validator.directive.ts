import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const minmaxValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const min = control.get('min');
  const max = control.get('max');
  //console.log(" in validator");
  const invalid = min?.value > max?.value;
  //console.log(invalid);
  //console.log(max);
  //console.log(max?.value);
  return (min && max && invalid) ? { numRangeInvalid: true } : null;
};

export const minmaxLengthValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const min = control.get('minLength');
  const max = control.get('maxLength');
  //console.log(" in validator");
  const invalid = min?.value > max?.value;
  //console.log(invalid);
  return (min && max && invalid) ? { numLengthRangeInvalid: true } : null;
};

export const defaultValueTypeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const type = control.get('type');
  const defValue = control.get('defaultValue');
 // console.log(" in validator");
  let valid = false;
  let rangeNumberError = false;
  let rangeStringError = false;
  let typeError = false;
  if(type?.value == "STRING") {
    valid = (typeof (defValue?.value + "")) == "string"
    if(valid) {
      let len = defValue?.value.length;
      if (len < 2 || len > 8)
        rangeStringError = true;
    }
  }

  else if(type?.value == "NUMBER") {
    //console.log("in  Number");
    //console.log(defValue?.value);
    valid = !isNaN(Number(defValue?.value + ""));
    //console.log(valid);
    if(valid){
      let num = Number(defValue?.value + "")
      if(num < 10 || num > 50)
        rangeNumberError = true
    }

  }

  else if(type?.value == "BOOLEAN") {
    valid =  (defValue?.value + "") == "true" || (defValue?.value + "") == "false"
  }
  typeError = !valid;
  return (type && defValue && (typeError || rangeNumberError || rangeStringError) ) ? { defValueTypeInvalid: typeError,
                                            rangeNumberError : rangeNumberError,
                                            rangeStringError : rangeStringError} : null;
};
