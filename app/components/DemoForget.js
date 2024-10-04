import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8080/api/request-reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send reset email');
      }

      toast.success('Password reset link sent!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          placeholder="Enter your email"
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
