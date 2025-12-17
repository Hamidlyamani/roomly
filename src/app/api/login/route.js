import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Appel à ton backend
    const res = await fetch("http://127.0.0.1:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, mot_de_passe: password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ message: data.detail || "Erreur login" }, { status: 401 });
    }

    // Création du cookie HttpOnly
    const response = NextResponse.json({ message: "Login réussi" });
    response.cookies.set({
      name: "access_token",
      value: data.access_token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60, // 1h
      sameSite: "lax",
      secure: false,
    });

    return response;
  } catch (err) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
