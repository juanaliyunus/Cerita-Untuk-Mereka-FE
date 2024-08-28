import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";
import {
  Button,
  Dropdown,
  DropdownItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import SearchIcon from "../assets/SearchIcon";

function OrphanageList() {
  const [orphanages, setOrphanages] = useState([]);
  const [orphanageBooks, setOrphanageBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredOrphanages, setFilteredOrphanages] = useState([]);

  useEffect(() => {
    axiosInstance.get('/orphanageBooks').then(response => {
      console.log("Test Buku: ", response.data);
      setOrphanageBooks(response.data);
    }).catch(error => {
      console.error('Error fetching orphanage books:', error);
    });
  }, []);
  
  useEffect(() => {
    axiosInstance
      .get("/orphanages")
      .then(response => {
        console.log(response.data);
        setOrphanages(response.data);
        setFilteredOrphanages(response.data);
      })
      .catch(error => {
        console.error("Error fetching orphanages:", error);
      });
  }, []);

  useEffect(() => {
    setFilteredOrphanages(
      orphanages
        .filter(
          orphanage =>
            orphanage.name.toLowerCase().includes(search.toLowerCase()) ||
            orphanage.address.toLowerCase().includes(search.toLowerCase()) ||
            orphanage.phone.toLowerCase().includes(search.toLowerCase()) ||
            orphanage.email.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name))
    );
  }, [search, orphanages]);

  return (
    <>
    <div className='flex flex-col'>
    <h1 className='text-2xl font-bold'>Orphanage List</h1>
        <Input
          className="w-72 max-w-xs"
          placeholder="Search"
          startContent={<SearchIcon />}
          value={search}
          onChange={e => setSearch(e.target.value)}
          border="none"
        />
        <Table color="secondary">
          <TableHead className="text-center">
            <TableHeadCell>Nama</TableHeadCell>
            <TableHeadCell>Alamat</TableHeadCell>
            <TableHeadCell>Telepon</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>Book List</TableHeadCell>
            <TableHeadCell>Books Needed</TableHeadCell>
          </TableHead>
          <TableBody>
            {filteredOrphanages.map(orphanage => (
              <TableRow key={orphanage.id} className="text-center">
                <TableCell>{orphanage.name}</TableCell>
                <TableCell>{orphanage.address}</TableCell>
                <TableCell>{orphanage.phone}</TableCell>
                <TableCell>{orphanage.email}</TableCell>
                <TableCell>{orphanage.description}</TableCell>
                <TableCell>
                    <Dropdown>
                        {Array.isArray(orphanageBooks) && orphanageBooks.map(book => (
                            <DropdownItem key={book.id}>
                                <p>{book.title}</p>
                            </DropdownItem>
                        ))}
                    </Dropdown>
                </TableCell>
                <TableCell>
                    <Dropdown>
                        {Array.isArray(orphanage.booksNeeded) && orphanage.booksNeeded.map(book => (
                            <DropdownItem key={book.id}>
                                <img src={book.image} alt={book.title} />
                                <p>{book.title}</p>
                            </DropdownItem>
                        ))}
                    </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default OrphanageList;
