'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleRegisterClick = () => {
        // Verifica se ambos os campos estão preenchidos
        if (email && senha) {
            router.push("/personal-info");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                
                <h2 className="text-xl font-semibold text-center mb-2">
                    Cadastro sem compromisso!
                </h2>

                <p className="text-center text-gray-600 mb-6">
                    Preencha os campos abaixo para criar sua conta.
                </p>

                {/* Campo de E-mail */}
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 mb-4 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                />

                {/* Campo de Senha */}
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full p-4 mb-6 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                />

                {/* Botão de Criar Conta */}
                <button
                    onClick={handleRegisterClick}
                    className="bg-rosa text-white font-semibold py-2 px-14 rounded-2xl hover:bg-pink-700"
                >
                    Criar conta
                </button>
            </div>
        </div>
    );
}
