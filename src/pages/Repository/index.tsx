import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { Header, RepositoryInfo, Issues } from './styled';
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';
import api from '../../services/api';

interface RepositoryParams{
    repository: string;
}

interface Repository {
    full_name: string;
    description: string,
    stargazers_count: number,
    forks_count: number,
    open_issues_count: number,
    owner: {
        login: string;
        avatar_url: string;
    }
}

interface Issue{
    id: number;
    title: string;
    html_url: string;
    user: {
        login: string;
    }
}

const Repository: React.FC = () => {

    const [repository, setRepository] = useState<Repository | null>(null); /** | significa "ou" e deve ser usando quando carregamos objetos */
    const [issues, setIssues] = useState<Issue[]>([]); /** arrays dispensam a técnica mostrada acima, pois um array vazio ainda é um array */

    const { params } = useRouteMatch<RepositoryParams>();

    useEffect( () => { 
       
       api.get(`repos/${params.repository}`).then(response => {
                setRepository(response.data);
            });
        api.get(`repos/${params.repository}/issues`).then(response => {
                setIssues(response.data);
            })
        
       /*async function loadData(): Promise<void>{
            const [repository, issues] = await Promise.all([
                api.get(`repos/${params.repository}`),
                api.get(`repos/${params.repository}/issues`)
            ]);

            console.log(repository);
            console.log(issues);
        }*/

    } , [params.repository]);

    return (
        <>
            <Header>
                <img src={logoImg} alt="Github Explorer" /> 
                <Link to='/'>
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>
      
            { repository && (
                      <RepositoryInfo>
                      <header>
                          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                          <div>
                              <strong>{repository.owner.login}</strong>
                              <p>{repository.description}</p>
                          </div>
                      </header>
                      <ul>
      
                          <li>
                              <strong>{repository.stargazers_count}</strong>
                              <p>Stars</p>
                          </li>
                          <li>
                              <strong>{repository.forks_count}</strong>
                              <p>Forks</p>
                          </li>
                          <li>
                              <strong>{repository.open_issues_count}</strong>
                              <p>Issues abertas</p>
                          </li>
                      </ul>
                  </RepositoryInfo>
            )}
            
            <Issues>

               { 
                issues.map
                    (issue => (
                        <a key={issue.id} target='_blank' href={issue.html_url}>
                        <div>
                            <strong>{issue.title}</strong>
                            <p>{issue.user.login}</p>
                        </div>
                        <FiChevronRight size={20} />
                        </a>
                    ))
                }

            </Issues>

        </>
        )

    //return <h1>Repository: {params.repository}</h1>
}

export default Repository;