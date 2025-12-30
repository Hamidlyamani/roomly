"use client"


import { useRef, useState } from "react";
import { Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ChatInput = () => {

    const inputRef = useRef(null);
  const router = useRouter();

  const handleSend = () => {
    const value = inputRef.current.value.trim();

    if (!value) return;

    router.push(`/recommandation_IA?query=${encodeURIComponent(value)}`);
  };
  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Trial Banner */}
      <div className="flex items-center justify-between flex-col mb-4 px-4 py-4 rounded-3xl bg-gradient-to-r from-orange-100 via-rose-100 to-purple-200">
        <div className="flex w-full justify-between text-center gap-2 px-1 text-sm text-muted-foreground pb-2">
          <span>Parle-nous de ton besoin, l’IA s’occupe du reste</span>
          <Link href="#" className="flex items-center gap-1 text-sm font-medium  hover:text-primary/80 transition-colors">
           Ou tout voir
            <span className="text-xs">→</span>
          </Link>
       
        </div>


        <div className="w-full outline-none outline rounded-2xl shadow-soft p-2 flex gap-4 bg-white">
          <input
            type="text"
            placeholder="Ville, budget, université… dis-nous tout"
             ref={inputRef}
            className="w-full bg-transparent  placeholder:text-muted-foreground  outline-none text-base "
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">

              <button
              onClick={handleSend}
                className="rounded-full gap-2 flex items-center text-white gradiantButton  p-2 text-primary-foreground"
              >
                <Send className="w-4 h-4" />
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Input Container */}



    </div>
  );
};

export default ChatInput;