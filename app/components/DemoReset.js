import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const { token } = useParams();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:8080/api/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: data.password }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }

      toast.success('Password reset successful!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="password"
          {...register('password', { required: 'Password is required' })}
          placeholder="Enter new password"
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
