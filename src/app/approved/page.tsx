'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ApprovedPage() {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [valorEmprestimo, setValorEmprestimo] = useState(0);
    const [parcelas, setParcelas] = useState(12); // Valor padrão caso não seja encontrado no localStorage

    useEffect(() => {
        const storedNome = localStorage.getItem("nome");
        const storedValor = localStorage.getItem("valorEmprestimo");
        const storedParcelas = localStorage.getItem("parcelas");

        if (storedNome) setNome(storedNome);
        if (storedValor) setValorEmprestimo(parseFloat(storedValor));
        if (storedParcelas) setParcelas(parseInt(storedParcelas, 10));
    }, []);

    const formatarParaBRL = (valor: number) => {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    const handleAceitarPropostaClick = () => {
        router.push("/pix-info");
    };

    return (
        <div className="bg-rosa min-h-screen flex flex-col items-center justify-center text-white p-6">
            <h2 className="text-2xl font-semibold mb-2">Parabéns, {nome}!</h2>
            <p className="text-lg mb-6">Symplis tem uma proposta para você!</p>
            
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md text-black">
                <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 text-center">
                        <p className="text-sm font-semibold text-gray-600">Valor</p>
                        <p className="text-lg font-bold text-rosa">{formatarParaBRL(valorEmprestimo)}</p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                        <p className="text-sm font-semibold text-gray-600">Parcelas</p>
                        <p className="text-lg font-bold text-rosa">
                            {parcelas}x de {formatarParaBRL(valorEmprestimo / parcelas)}
                        </p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                        <p className="text-sm font-semibold text-gray-600">1ª parcela</p>
                        <p className="text-lg font-bold text-rosa">03/01/2025</p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                        <p className="text-sm font-semibold text-gray-600">Status</p>
                        <p className="text-lg font-bold text-rosa">Pré-aprovado</p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                        <p className="text-sm font-semibold text-gray-600">Tipo</p>
                        <p className="text-lg font-bold text-rosa">Pessoal</p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                        <p className="text-sm font-semibold text-gray-600">Transferência</p>
                        <p className="text-lg font-bold text-rosa">Pix</p>
                    </div>
                </div>
                <button
                onClick={handleAceitarPropostaClick} 
                className="bg-rosa text-white font-semibold py-3 rounded-2xl w-full mt-6 hover:bg-pink-700">
                    Aceitar proposta
                </button>
            </div>
        </div>
    );
}
