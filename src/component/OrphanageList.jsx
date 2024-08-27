import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function OrphanageList() {
  const navigate = useNavigate();
  return (
    <>
    <h1 className="text-center text-2xl font-bold mt-5">
          Cerita Untuk Mereka
        </h1>
    <div className="flex flex-wrap items-center justify-center mt-6">
    <div className="flex flex-row gap-5 max-w-screen-xl">
      <Card className="max-w-sm max-h-full bg-sky-500 font-semibold" >
        <CardHeader>
          <img onClick={() => navigate('/orphanage/1')} src={"https://o-cdn-cas.sirclocdn.com/parenting/images/panti_asuhan-.width-800.format-webp.webp"} alt="Orphanage" className="w-full h-full object-cover rounded-t-lg cursor-pointer" />
        </CardHeader>
        <CardBody>
          <h1 onClick={() => navigate('/orphanage/1')} className="cursor-pointer">Panti Asuhan 1</h1>
          <p className="font-light">
            Panti Asuhan 1 adalah tempat yang menyediakan asuhan bagi anak-anak yang tidak memiliki keluarga.
          </p>
        </CardBody>
        <CardFooter className="flex flex-col gap-2 font-light justify-start items-stretch">
          <h1>Jl. Raya Kedungjaya No. 123, Kedungjaya, Jawa Timur</h1>
          <h1>081234567890</h1>
          <h1>panti1@gmail.com</h1>
        </CardFooter>
      </Card>
      <Card className="max-w-sm max-h-full bg-sky-500 font-semibold">
        <CardHeader>
          <img onClick={() => navigate('/orphanage/2')} src={"https://www.sahabatyatim.com/wp-content/uploads/2021/05/kegiatan-ke-panti-asuhan.jpg"} alt="Orphanage" className="w-full h-full object-cover rounded-t-lg cursor-pointer" />
        </CardHeader>
        <CardBody>
          <h1 onClick={() => navigate('/orphanage/2')} className="cursor-pointer">Panti Asuhan 2</h1>
          <p className="font-light">
            Panti Asuhan 2 adalah tempat yang menyediakan asuhan bagi anak-anak yang tidak memiliki keluarga.
          </p>
        </CardBody>
        <CardFooter className="flex flex-col gap-2 font-light justify-start items-stretch">
          <h1>Jl. Raya Kedungjaya No. 123, Kedungjaya, Jawa Timur</h1>
          <h1>081234567890</h1>
          <h1>panti1@gmail.com</h1>
        </CardFooter>
      </Card>
      <Card className="max-w-sm max-h-full bg-sky-500 font-semibold">
        <CardHeader>
          <img onClick={() => navigate('/orphanage/3')} src={"https://yiim.or.id/wp-content/uploads/2021/04/panti.jpg"} alt="Orphanage" className="w-full h-full object-cover rounded-t-lg cursor-pointer" />
        </CardHeader>
        <CardBody>
          <h1 onClick={() => navigate('/orphanage/3')} className="cursor-pointer">Panti Asuhan 3</h1>
          <p className="font-light">
            Panti Asuhan 3 adalah tempat yang menyediakan asuhan bagi anak-anak yang tidak memiliki keluarga.
          </p>
        </CardBody>
        <CardFooter className="flex flex-col gap-2 font-light justify-start items-stretch">
          <h1>Jl. Raya Kedungjaya No. 123, Kedungjaya, Jawa Timur</h1>
          <h1>081234567890</h1>
          <h1>panti1@gmail.com</h1>
        </CardFooter>
      </Card>
    </div>
  </div>
  </>
  )
}

export default OrphanageList