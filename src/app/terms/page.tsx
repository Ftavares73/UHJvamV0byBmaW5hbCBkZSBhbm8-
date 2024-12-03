'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TermsPage() {
    const router = useRouter();
    const [valorEmprestimo, setValorEmprestimo] = useState(0);
    const [parcelas, setParcelas] = useState(0);
    const [parcelaMensal, setParcelaMensal] = useState(0);

    useEffect(() => {
        // Recupera os valores armazenados no localStorage
        const valorEmprestimoStorage = parseFloat(localStorage.getItem("valorEmprestimo") || "0");
        const parcelasStorage = parseInt(localStorage.getItem("parcelas") || "0", 10);
        
        setValorEmprestimo(valorEmprestimoStorage);
        setParcelas(parcelasStorage);

        // Calcula o valor da parcela mensal
        if (parcelasStorage > 0) {
            setParcelaMensal(valorEmprestimoStorage / parcelasStorage);
        }
    }, []);

    // Formatação para moeda BRL
    const formatarParaBRL = (valor: number) => {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
        });
    };

    // Função para lidar com a aceitação dos termos
    const handleAceitarTermos = () => {
        // Redireciona para a próxima página
        router.push("/conversao"); // Substitua "/next-page" pela rota desejada
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold text-start mb-2">Termos do empréstimo</h2>
                
                <p className="text-start text-gray-600 mb-6">
                    Por este instrumento, o cliente, inscrito no CPF sob o número, e a empresa Symplis, 
                    firmam o presente termo de empréstimo na data de {new Date().toLocaleDateString("pt-BR")}, 
                    segundo as condições a seguir:
                </p>

                <p className="text-start text-gray-600 mb-4">
                    O cliente solicita um empréstimo no valor total de <strong>{formatarParaBRL(valorEmprestimo)}</strong>.
                    Este montante será dividido em <strong>{parcelas}</strong> parcelas mensais, cada uma no valor de <strong>{formatarParaBRL(parcelaMensal)}</strong>.
                </p>

                <p className="text-start text-gray-600 mb-6">
                    Ambas as partes concordam com os valores e condições estipulados neste termo. Este termo visa assegurar que
                    tanto você quanto Symplis tenham clareza sobre o que foi acordado, garantindo uma relação transparente e confiável.
                </p>

                <p className="text-start text-gray-600 mb-6">
                    Cordialmente, <br />
                    Symplis
                </p>

                <button 
                    onClick={handleAceitarTermos}
                    className="bg-rosa text-white font-semibold py-3 rounded-2xl w-full hover:bg-pink-700"
                >
                    Li e aceito os termos
                </button>
            </div>
        </div>
    );
}
