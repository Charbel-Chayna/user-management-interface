import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { Button } from '../../atoms/Button'; 
import { useAuthStore } from '../../../stores/auth';
import { FaSpinner } from 'react-icons/fa'; 

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { accessToken, setAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate('/home');
    }
  }, [accessToken, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    setLoading(true);
    setError(null); 

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: {
            email,
            password,
          },
        }),
      });

      const data = await response.json();
      console.log("Login response full data:", JSON.stringify(data, null, 2));

      if (response.ok && data.result?.data?.accessToken) {
        const { accessToken, expiresIn } = data.result.data;
        setAuth(accessToken, expiresIn);
      } else {
        setPassword(""); 
        setError(data.result?.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
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

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <Button
          type="submit"
          disabled={loading}
          className="px-6 py-2 mt-4 mx-auto bg-[var(--color-primary)] text-white rounded flex items-center justify-center">
          {loading ? (
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
