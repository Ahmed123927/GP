import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(45deg, #ff9a9e, #fad0c4, #ffd1ff, #fcb69f, #ff9a9e);
    background-size: 400% 400%;
    animation: gradient 10s ease infinite;
    font-family: 'Arial', sans-serif;
  }
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const neonGlow = keyframes`
  0%, 100% {
    text-shadow: 
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 20px #fff,
      0 0 40px #ff00ff,
      0 0 80px #ff00ff,
      0 0 90px #ff00ff,
      0 0 100px #ff00ff,
      0 0 150px #ff00ff;
  }
  50% {
    text-shadow: 
      0 0 5px #fff,
      0 0 10px #fff,
      0 0 20px #ff00ff,
      0 0 40px #ff00ff,
      0 0 80px #ff00ff,
      0 0 90px #ff00ff,
      0 0 100px #ff00ff,
      0 0 150px #ff00ff;
  }
`;

const SearchFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
`;

const SearchInput = styled.input`
  width: 400px;
  height: 50px;
  padding: 10px;
  border: 2px solid #ff00ff;
  border-radius: 25px;
  font-size: 1.5rem;
  outline: none;
  background: rgba(255, 255, 255, 0.2);
  color: #000;
  text-align: center;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease-in-out;

  &:focus {
    width: 500px;
    background: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
  }
`;

const SearchLabel = styled.label`
  position: absolute;
  top: -45px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2.5rem;
  color: #fff;
  animation: ${neonGlow} 1.5s ease-in-out infinite alternate;
`;

const SearchButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  font-size: 1.5rem;
  border: none;
  border-radius: 25px;
  background: linear-gradient(135deg, #ff4e50, #f9d423);
  color: #fff;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.4);
    background: linear-gradient(135deg, #f9d423, #ff4e50);
  }
`;

const KeywordWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Keyword = styled.span`
  margin: 5px;
  padding: 8px 15px;
  background-color: #ff00ff;
  color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
`;

const ResultsTable = styled.table`
  margin-top: 20px;
  width: 80%;
  border-collapse: collapse;
  text-align: left;
`;

const TableHeader = styled.th`
  background: #ff00ff;
  color: #fff;
  padding: 10px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ff00ff;
`;

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
        alert('JWT token not found in local storage');
        return;
    }

    setLoading(true);

    try {
        const response = await axios.post('http://localhost:3500/ml/', 
            { Terms: searchQuery }, 
            { headers: { Authorization: `Bearer ${jwtToken}` } }
        );
        setResults(response.data);
    } catch (error) {
        console.error('Error fetching data from API', error);
    } finally {
        setLoading(false);
    }
};

return (
    <>
      <GlobalStyle />
      <SearchFormWrapper>
        <SearchLabel htmlFor="search">Ai Tools</SearchLabel>
        <SearchInput
          id="search"
          type="text"
          placeholder="Type Skill"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <SearchButton onClick={handleSearch}>Get Recommendation</SearchButton>
        {loading ? (
          <ClipLoader color="#ffffff" size={50} />
        ) : (
          <KeywordWrapper>
            {Object.keys(results).length > 0 && (
              <ResultsTable>
                <thead>
                  <tr>
                    <TableHeader>Tool</TableHeader>
                    <TableHeader>Link</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(results).map(([tool, link], index) => (
                    <TableRow key={index}>
                      <TableCell>{tool}</TableCell>
                      <TableCell>
                        <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </ResultsTable>
            )}
          </KeywordWrapper>
        )}
      </SearchFormWrapper>
    </>
  );
};

export default SearchForm;
