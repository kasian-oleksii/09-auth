'use client';
import { useRouter } from 'next/navigation';
import { RegisterRequest } from '@/types/user';
import { register } from '@/lib/api/clientApi';
import { useState } from 'react';
import { ApiError } from '@/types/error';
import css from './SignUpPage.module.css';
import { useAuthStore } from '@/lib/store/authStore';

const Register = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleSRegister = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(data);
      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('invalid email or password');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.message ??
          (error as ApiError).message ??
          'Oops... some error',
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleSRegister} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
};

export default Register;
