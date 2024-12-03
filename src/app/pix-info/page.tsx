'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PixInfoPage() {
    const [banco, setBanco] = useState("");
    const [chavePix, setChavePix] = useState("");
    const [sugestoes, setSugestoes] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

   
    const buscarBancos = async (query: string) => {
        try {
            const response = await fetch(`https://brasilapi.com.br/api/banks/v1`);
            const data = await response.json();
            const bancosFiltrados = data.filter((banco: any) =>
                banco.name && banco.name.toLowerCase().includes(query.toLowerCase())
            );
            setSugestoes(bancosFiltrados);
        } catch (error) {
            console.error("Erro ao buscar bancos:", error);
        }
    };

    
    const handleBancoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value;
        setBanco(valor);
        if (valor.length > 1) {
            buscarBancos(valor);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    
    const selecionarBanco = (bancoNome: string) => {
        setBanco(bancoNome);
        setShowSuggestions(false);
    };

    
    const handleContinuarClick = () => {
        if (banco && chavePix) {
            setLoading(true); 
            setTimeout(() => {
                router.push("/address"); 
            }, 1000); 
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold text-start mb-2">Recebimento do crédito</h2>
                <p className="text-start text-gray-600 mb-6">Chave Pix de qualquer banco</p>

                <label className="block text-sm font-semibold mb-2 text-gray-600">Nome do banco</label>
                <input
                    type="text"
                    value={banco}
                    onChange={handleBancoChange}
                    placeholder="Ex: Nubank"
                    className="w-full p-4 mb-1 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                />
                {showSuggestions && sugestoes.length > 0 && (
                    <ul className="border border-gray-300 rounded-lg shadow-md bg-white max-h-40 overflow-y-auto">
                        {sugestoes.map((sugestao: any) => (
                            <li
                                key={sugestao.ispb}
                                onClick={() => selecionarBanco(sugestao.name)}
                                className="p-2 cursor-pointer hover:bg-pink-100"
                            >
                                {sugestao.name}
                            </li>
                        ))}
                    </ul>
                )}

                <label className="block text-sm font-semibold mt-4 mb-2 text-gray-600">Chave Pix</label>
                <input
                    type="text"
                    value={chavePix}
                    onChange={(e) => setChavePix(e.target.value)}
                    placeholder="CPF, Telefone, E-mail ou aleatória"
                    className="w-full p-4 mb-6 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                />

                <button 
                    onClick={handleContinuarClick}
                    className="bg-rosa text-white font-semibold py-3 rounded-2xl w-full hover:bg-pink-700"
                    disabled={loading} 
                >
                    Continuar
                </button>

                
                {loading && <p className="text-center text-gray-600 mt-4">Aguarde...</p>}
            </div>
        </div>
    );
}
