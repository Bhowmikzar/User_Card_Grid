import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  padding: 0rem;
`;

const Navbar = styled.nav`
  background-color: #333;
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Button = styled.button`
  background-color: #fff;
  color: #333;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const UserCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
`;

const UserCard = styled.div`
  background-color: #128add;
  padding: 1rem;
  border-radius: 4px;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(100000);

    try {
      const response = await axios.get("https://reqres.in/api/users?page=1");
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  const handleButtonClick = () => {
    fetchUsers();
  };

  return (
    <Container>
      <Navbar>
        <div>BhowmikzAR</div>
        <Button onClick={handleButtonClick} disabled={isLoading}>
          Get Users
        </Button>
      </Navbar>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <UserCardGrid>
          {users.map((user) => (
            <UserCard key={user.id}>
              <img src={user.avatar} alt={user.first_name} />
              <div>{`${user.first_name} ${user.last_name}`}</div>
              <div>{user.email}</div>
            </UserCard>
          ))}
        </UserCardGrid>
      )}
    </Container>
  );
}

export default App;
