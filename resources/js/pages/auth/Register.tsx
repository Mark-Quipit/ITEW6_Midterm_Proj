import { FormEvent, useState } from 'react';
import { router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface RegisterProps {
  errors?: {
    name?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
  };
}

export default function Register({ errors = {} }: RegisterProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    router.post('/register', formData, {
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
              Join Our Community
            </h2>
            <p className="text-lg text-white/95 leading-relaxed">
              Create your account and unlock powerful academic management tools
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 pt-4">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-medium">
                Easy Setup
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-medium">
                Instant Access
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm font-medium">
                Full Features
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 30% - Refined Registration Form Section */}
      <div className="w-full lg:w-3/10 flex items-center justify-center bg-white p-8 lg:p-12 relative overflow-y-auto" style={{ width: '30%' }}>
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-8 left-8">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">CCS</span>
          </div>
        </div>

        <div className="w-full max-w-md space-y-7 my-8">
          {/* Professional Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-xl mb-4 transform hover:scale-105 transition-transform">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Create Account</h2>
            <p className="text-gray-600 text-sm">Fill in your details to get started</p>
          </div>

          {/* Refined Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
              placeholder="John Doe"
              required
              autoComplete="name"
              autoFocus
            />

            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={errors.password}
              placeholder="••••••••"
              required
              autoComplete="new-password"
              helperText="Min. 8 characters"
            />

            <Input
              label="Confirm Password"
              type="password"
              value={formData.password_confirmation}
              onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
              error={errors.password_confirmation}
              placeholder="••••••••"
              required
              autoComplete="new-password"
            />

            <div className="flex items-start pt-2">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  checked={formData.terms}
                  onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                  className="h-4 w-4 text-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 border-gray-300 rounded transition-all"
                  required
                />
              </div>
              <div className="ml-3">
                <label className="text-xs text-gray-700 leading-relaxed">
                  I agree to the{' '}
                  <a href="#" className="font-semibold text-orange-600 hover:text-orange-700 underline">
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="#" className="font-semibold text-orange-600 hover:text-orange-700 underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
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
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">Already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              <Link
                href="/login"
                className="font-bold text-orange-600 hover:text-orange-700 transition-colors inline-flex items-center gap-1 group"
              >
                Sign in instead
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </p>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-center text-gray-500 leading-relaxed pt-2">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-orange-600 hover:text-orange-700 font-medium underline">Terms</a>
            {' '}and{' '}
            <a href="#" className="text-orange-600 hover:text-orange-700 font-medium underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
