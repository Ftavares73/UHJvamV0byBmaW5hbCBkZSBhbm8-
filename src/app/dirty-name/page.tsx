'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DirtyNamePage() {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState<"yes" | "no" | null>(null);

    const handleContinue = () => {
        if (selectedOption) {
            router.push("/looking-for-offer");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                {/* Título */}
                <h2 className="text-xl font-semibold text-center mb-4">Você está negativado?</h2>

                {/* Opções de Seleção */}
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        onClick={() => setSelectedOption("no")}
                        className={`flex flex-col items-center justify-center p-4 border rounded-2xl w-32 h-24 ${
                            selectedOption === "no" ? "border-rosa text-rosa" : "border-gray-300 text-gray-600"
                        }`}
                    >
                        <span className="text-3xl">😊</span>
                        <span className="font-semibold">Não estou!</span>
                    </button>
                    <button
                        onClick={() => setSelectedOption("yes")}
                        className={`flex flex-col items-center justify-center p-4 border rounded-2xl w-32 h-24 ${
                            selectedOption === "yes" ? "border-rosa text-rosa" : "border-gray-300 text-gray-600"
                        }`}
                    >
                        <span className="text-3xl">😞</span>
                        <span className="font-semibold">Sim, estou!</span>
                    </button>
                </div>

                {/* Botão de Continuar */}
                <button
                    onClick={handleContinue}
                    className="bg-rosa text-white font-semibold py-3 rounded-2xl w-full hover:bg-pink-700"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}
