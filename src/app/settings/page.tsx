"use client";

import { withAuth } from "@/components/auth/with-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";

function SettingsPage() {

  const handleConnect = () => {
    // Placeholder for Google Photos connection logic
    alert("Connecting to Google Photos...");
  };

  return (
    <main className="flex-1 p-4 md:p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Google Photos Integration</CardTitle>
          <CardDescription>
            Connect your Google Photos account to import and manage your photos directly within PhotoSphere.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleConnect}>
            <ImageIcon className="mr-2 h-4 w-4" />
            Connect to Google Photos
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

export default withAuth(SettingsPage);
