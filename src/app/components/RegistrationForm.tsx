'use client';

//commented code lines are for the client-side data submition, the current version is on the server side with form action method
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { UserSchema, UserSchemaType } from '@/app/UserSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios from 'axios';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRef, useState, useActionState } from 'react';

type RegestarionFormProps = {
    onFormAction: (prevState: {
        message: string;
        user?: UserSchemaType;
        issues?: string[];
      }, formData: FormData) => Promise<{
        message: string;
        user?: UserSchemaType;
        issues?: string[];
    }>
}

const RegestarionForm = ({ onFormAction }: RegestarionFormProps ) => {
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    const [state, formAction] = useActionState(onFormAction, {message: ''});

    const form = useForm<UserSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(UserSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            zipcode: '',
        }
    });

    const { handleSubmit, control } = form;

    // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    //     setIsLoading(true);
    //     try {   
    //         await axios.post('/api/registration', data);
    //     } catch(error) {
    //         throw new Error(`Something went wrong: ${error}`);
    //     } finally {
    //         form.reset();
    //         setIsLoading(false);
    //     }
    // }


    const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form {...form}> 
        {/* <form onSubmit={handleSubmit(onSubmit)} className='space-y-3 rounded border p-4'> */}
        <div className='text-green-500'>{state?.message}</div>
        <form  
            ref={formRef}
            action={formAction}
            onSubmit={handleSubmit(() => formRef?.current?.submit())}
            className='space-y-3 rounded border p-4'>
        <FormField name='name' control={control} render={({ field }) => (
            <FormItem> 
                <FormLabel>Full name: </FormLabel>
                <FormControl> 
                    <Input 
                        {...field} 
                        placeholder='ex.:Jonh Doe'
                        type='text'
                        className='rounded'/>
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <FormField name='email' control = {control} render={({ field }) => (
            <FormItem> 
                <FormLabel>Email: </FormLabel>
                <FormControl> 
                    <Input 
                        {...field} 
                        placeholder='ex.:johndoe@mail.com'
                        type='email' />
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <FormField name='password' control = {control} render={({ field }) => (
            <FormItem> 
                <FormLabel>Password: </FormLabel>
                <FormControl> 
                    <Input {...field} type='password' />
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
         <FormField name='zipcode' control = {control} render={({ field }) => (
            <FormItem> 
                <FormLabel>Zipcode: </FormLabel>
                <FormControl> 
                    <Input {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <Button type='submit' variant='outline' className='w-full'>Submit</Button>
        </form>
    </Form>
  );
};

export default RegestarionForm;