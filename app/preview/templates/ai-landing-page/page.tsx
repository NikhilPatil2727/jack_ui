import React from "react";
import AILandingPage from "@/components/jackui/templates/ai-landing-page";

export default function AIPreviewPage() {
  return (
    <main className="w-full min-h-screen bg-background">
      <AILandingPage previewMode={false} />
    </main>
  );
}
