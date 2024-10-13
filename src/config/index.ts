import { Metadata } from "next";

export const SITE_CONFIG: Metadata = {
    title: {
        // Título padrão único e cativante para o Bemobi AI
        default: "Bemobi AI - Inovando a Experiência do Cliente",
        template: `%s | Bemobi AI`,
    },
    description: "Bemobi AI oferece soluções inteligentes que utilizam IA para otimizar e transformar a experiência do cliente. Descubra como impulsionar o engajamento e a satisfação dos seus clientes com nossas soluções inovadoras.",
    icons: {
        icon: [
            {
                url: "/icons/favicon.ico",
                href: "/icons/favicon.ico",
            }
        ]
    },
    openGraph: {
        title: "Bemobi AI - Soluções de IA para Experiências Excepcionais",
        description: "Maximize a satisfação do cliente com as soluções de IA da Bemobi AI. Implementamos tecnologias avançadas para otimizar cada ponto de contato com seus clientes.",
        images: [
            {
                url: "/assets/og-image.png",
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        creator: "@bemobi", 
        title: "Bemobi AI - Transformando a Experiência do Cliente com IA",
        description: "Eleve o nível de satisfação dos seus clientes com as soluções de IA da Bemobi AI. Tecnologias inteligentes para otimizar a jornada do cliente.",
        images: [
            {
                url: "/assets/og-image.png",
            }
        ]
    },
    metadataBase: new URL("https://bemobi-ai.com"), 
};
