import RegestarionForm from "@/app/components/RegistrationForm";
import { UserSchema, UserSchemaType } from '@/app/UserSchema';

const onFormAction = async(prevState: {
  message: string;
  user?: UserSchemaType;
  issues?: string[];
}, formData: FormData) => {
  'use server';

  const data = Object.fromEntries(formData);
  const verified = await UserSchema.safeParseAsync(data);

  if (verified.success) {
      return {message: 'User registered', user: verified.data }
  } else {
      return {
        message: 'Invalid data', 
        issues: verified.error.issues.map(issue => issue.message)
      }
    };
}

export default function Home() {
  return (
    <div className="mx-auto max-w-xl py-[100px]">
      <RegestarionForm onFormAction={onFormAction} />
    </div>      
  );
}
