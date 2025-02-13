import { useState, useEffect } from "react";
import { fetchRewrittenContent } from "../services/api";
import { chromeUtils } from "../utils/chromeUtils";

export const useEmailRewriter = (selectedStyle: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<string | null>(null);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "SET_COMPOSE_CONTENT") {
        console.log("Content updated:", message.content);
      }
    });
  }, []);

  const handleRewrite = async () => {
    setIsLoading(true);
    setProgress("Accessing email content...");
    try {
      const emailContent = await chromeUtils.getEmailContent();
      if (emailContent) {
        setProgress("Rewriting email...");
        const rewrittenContent = await fetchRewrittenContent(emailContent, selectedStyle);
        await chromeUtils.setEmailContent(rewrittenContent);
        setProgress("Email rewritten successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
      setProgress(`Error: ${(error as Error).message || 'An unknown error occurred'}`);
      alert((error as Error).message || 'An unknown error occurred');
    } finally {
      setIsLoading(false);
      setTimeout(() => setProgress(null), 3000);
    }
  };

  return { isLoading, progress, handleRewrite };
};