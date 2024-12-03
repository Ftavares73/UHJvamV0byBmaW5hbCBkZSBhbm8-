'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoanInfoPage() {
    const router = useRouter();
    const [rendaMensal, setRendaMensal] = useState("");
    const [diaRecebimento, setDiaRecebimento] = useState("");
    const [ocupacao, setOcupacao] = useState("");
    const [escolaridade, setEscolaridade] = useState("");

    const formatarParaBRL = (valor: string) => {
        const numero = parseFloat(valor.replace(/\D/g, "")) / 100;
        return numero.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).replace("R$", "").trim();
    };

    const handleRendaMensalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRendaMensal(formatarParaBRL(e.target.value));
    };

    const handleContinue = () => {
        if (rendaMensal && diaRecebimento && ocupacao && escolaridade) {
            router.push("/dirty-name"); // Substitua pela rota apropriada
        }
    };

    const ocupacoes = [
        "Empresário", "Dona de casa", "Empregado CLT", "Autônomo", "Funcionário público", 
        "Rentista", "Aposentado/Pensionista", "Estudante", "Desempregado", "Outro"
    ];

    const escolaridades = [
        "Fundamental", "Médio", "Superior", "Pós-Graduação", "Outro"
    ];

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold text-start mb-4">Quase lá</h2>

                <label className="block text-sm font-semibold mb-2 text-gray-600">Qual sua renda mensal?</label>
                <div className="flex items-center border rounded-2xl px-4 py-2 mb-4">
                    <div className="flex items-center rounded-lg justify-center border px-2 mr-2">
                        <span className="text-rosa font-semibold">R$</span>
                    </div>
                    <input
                        type="text"
                        value={rendaMensal}
                        onChange={handleRendaMensalChange}
                        placeholder="0,00"
                        className="w-full border-none outline-none text-lg text-black"
                    />
                </div>

                <label className="block text-sm font-semibold mb-2 text-gray-600">Qual dia do mês você recebe?</label>
                <input
                    type="number"
                    value={diaRecebimento}
                    onChange={(e) => setDiaRecebimento(e.target.value)}
                    placeholder="0 a 30"
                    className="w-full p-4 mb-4 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                />

                <label className="block text-sm font-semibold mb-2 text-gray-600">Ocupação</label>
                <select
                    value={ocupacao}
                    onChange={(e) => setOcupacao(e.target.value)}
                    className="w-full p-4 mb-4 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                >
                    <option value="">Selecione</option>
                    {ocupacoes.map((op) => (
                        <option key={op} value={op}>{op}</option>
                    ))}
                </select>

                <label className="block text-sm font-semibold mb-2 text-gray-600">Escolaridade</label>
                <select
                    value={escolaridade}
                    onChange={(e) => setEscolaridade(e.target.value)}
                    className="w-full p-4 mb-4 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                >
                    <option value="">Selecione</option>
                    {escolaridades.map((esc) => (
                        <option key={esc} value={esc}>{esc}</option>
                    ))}
                </select>

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
