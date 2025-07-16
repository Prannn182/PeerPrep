import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
interface FormFieldProps<T extends FieldValues>{
    name: Path<T>,
    control: Control<T>,
    label: string,
    placeholder?:string,
    type?:'text' |'email'|'password'|'file'

}
const Formfeild = ({control,name,label,placeholder,type="text"}:FormFieldProps<T>) => (
     <Controller
     control={control} 
     name={name} 
    render={({ field })=>(
      <FormItem>
              <FormLabel className='label'>{label}</FormLabel>
              <FormControl>
                <Input className='input' placeholder={placeholder} type={type} {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
     )}
        />
);

export default Formfeild
