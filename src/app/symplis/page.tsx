// SimplysInicial.tsx
'use client'
import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function SimplysInicial() {
    const [valorEmprestimo, setValorEmprestimo] = useState(0);
    const [parcelas, setParcelas] = useState(3);
    const [parcelaMensal, setParcelaMensal] = useState(0);

    const router = useRouter(); 

    const formatarParaBRL = (valor: number) => {
        return valor.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const handleValorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let valor = event.target.value.replace(/\D/g, ""); 
        let valorNumerico = parseFloat(valor) / 100; 

        if (valorNumerico > 50000) {
            valorNumerico = 50000;
        }

        setValorEmprestimo(valorNumerico);
        calcularParcela(valorNumerico, parcelas);
    };

    const calcularParcela = (valor: number, numParcelas: number) => {
        if (numParcelas > 0) {
            setParcelaMensal(valor / numParcelas);
        }
    };

    const handleParcelasChange = (numParcelas: number) => {
        setParcelas(numParcelas);
        calcularParcela(valorEmprestimo, numParcelas);
    };

    const handleContinuarClick = () => {
        if (valorEmprestimo > 0) {
            // Armazena o valor do empréstimo e o número de parcelas no localStorage
            localStorage.setItem("valorEmprestimo", valorEmprestimo.toString());
            localStorage.setItem("parcelas", parcelas.toString());
            

            // Redireciona para a página /login
            router.push("/login");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4 mt-6">
            <h2 className="text-2xl font-semibold text-center mb-6">
                Faça sua simulação em menos de 5 minutos!
            </h2>

            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mb-6">
                <h3 className="text-[22px] font-semibold mb-6 text-center">
                    Quanto você deseja pegar emprestado?
                </h3>
                <div className="flex items-center border rounded-2xl px-4 py-2 mb-2">
                    <div className="flex items-center rounded-lg justify-center border px-2 mr-2">
                        <span className="text-rosa font-semibold">R$</span>
                    </div>
                    <input
                        type="text"
                        placeholder="0,00"
                        value={formatarParaBRL(valorEmprestimo)} 
                        onChange={handleValorChange}
                        className="w-full border-none outline-none text-lg text-black"
                    />
                </div>
                <p className="text-gray-500 text-xs text-center">
                    O valor pode ser de R$ 150,00 à R$ 50.000,00.
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mb-6">
                <h3 className="text-lg font-semibold mb-4 text-center">
                    Em quantas vezes você deseja pagar
                </h3>
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {[3, 6, 9, 12, 18, 24, 36, 48, 60].map((numParcelas) => (
                        <button
                            key={numParcelas}
                            onClick={() => handleParcelasChange(numParcelas)}
                            className={`px-2 py-1 rounded-lg text-center font-semibold ${
                                parcelas === numParcelas ? "bg-rosa text-white" : "bg-white border text-rosa"
                            }`}
                        >
                            {numParcelas}x
                        </button>
                    ))}
                </div>
                <p className="text-gray-500 text-[20px] text-center mt-5">
                    Sua parcela mensal será de <span className="text-rosa font-semibold">{formatarParaBRL(parcelaMensal)}</span>
                </p>
            </div>

            <button 
                onClick={handleContinuarClick}
                className="bg-rosa text-white font-semibold py-2 px-12 rounded-2xl text-md max-w-md mb-6"
            >
                Continuar
            </button>
        </div>
    );
}
