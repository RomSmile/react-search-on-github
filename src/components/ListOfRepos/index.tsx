import React from 'react';
import { Repo } from '../../types';

import './listOfRepos.scss';

type Props = {
  arrRepo: Repo[],
}

export const ListOfRepos:React.FC<Props> = ({arrRepo}) => {
  return(
    <>
      <ul className="list-of-repos">
        {arrRepo.length ? arrRepo.map(item => (
          <li className="list-of-repos__list-item" key={item.id}>
            <span>
              {item.name}
            </span>
            <span>
              <span>
                {item.stargazers_count}
              </span>
              <span>
                {item.forks}
              </span>
            </span>
          </li>
        ))
        : ''}
      </ul>
    </>
  );
};