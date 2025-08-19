"use client";

import { withAuth } from "@/components/auth/with-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { Image as ImageIcon, LogOut } from "lucide-react";

function SettingsPage() {
  const { user, login, logout } = useAuth();

  return (
    <main className="flex-1 p-4 md:p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Google Photos Integration</CardTitle>
          <CardDescription>
            {user
              ? "You are connected to Google Photos."
              : "Connect your Google Photos account to import and manage your photos directly within PhotoSphere."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {user ? (
            <div className="flex items-center gap-4">
                <p>Connected as {user.displayName} ({user.email})</p>
                <Button variant="outline" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Disconnect
                </Button>
            </div>
          ) : (
            <Button onClick={login}>
              <ImageIcon className="mr-2 h-4 w-4" />
              Connect to Google Photos
            </Button>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

function AuthSettingsPage(props: any) {
    const Component = withAuth(SettingsPage);
    return <Component {...props} />
}

export default AuthSettingsPage;
