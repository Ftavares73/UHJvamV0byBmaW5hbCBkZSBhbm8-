'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LookingForOfferPage() {
    const router = useRouter();
    const [messageIndex, setMessageIndex] = useState(0);

    const messages = [
        "Buscando a melhor oferta para você",
        "Verificando sua aptidão para receber crédito",
        "Estamos quase lá..."
    ];

    // Função para alternar as mensagens e navegar para a próxima tela
    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => {
                if (prevIndex === messages.length - 1) {
                    clearInterval(interval);
                    router.push("/approved");
                    return prevIndex;
                }
                return prevIndex + 1;
            });
        }, 5000); // Troca de mensagem a cada 2 segundos

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }, [router]);

    return (
        <div className="bg-rosa min-h-screen flex flex-col items-center justify-center text-white">
            <div className="flex flex-col items-center">
                <div className="loader mb-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white"></div>
                </div>
                <p className="text-lg text-center">{messages[messageIndex]}</p>
            </div>
        </div>
    );
}
