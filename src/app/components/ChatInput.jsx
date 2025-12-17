"use client"


import { useState } from "react";
import { Paperclip, Sparkles, Mic, Send } from "lucide-react";

const ChatInput = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Trial Banner */}
      <div className="flex items-center justify-between mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 via-rose-50 to-purple-50">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-primary" />
          </div>
          <span>Free Trial ending soon continue your workflow</span>
        </div>
        <button className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          Upgrade Now
          <span className="text-xs">→</span>
        </button>
      </div>

      {/* Input Container */}
      <div className=" border border-border rounded-2xl shadow-soft p-4">
        {/* Text Input */}
        <input
          type="text"
          placeholder="Ask me anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base mb-4"
        />

        {/* Actions Row */}
        <div className="flex items-center justify-between">
          {/* Left Actions */}
          <div className="flex items-center gap-2">
           
            <button
              variant="outline"
              size="sm"
              className="rounded-full gap-2 text-muted-foreground hover:text-foreground"
            >
              <Sparkles className="w-4 h-4" />
              Start Your Journey
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button
              variant="outline"
              size="sm"
              className="rounded-full gap-2 text-muted-foreground hover:text-foreground"
            >
              <Mic className="w-4 h-4" />
              Voice
            </button>
            <button
              size="sm"
              className="rounded-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-center text-xs text-muted-foreground mt-3">
        Roomly can make mistakes. Check important info.
      </p>
    </div>
  );
};

export default ChatInput;