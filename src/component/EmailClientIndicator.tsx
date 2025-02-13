import { MdMarkEmailRead } from "react-icons/md";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import { useState, useEffect } from "react";

const EmailClientIndicator = () => {
  const [client, setClient] = useState<'gmail' | 'outlook' | null>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, async ([tab]) => {
      const [result] = await chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: () => {
          if (document.querySelector('div[aria-label="Message Body"]')) return 'gmail';
          if (document.querySelector('div[role="textbox"][aria-label="Message body"]')) return 'outlook';
          return null;
        },
      });
      setClient(result.result || null);
    });
  }, []);

  return (
    <div className="flex items-center gap-2">
      {client === 'gmail' ? (
        <MdMarkEmailRead className="w-6 h-6 text-white" />
      ) : client === 'outlook' ? (
        <PiMicrosoftOutlookLogoFill className="w-6 h-6 text-white" />
      ) : (
        <MdMarkEmailRead className="w-6 h-6 text-white" />
      )}
      <span className="text-white font-medium text-sm">
        Simple Email Rewriter {client ? `(${client})` : ''}
      </span>
    </div>
  );
};

export default EmailClientIndicator;