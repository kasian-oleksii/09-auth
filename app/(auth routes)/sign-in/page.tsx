'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api/clientApi';
import { LoginRequest } from '@/types/user';
import { ApiError } from '@/types/error';
import { useAuthStore } from '@/lib/store/authStore';
import css from './SignInPage.module.css';

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as LoginRequest;
      const res = await loginUser(formValues);
      console.log('res', res);
      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
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
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

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
            Log in
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
}
