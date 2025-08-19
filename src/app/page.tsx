
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Camera, Loader2, LogIn } from 'lucide-react';

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
  // This prevents the login UI from flashing briefly for logged-in users.
  if (user) {
    return null;
  }

  // If we are not loading and there is no user, show the login page.
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
            <Image
                src="https://placehold.co/1920x1080.png"
                alt="Photo gallery background"
                fill
                data-ai-hint="photo gallery collage"
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center text-white p-4 max-w-4xl">
            <div className="mb-6 border-4 border-primary/50 rounded-full p-4 bg-primary/20 backdrop-blur-sm">
                <Camera className="h-20 w-20 text-primary-foreground" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-shadow" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}>
                Welcome to PhotoSphere
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mb-10">
                Your personal photo gallery, beautifully organized. Connect with your Google Photos to relive your best moments, all in one place.
            </p>
            <Button size="lg" onClick={login} className="text-lg py-7 px-10 bg-primary/90 hover:bg-primary border border-primary-foreground/50">
                <LogIn className="mr-3 h-6 w-6" />
                Login with Google to Get Started
            </Button>
        </div>
    </div>
  );
}
