import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const response = NextResponse.json({ message: "Déconnexion réussie" });

    // Supprimer le cookie
    response.cookies.delete("access_token", { path: "/" });

    return response;
  } catch (err) {
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
