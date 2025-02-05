

import React, { useState } from "react";

interface UserFormProps {
    onFormSubmit: (userData: { name: string; email: string, tel: string }) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onFormSubmit }) => {
    const [userData, setUserData] = useState({ name: "", email: "", tel: "" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (userData.name.trim() && userData.email.trim()) {
            onFormSubmit(userData);
        }
    };

    return (
        <div className="p-2 bg-white shadow-lg rounded-lg max-w-sm mx-auto m-4">
            <h2 className="text-lg font-bold text-center">Antes de iniciar</h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        placeholder="Escribe tu nombre"
                        className="w-full border rounded-lg p-2"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        placeholder="Escribe tu correo"
                        className="w-full border rounded-lg p-2"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Número de telefono</label>
                    <input
                        type="tel"
                        name="tel"
                        value={userData.tel}
                        onChange={handleInputChange}
                        placeholder="Escribe tu teléfono"
                        className="w-full border rounded-lg p-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white p-2 rounded-lg hover:bg-purple-700"
                >
                    Iniciar chat
                </button>
            </form>
        </div>
    );
};

export default UserForm;
