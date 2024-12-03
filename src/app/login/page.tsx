
'use client'
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const handleLoginClick = () => {
        router.push("/personal-info"); 
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center -mb-10">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
                
                <h2 className="text-xl font-semibold text-center mb-6">Login com Facebook</h2>

                
                <input
                    type="email"
                    placeholder="E-mail"
                    className="w-full p-4 mb-3 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                />

                
                <input
                    type="password"
                    placeholder="Senha"
                    className="w-full p-4 mb-6 border border-gray-300 rounded-2xl outline-none focus:border-rosa"
                />

                
                <button
                    onClick={handleLoginClick}
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-2xl mb-4 hover:bg-blue-700"
                >
                    Entrar
                </button>

                
                <div className="flex items-center justify-center mb-4">
                    <hr className="w-full border-t border-gray-300" />
                    <span className="px-4 text-gray-500 text-sm">Ou</span>
                    <hr className="w-full border-t border-gray-300" />
                </div>

                
                <button
                    onClick={() => router.push("/register")} 
                    className="w-full bg-rosa text-white font-semibold py-2 rounded-2xl hover:bg-pink-700"
                >
                    Cadastrar-se
                </button>
            </div>
        </div>
    );
}
