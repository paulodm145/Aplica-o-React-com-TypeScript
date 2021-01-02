import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { Header, RepositoryInfo, Issues } from './styled';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi'

interface RepositoryParams{
    repository: string;
}

const Repository: React.FC = () => {

    const { params } = useRouteMatch<RepositoryParams>()
    return (
        <>
            <Header>
                <img src={logoImg} alt="Github Explorer" /> 
                <Link to='/dashboard'>
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>
            <RepositoryInfo>
                <header>
                    <img src="https://avatars0.githubusercontent.com/u/46395433?s=460&u=b006bd3112c241872fbe5496814881de4dedef29&v=4" alt="Explorer" />
                    <div>
                        <strong>rocketseat/unform</strong>
                        <p>Descrição do repositório</p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>1808</strong>
                        <p>Stars</p>
                    </li>
                    <li>
                        <strong>48</strong>
                        <p>Forks</p>
                    </li>
                    <li>
                        <strong>67</strong>
                        <p>Issues abertas</p>
                    </li>
                </ul>
            </RepositoryInfo>

            
            <Issues>
                <Link  to="asas">
                <div>
                    <strong>Repositorio</strong>
                    <p>descrição</p>
                </div>
                <FiChevronRight size={20} />
                </Link>
            </Issues>

        </>
        )

    //return <h1>Repository: {params.repository}</h1>
}

export default Repository;