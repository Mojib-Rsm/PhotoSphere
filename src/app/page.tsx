
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Camera, Loader2, LogIn, Zap, Album, Share2 } from 'lucide-react';

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
    <div className="bg-background">
      <main>
        <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://placehold.co/1920x1080.png"
                    alt="Photo gallery background"
                    fill
                    data-ai-hint="photo gallery collage"
                    className="object-cover"
                    priority
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

        <section id="features" className="py-20 md:py-32">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
                    PhotoSphere offers powerful features to make managing your photos a joy.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md border">
                        <div className="p-4 bg-primary/20 rounded-full mb-4">
                            <Zap className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Smart Organization</h3>
                        <p className="text-muted-foreground">Let AI help you automatically tag and categorize your photos, so you can find anything in an instant.</p>
                    </div>
                    <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md border">
                        <div className="p-4 bg-primary/20 rounded-full mb-4">
                            <Album className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Beautiful Albums</h3>
                        <p className="text-muted-foreground">Create stunning albums with just a few clicks. Our AI can even suggest names and descriptions for you.</p>
                    </div>
                    <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md border">
                        <div className="p-4 bg-primary/20 rounded-full mb-4">
                            <Share2 className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
                        <p className="text-muted-foreground">Share your favorite moments with friends and family through secure, private links.</p>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} PhotoSphere. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
