export const chromeUtils = {
  async getEmailContent() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: () => {
        const composeBox = document.querySelector('div[aria-label="Message Body"]') as HTMLDivElement;
        return composeBox ? composeBox.innerText : null;
      },
    });
    
    if (result[0].result) {
      return result[0].result;
    }
    throw new Error("Compose box not found.");
  },

  async setEmailContent(content: string) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: async (content) => {
        function findGmailComposeBox() {
          const composeBox = document.querySelector('div[aria-label="Message Body"]') as HTMLDivElement;
          const subjectInput = document.querySelector('input[name="subjectbox"]') as HTMLInputElement;
          return { composeBox, subjectInput };
        }

        function sleep(ms: number) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function typeText(element: HTMLElement, text: string) {
          const lines = text.split('\n');
          element.innerHTML = ''; // Clear existing content
          
          for (const line of lines) {
            const div = document.createElement('div');
            element.appendChild(div);
            
            if (line.trim() === '') {
              div.innerHTML = '<br>';
              await sleep(50); // Reduced from 100ms to 50ms for empty lines
              continue;
            }

            // Type each character with a random delay
            for (const char of line) {
              div.textContent += char;
              // Reduced delay: now between 5ms and 15ms (previously 10-30ms)
              await sleep(Math.random() * 10 + 5);
            }
            
            // Shorter pause at the end of each line
            await sleep(25); // Reduced from 50ms to 25ms
          }
        }

        const compose = findGmailComposeBox();
        if (!compose) {
          throw new Error("Compose box not found. Please make sure you're in compose mode.");
        }

        // Parse subject and body
        const lines = content.split('\n');
        let subjectText = '';
        let bodyText = content;

        const subjectIndex = lines.findIndex(line => 
          line.toLowerCase().startsWith('subject:')
        );

        if (subjectIndex !== -1) {
          subjectText = lines[subjectIndex].substring(8).trim();
          bodyText = lines.slice(subjectIndex + 2).join('\n');
        }

        // Set subject if element exists (no animation for subject)
        if (compose.subjectInput && subjectText) {
          compose.subjectInput.value = subjectText;
          compose.subjectInput.dispatchEvent(new Event('input', { bubbles: true }));
          compose.subjectInput.dispatchEvent(new Event('change', { bubbles: true }));
        }

        // Animate the body text
        await typeText(compose.composeBox, bodyText);

        // Final events after animation completes
        compose.composeBox.focus();
        compose.composeBox.dispatchEvent(new Event('input', { bubbles: true }));
        compose.composeBox.dispatchEvent(new Event('change', { bubbles: true }));

        // Simulate final user input
        const inputEvent = new InputEvent('input', {
          bubbles: true,
          cancelable: true,
          composed: true
        });
        compose.composeBox.dispatchEvent(inputEvent);
      },
      args: [content]
    });
  }
};