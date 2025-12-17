"use client"

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function CreateAccountForm() {


    const searchParams = useSearchParams();
    const roleParam = searchParams.get("role");
    console.log(roleParam)

    const nomRef = useRef();
    const emailRef = useRef();
    const telRef = useRef();
    const passRef = useRef();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

const router = useRouter();

        const payload = {
            nom: nomRef.current.value,
            email: emailRef.current.value,
            telephone: telRef.current.value,
            mot_de_passe: passRef.current.value,
            role: roleParam || "etudiant", // valeur depuis param ou défaut
        };

        try {
            const res = await fetch("http://localhost:8000/users/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Erreur lors de la création du compte");
            } else {
                setSuccess("Compte créé avec succès !");
                // reset champs
                nomRef.current.value = "";
                emailRef.current.value = "";
                telRef.current.value = "";
                passRef.current.value = "";
            }
            
            if (roleParam == "proprietaire") {
                router.push("/dashboard");
            }
            else if (roleParam == "admin") {
               router.push("/admin");
            }
            else {
              router.push("/");
            }
        } catch (err) {
            setError("Erreur réseau");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
            >
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Image className="mx-auto h-10 w-auto" src="/imgs/logo.png" alt="Workflow" width={300} height={100} />
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        Créer un compte
                    </h2>
                    <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
                        Ou <br />
                        <Link href="#"
                            className="font-medium text-prim mb-4 hover:text-sec focus:outline-none focus:underline transition ease-in-out duration-150">
                            Connectez-vous à votre compte
                        </Link>
                    </p>
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">{success}</p>}

                <input ref={nomRef} type="text" placeholder="Nom" required className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
                <input ref={emailRef} type="email" placeholder="Email" required className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
                <input ref={telRef} type="text" placeholder="Téléphone" required className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
                <input ref={passRef} type="password" placeholder="Mot de passe" required className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-prim hover:bg-sec text-white py-3 rounded-lg font-bold transition-colors"
                >
                    {loading ? "Création..." : "Créer un compte"}
                </button>
            </form>
        </div>
    );
}
