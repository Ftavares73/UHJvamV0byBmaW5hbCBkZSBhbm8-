'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoanReasonPage() {
    const router = useRouter();
    const [selectedReason, setSelectedReason] = useState<string | null>(null);

    const reasons = [
        { id: "dividas", label: "Pagar dívidas", icon: "📑" },
        { id: "cartao", label: "Pagar cartão de crédito", icon: "💳" },
        { id: "veiculo", label: "Comprar veículo", icon: "🚗" },
        { id: "negocio", label: "Investir em um negócio", icon: "💼" },
        { id: "reforma", label: "Reformar a casa", icon: "🏠" },
        { id: "cheque", label: "Pagar cheque especial", icon: "📄" },
        { id: "compras", label: "Compras em geral", icon: "🛍️" },
        { id: "outro", label: "Outro motivo", icon: "…" },
    ];

    const handleSelectReason = (reasonId: string) => {
        setSelectedReason(reasonId);
    };

    const handleContinue = () => {
        if (selectedReason) {
            
            router.push("/loan-info"); 
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold text-center mb-6">Qual motivo do empréstimo?</h2>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {reasons.map((reason) => (
                        <button
                            key={reason.id}
                            onClick={() => handleSelectReason(reason.id)}
                            className={`flex flex-col items-center justify-center p-4 border rounded-xl ${
                                selectedReason === reason.id ? "bg-pink-100 border-rosa text-rosa" : "bg-white border-gray-300 text-rosa"
                            }`}
                        >
                            <span className="text-2xl mb-2">{reason.icon}</span>
                            <span className="text-center font-semibold">{reason.label}</span>
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleContinue}
                    disabled={!selectedReason}
                    className={`w-full py-3 rounded-2xl font-semibold text-white ${
                        selectedReason ? "bg-rosa hover:bg-pink-700" : "bg-gray-300 cursor-not-allowed"
                    }`}
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}
