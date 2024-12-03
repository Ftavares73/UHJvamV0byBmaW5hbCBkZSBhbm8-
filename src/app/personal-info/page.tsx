// PersonalInfoPage.tsx
'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

export default function PersonalInfoPage() {
    const router = useRouter();
    const [cpf, setCpf] = useState("");
    const [cpfValido, setCpfValido] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    const [nome, setNome] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [nomeMae, setNomeMae] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [genero, setGenero] = useState("");

    // Função para formatar o CPF
    const formatarCpf = (valor: string) => {
        return valor
            .replace(/\D/g, "")
            .slice(0, 11)
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };

    // Função para formatar a data de nascimento
    const formatarData = (valor: string) => {
        return valor
            .replace(/\D/g, "")
            .slice(0, 8)
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{4})\d+?$/, "$1");
    };

    // Função para formatar o número de WhatsApp
    const formatarWhatsapp = (valor: string) => {
        return valor
            .replace(/\D/g, "")
            .slice(0, 11)
            .replace(/^(\d{2})(\d)/g, "($1) $2")
            .replace(/(\d{5})(\d{4})$/, "$1-$2");
    };

    // Validação de CPF usando a biblioteca
    const validarCpf = (cpf: string) => {
        return cpfValidator.isValid(cpf);
    };

    const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const cpfFormatado = formatarCpf(event.target.value);
        setCpf(cpfFormatado);
        setCpfValido(null);
    };

    const handleCpfBlur = () => {
        setLoading(true);
        setTimeout(() => {
            const isValid = validarCpf(cpf);
            setCpfValido(isValid);
            setLoading(false);
        }, 1500);
    };

    const handleSubmit = () => {
        // Checa se todos os campos estão preenchidos e válidos
        if (
            cpfValido &&
            nome.trim() !== "" &&
            dataNascimento.trim() !== "" &&
            nomeMae.trim() !== "" &&
            whatsapp.trim() !== "" &&
            genero !== ""
        ) {
            // Armazena o nome do usuário no localStorage para uso posterior
            localStorage.setItem("nome", nome);

            // Redireciona para a página /loan-reason
            router.push("/loan-reason");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4 mt-5">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold text-start mb-2">Sobre você</h2>
                <p className="text-start text-gray-600 mb-6">
                    Precisamos de algumas informações para continuar
                </p>

                <label className="block text-sm font-semibold mb-2 text-gray-600">CPF</label>
                <input
                    type="text"
                    value={cpf}
                    onChange={handleCpfChange}
                    onBlur={handleCpfBlur}
                    placeholder="000.000.000-00"
                    className="w-full p-4 mb-2 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                />

                {loading ? (
                    <p className="flex items-center text-gray-600 text-sm mt-2">⏳ Aguarde...</p>
                ) : cpfValido === false ? (
                    <p className="flex items-center text-red-600 text-sm mt-2">
                        ❌ CPF Inválido
                    </p>
                ) : null}

                {cpfValido && !loading && (
                    <>
                        <label className="block text-sm font-semibold mt-4 mb-2 text-gray-600">Nome completo</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Nome completo"
                            className="w-full p-4 mb-4 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                        />

                        <label className="block text-sm font-semibold mb-2 text-gray-600">Data de nascimento</label>
                        <input
                            type="text"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(formatarData(e.target.value))}
                            placeholder="dd/mm/aaaa"
                            className="w-full p-4 mb-4 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                        />

                        <label className="block text-sm font-semibold mb-2 text-gray-600">Nome da mãe</label>
                        <input
                            type="text"
                            value={nomeMae}
                            onChange={(e) => setNomeMae(e.target.value)}
                            placeholder="Nome da mãe"
                            className="w-full p-4 mb-4 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                        />

                        <label className="block text-sm font-semibold mb-2 text-gray-600">WhatsApp</label>
                        <input
                            type="text"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(formatarWhatsapp(e.target.value))}
                            placeholder="(00) 00000-0000"
                            className="w-full p-4 mb-4 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                        />

                        <label className="block text-sm font-semibold mb-2 text-gray-600">Gênero</label>
                        <div className="flex items-center mb-6 space-x-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="genero"
                                    value="masculino"
                                    checked={genero === "masculino"}
                                    onChange={() => setGenero("masculino")}
                                    className="text-rosa focus:ring-rosa"
                                />
                                <span className="ml-2 text-gray-700">Masculino</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="genero"
                                    value="feminino"
                                    checked={genero === "feminino"}
                                    onChange={() => setGenero("feminino")}
                                    className="text-rosa focus:ring-rosa"
                                />
                                <span className="ml-2 text-gray-700">Feminino</span>
                            </label>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="bg-rosa text-white font-semibold py-3 rounded-2xl w-full hover:bg-pink-700"
                        >
                            Concluir Cadastro
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
