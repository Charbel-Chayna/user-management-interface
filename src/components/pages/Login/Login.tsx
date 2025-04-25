import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa';
import { Button } from '../../atoms/Button';
import { useAuthStore } from '../../../stores/auth';

interface LoginPayload {
  email: string;
  password: string;
}

const loginUser = async ({ email, password }: LoginPayload) => {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok || data.result?.message !== 'success') {
    throw new Error('Invalid credentials');
  }

  return data.result.data;
};

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { accessToken, setAuth } = useAuthStore();
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ accessToken, expiresIn }) => {
      setAuth(accessToken, expiresIn);
      navigate('/dashboard');
    },
    onError: () => {
      setPassword('');
      setErrorMessage('Invalid credentials');
    }
  });

  useEffect(() => {
    if (accessToken) {
      navigate('/dashboard');
    }
  }, [accessToken, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage('Please enter your email.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }
    setErrorMessage(null);

    login({ email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="p-6 bg-white rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all duration-200"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative flex items-center">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all duration-200"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-600 text-2xl flex items-center justify-center"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}

        <Button
          type="submit"
          disabled={isPending}
          className="px-6 py-2 mt-4 mx-auto bg-[var(--color-primary)] text-white rounded flex items-center justify-center"
        >
          {isPending ? (
            <>
              <FaSpinner className="animate-spin mr-2 text-xl" />
              Loading...
            </>
          ) : (
            'Login'
          )}
        </Button>
      </form>
    </div>
  );
};
