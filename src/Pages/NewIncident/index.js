import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './style.css';

import logoImg from '../../assets/logo.svg';
import api from '../../Services/api';

export default function NewIncident(){

    const ongId = localStorage.getItem('ongId');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();

        const data = {title,
        description,
        value};

        try{
            await api.post('incident', data, {
                headers: {
                    Authorization: ongId
                }
            });
            history.push("/profile");
        }catch{ 
            alert("ERRO AO CADASTRAR");
        }
    }

    return (
        <section className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heroi para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>

                </section>
                <form onSubmit={handleSubmit}>
                        <input type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Titulo do caso"/>
                        <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descrição do caso" /> 
                        <input type="text"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Valor em reais"/>

                        <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </section>
    );
}