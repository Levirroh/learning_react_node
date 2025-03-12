import React from "react";
import axios from "axios";
import { FaTrash, FaEdit} from "react-icons/fa";
import styled from "styled-components"
import { toast } from "react-toastify";

const Table = styled.table`
    width: 100%;
    background-color: #fafafa;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`;

export const Tbody = styled.tbody``;

export const Thead = styled.thead``;
export const Tr = styled.tr``;
export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

`;

export const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};
`;


const Grid = ({ users, setUsers, setOnEdit }) => {
    const handleEdit = (item) => {
      setOnEdit(item);
    };
    const handleDelete = async (id) => {
        await axios
          .delete("http://localhost:8800/" + id)
          .then(({ data }) => {
            const newArray = users.filter((user) => user.id !== id);
    
            setUsers(newArray);
            toast.success(data);
          })
          .catch(({ data }) => toast.error(data));
    
        setOnEdit(null);
      };
    return(
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Email</Th>
                    <Th>Fone</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {users.map((item, i) => (
                    <Tr key={i}>
                        <Td width="30%">{item.name}</Td>
                        <Td width="30%">{item.email}</Td>
                        <Td width="20%" >{item.phone}</Td>
                        <Td width="50%"><FaEdit /></Td>
                        <Td width="50%"><FaTrash onClick={() => handleDelete(item.id)}/></Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>

    );
}

export default Grid;