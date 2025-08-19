"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Camera, Loader2 } from 'lucide-react';

export default function Home() {
  const { user, login, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // We only want to redirect if loading is false and user is authenticated.
    if (!loading && user) {
      router.push('/photos');
    }
  }, [user, loading, router]);

  // While firebase is checking auth state, show a loader
  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4">
            <Loader2 className="h-24 w-24 animate-spin text-primary" />
        </div>
    );
  }

  // If the user is logged in, useEffect will redirect, so we can return null.
  if (user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-center p-4">
      <div className="mb-8">
        <Camera className="h-24 w-24 text-primary" />
      </div>
      <h1 className="text-5xl font-bold font-headline mb-4">Welcome to PhotoSphere</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mb-8">
        Your personal photo gallery, beautifully organized. Connect with your Google Photos to relive your best moments.
      </p>
      <Button size="lg" onClick={login}>
        Login with Google to Get Started
      </Button>
    </div>
  );
}
