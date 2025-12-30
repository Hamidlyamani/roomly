"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaRobot, FaUser } from "react-icons/fa";
import { useSearchParams } from "next/navigation";



export const noFooter = true;
export default function AIRecommandationPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const hasSentRef = useRef(false);



  const sendMessage = (text) => {
    const messageText = typeof text === "string" ? text : input;

    if (!messageText || !messageText.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: messageText }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: `Merci ! Je traite ta demande : "${messageText}". Je te prépare des recommandations`,
        },
      ]);
    }, 700);

    setInput("");
  };


  // 🔥 Auto-send si query existe
  useEffect(() => {
    if (query && !hasSentRef.current) {
      hasSentRef.current = true; // ✅ bloque le 2e run

      const decoded = decodeURIComponent(query);
      setInput(decoded);
      sendMessage(decoded);
    }
  }, [query]);



  return (
    <div className="flex flex-col h-[90%] bg-gray-50">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-10">

          {messages.length === 0 && (
            <div className="flex flex-col items-center text-center mt-20">
              <div className="flex justify-center items-center gap-4"> <Image src="/imgs/logo.png" alt='rommly' width={0}
                height={0}
                sizes="100vw"
                className="w-24 h-auto" />
                X
                <div className="w-12 h-12 flex items-center justify-center bg-prim text-white rounded-2xl text-3xl shadow-lg">

                  <FaRobot />
                </div>
              </div>
              <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
                Assistant RoomlyIA Logement
              </h1>

              <p className="mt-2 max-w-md text-gray-600">
                Dis-moi ce que tu cherches : ville, budget, type de logement...
                Je m’occupe du reste. 
              </p>
            </div>
          )}

          {/* --- MESSAGES (après démarrage) --- */}
          <div className="space-y-4 mt-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : ""
                  }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-10 h-10 flex items-center justify-center bg-sec text-white rounded-full">
                    <FaRobot />
                  </div>
                )}

                <div
                  className={`p-3 max-w-[70%] rounded-xl text-sm ${msg.sender === "user"
                    ? "bg-prim text-white"
                    : "bg-white border"
                    }`}
                >
                  {msg.text}
                </div>

                {msg.sender === "user" && (
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-800 text-white rounded-full">
                    <FaUser />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- INPUT BAR --- */}
      <div className="border-t bg-white p-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <input
            type="text"
            placeholder="Décris le logement que tu veux..."
            className="flex-1 border rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-sec outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          />

          <button
            onClick={sendMessage}
            className="px-5 py-2 bg-prim text-white rounded-full hover:bg-sec"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
}
