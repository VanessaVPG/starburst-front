// app/api/chatbot_proxy/route.ts
import { NextRequest, NextResponse } from "next/server";

interface ChatbotResponse {
  reply: string;
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    const apiResponse = await fetch(
      process.env.NEXT_PUBLIC_CHATBOT_API_URL || "https://starbust-bemobi-3912b31e3966.herokuapp.com/api/chatbot_view/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    );

    if (!apiResponse.ok) {
      throw new Error("Erro na resposta da API externa");
    }

    const data = await apiResponse.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro no proxy:", error);
    return NextResponse.json(
      { reply: "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
