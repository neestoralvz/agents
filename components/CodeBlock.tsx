'use client'

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const copyToClipboard = async () => {
    if (codeRef.current) {
      const code = codeRef.current.textContent || '';
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="relative">
      <pre className={className}>
        <code ref={codeRef}>{children}</code>
      </pre>
      <Button
        className="absolute top-2 right-2"
        size="sm"
        onClick={copyToClipboard}
      >
        {isCopied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default CodeBlock;