import { FormEvent, useState } from 'react';
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface LoginProps {
  errors?: {
    email?: string;
    password?: string;
  };
  status?: string;
}

export default function Login({ errors = {}, status }: LoginProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    router.post('/login', formData, {
      onFinish: () => setLoading(false),
    });
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* 70% - Visual Section with Building Image */}
      <div className="hidden lg:block lg:w-7/10 relative overflow-hidden" style={{ width: '70%' }}>
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{
            backgroundImage: "url('/images/Pamantasan_ng_Cabuyao.jpg')",
            backgroundPosition: 'center',
          }}
        >
          {/* Refined Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/75 via-orange-800/40 to-transparent"></div>
          
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col justify-between p-10 text-white">
          {/* Top - Professional Logo */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white/15 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
              <span className="text-white font-bold text-xl tracking-tight">CCS</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">CCS Profiling System</h1>
              <p className="text-orange-100 text-sm font-medium">Pamantasan ng Cabuyao</p>
            </div>
          </div>

          {/* Bottom - Elegant Tagline */}
          <div className="max-w-xl space-y-4">
            <h2 className="text-5xl font-bold leading-tight tracking-tight">
              Welcome Back
            </h2>
            <p className="text-lg text-white/95 leading-relaxed">
              Access your comprehensive academic management platform
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 pt-4">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-medium">
                Secure Access
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-medium">
                Real-time Data
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-medium">
                24/7 Available
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 30% - Refined Login Form Section */}
      <div className="w-full lg:w-3/10 flex items-center justify-center bg-white p-8 lg:p-12 relative" style={{ width: '30%' }}>
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-8 left-8">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">CCS</span>
          </div>
        </div>

        <div className="w-full max-w-md space-y-8">
          {/* Professional Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-xl mb-4 transform hover:scale-105 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Sign In</h2>
            <p className="text-gray-600 text-sm">Enter your credentials to continue</p>
          </div>

          {/* Status Message */}
          {status && (
            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-xl shadow-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-green-800 font-medium">{status}</p>
              </div>
            </div>
          )}

          {/* Refined Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              placeholder="you@example.com"
              required
              autoComplete="email"
              autoFocus
            />

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                  className="h-4 w-4 text-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 border-gray-300 rounded transition-all"
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 font-medium transition-colors">
                  Remember me
                </span>
              </label>

              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-3.5 text-base font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              loading={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">New to CCS?</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="font-bold text-orange-600 hover:text-orange-700 transition-colors inline-flex items-center gap-1 group"
              >
                Create one
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </p>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-center text-gray-500 leading-relaxed pt-4">
            Protected by enterprise-grade security. By signing in, you agree to our{' '}
            <a href="#" className="text-orange-600 hover:text-orange-700 font-medium underline">Terms</a>
            {' '}and{' '}
            <a href="#" className="text-orange-600 hover:text-orange-700 font-medium underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
