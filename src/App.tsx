import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { UserProfile } from './components/UserProfile';
import { getUsers } from './api';
import { User } from './types';
import './styles/App.scss';

const App: React.FC = () => {
  const [ searchValue, setSearchValue] = useState('');
  const [ text ] = useDebounce(searchValue, 500);
  const [ listOfUsers, setListOfUsers] = useState<User[] | []>([]);
  const [ profile, setProfile ] = useState<boolean>(false);

  const [ selectedUser, selectUser ] = useState<String>('');

  useEffect(() => {
    if (text) {
      (async () => {
        const response = await getUsers(text);

        if (response.items) {
          setListOfUsers(response.items);
        } else {
          setListOfUsers([]);
        }
      })();
    } else {
      setListOfUsers([]);
    }
  }, [text])

  return (
    <div className="app">
      <div className="body">
        <h1 className="body__title">
          GitHub Searcher
        </h1>
        {!profile &&
          <>
            <input
              value={searchValue}
              onChange={(event) => {
                setSearchValue(event.target.value);
              }}
              className="body__search"
              placeholder="Enter the user login..."
            />
            <ul className="body__list-of-users list-of-users">
              {listOfUsers.map((item) => (
                <li
                  key={item.id}
                  className="list-of-users__user"
                  onClick={() => {
                    selectUser(item.login);
                    setProfile(true);
                  }}
                >
                  <div style={{width: "50px", height: "50px"}}>
                    <img src={item.avatar_url} alt={`User ${item.login}`}/>
                  </div>
                  <span>{item.login}</span>
                  <span>Repo: {item.id}</span>
                </li>
              ))}
              {!listOfUsers.length && 
                <div className='list-of-users__do-not-know-text'>
                  I don't know what i should do here, so let it be here
                </div>
              }
            </ul>
          </>
        }
        
        {
          profile
          && <UserProfile selectedUser={selectedUser} setProfile={setProfile} />
        }

        <span style={{visibility: 'hidden'}}>0</span>
      </div>
    </div>
  );
}

export default App;
