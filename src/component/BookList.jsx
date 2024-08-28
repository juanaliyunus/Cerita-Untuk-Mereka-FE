import React, { useEffect, useState } from 'react'
import axiosInstance from '../lib/axiosInstance'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import { Input } from '@nextui-org/react'
import SearchIcon from '../assets/SearchIcon'


function BookList() {
    const [books, setBooks] = useState([])
    const [search, setSearch] = useState('')
    const [filteredBooks, setFilteredBooks] = useState([])

    useEffect(() => {
        axiosInstance.get('/books').then((res) => {
            setBooks(res.data)
            setFilteredBooks(res.data) // Set filteredBooks saat data pertama kali diambil
        })
    }, [])

    useEffect(() => {
        const filtered = books.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()))
        setFilteredBooks(filtered)
    }, [search, books])

  return (
    <>
    <div className='flex flex-col mt-10'>
    <h1 className='text-2xl font-bold'>Book List</h1>
        <Table>
            <TableHead>
                <TableHeadCell>Title</TableHeadCell>
                <TableHeadCell>Description</TableHeadCell>
                <TableHeadCell>Image</TableHeadCell>
            </TableHead>
            <TableBody>
                {filteredBooks.map((book) => (
                    <TableRow key={book.id}>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.description}</TableCell>
                        <TableCell><img src={book.image} alt={book.title} /></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
    </>
  )
}

export default BookList