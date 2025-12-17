"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm({user}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data)
      if (!res.ok) {
        setError(data.message || "Erreur lors de la connexion");
      } else {
        // login réussi
        if (user == "proprietaire") {
          window.location.href = "/dashboard";
        }
        else if (user == "admin") {
          window.location.href = "/admin";
        }
        else {
          window.location.href = "/";
        }

      }
    } catch (err) {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <span className="block text-3xl font-sans font-black text-prim text-center">
          <Image
            src="/imgs/logo.png"
            alt="roomly"
            width={96}
            height={96}
            className="w-24 h-auto m-auto"
          />
        </span>
        <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-700">
          Connexion à mon compte
        </h2>
        <span className="block text-sm/6 font-medium text-gray-600 text-center">
          Renseignez votre identifiant de connexion et votre mot de passe pour accéder à votre compte.
        </span>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-600">
              Identifiant (email) * :
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="block w-full rounded-md bg-slate-200 px-3 py-1.5 text-base text-gray-700 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-600">
                Mot de passe * :
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-sec hover:text-prim">
                  Rappel de mot de passe
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="block w-full rounded-md bg-slate-200 px-3 py-1.5 text-base text-gray-700 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-prim px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-sec focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Pas encore de compte ?{" "}
          <Link href={`/create?role=${user}`} className="text-prim hover:underline font-semibold">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}
