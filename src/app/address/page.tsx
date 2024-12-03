'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddressPage() {
    const [cep, setCep] = useState("");
    const [loading, setLoading] = useState(false);
    const [cepValido, setCepValido] = useState<boolean | null>(null);
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");

    const router = useRouter();

    // Função para formatar o CEP
    const formatarCep = (valor: string) => {
        return valor.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");
    };

    // Função que lida com a mudança no campo de CEP e aplica a formatação
    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valorFormatado = formatarCep(e.target.value);
        setCep(valorFormatado);
        setCepValido(null); // Reseta a validação ao alterar o CEP
        setRua("");
        setBairro("");
        setCidade("");
        setEstado("");
    };

    // Função para validar o CEP usando uma API
    const buscarEnderecoPorCep = async () => {
        if (cep.length !== 9) return;

        setLoading(true);
        try {
            const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
            const data = await response.json();

            if (data.street) {
                setRua(data.street);
                setBairro(data.neighborhood);
                setCidade(data.city);
                setEstado(data.state);
                setCepValido(true);
            } else {
                setCepValido(false);
            }
        } catch (error) {
            console.error("Erro ao buscar o CEP:", error);
            setCepValido(false);
        } finally {
            setLoading(false);
        }
    };

    const handleCepBlur = () => {
        buscarEnderecoPorCep();
    };

    // Função para verificar se os campos obrigatórios estão preenchidos
    const camposObrigatoriosPreenchidos = () => {
        return cepValido && rua && numero && bairro && cidade && estado;
    };

    // Função para lidar com o clique no botão "Continuar"
    const handleContinuarClick = () => {
        if (camposObrigatoriosPreenchidos()) {
            router.push("/terms");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold text-start mb-2">Onde deseja receber o carnê das parcelas?</h2>
                <p className="text-start text-gray-600 mb-6">
                    Além de enviarmos o carnê para seu e-mail, será enviado para o endereço abaixo em 7 dias úteis.
                </p>

                {/* Campo para o CEP */}
                <label className="block text-sm font-semibold mb-2 text-gray-600">CEP</label>
                <input
                    type="text"
                    value={cep}
                    onChange={handleCepChange}
                    onBlur={handleCepBlur}
                    placeholder="00000-000"
                    className="w-full p-4 mb-2 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                />

                {/* Mensagem de validação */}
                {loading ? (
                    <p className="text-gray-600 text-sm mt-2">⏳ Buscando endereço...</p>
                ) : cepValido === false ? (
                    <p className="text-red-600 text-sm mt-2">❌ CEP inválido</p>
                ) : null}

                {/* Campos de endereço adicionais (exibidos apenas se o CEP for válido) */}
                {cepValido && (
                    <>
                        <label className="block text-sm font-semibold mt-4 mb-2 text-gray-600">Rua</label>
                        <input
                            type="text"
                            value={rua}
                            onChange={(e) => setRua(e.target.value)}
                            className="w-full p-4 mb-4 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                        />

                        <label className="block text-sm font-semibold mb-2 text-gray-600">Número</label>
                        <input
                            type="text"
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                            className="w-full p-4 mb-4 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                        />

                        <label className="block text-sm font-semibold mb-2 text-gray-600">Complemento</label>
                        <input
                            type="text"
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                            className="w-full p-4 mb-4 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                        />

                        <label className="block text-sm font-semibold mb-2 text-gray-600">Bairro</label>
                        <input
                            type="text"
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                            className="w-full p-4 mb-4 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                        />

                        <label className="block text-sm font-semibold mb-2 text-gray-600">Cidade</label>
                        <input
                            type="text"
                            value={cidade}
                            onChange={(e) => setCidade(e.target.value)}
                            className="w-full p-4 mb-4 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                        />

                        <label className="block text-sm font-semibold mb-2 text-gray-600">Estado</label>
                        <input
                            type="text"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            className="w-full p-4 mb-6 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                        />

                        <button 
                            onClick={handleContinuarClick}
                            className="bg-rosa text-white font-semibold py-3 rounded-2xl w-full hover:bg-pink-700"
                        >
                            Continuar
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
