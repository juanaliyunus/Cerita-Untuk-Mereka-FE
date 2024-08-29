import React from 'react'
import SideBar from '../../component/SideBar'
import { Button, Label } from 'flowbite-react'
import { Card, CardBody, CardHeader, Input } from '@nextui-org/react'

function RequestBook() {
  return (
    <>
    <div className="flex h-screen items-start">
        <SideBar />
        <div className="flex-grow flex-wrap p-4">
        <Card className='w-full sm:w-2/3 md:w-1/3 ml-auto mr-auto mt-10'>
            <CardHeader className='flex justify-center items-center'>
                <h1 className='text-2xl font-bold'>Request Buku</h1>
            </CardHeader>
            <CardBody className='flex justify-center items-center'>
            <div className='flex '>
                <form className='flex flex-col gap-2'>
                    <div className='flex flex-row gap-2 items-center'>
                        <Label className='w-32'>Category</Label>
                        <Input type="text" placeholder='Category' className='w-full p-2 rounded-md' />
                    </div>
                    
                    <div className='flex flex-row gap-2 items-center'>
                        <Label className='w-32'>Jumlah Buku</Label>
                        <Input type="number" placeholder='Jumlah Buku' className='w-full p-2 rounded-md' />
                    </div>
                    <Button type="submit" className='w-full p-2 rounded-md'>Request</Button>
                </form>
            </div>
            </CardBody>
        </Card>
        </div>
    </div>
    </>
  )
}

export default RequestBook