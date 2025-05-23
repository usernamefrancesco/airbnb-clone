import React from 'react'
import Link from 'next/link'

export default function CasaNonTrovata() {
  return (
    <div className='flex h-screen justify-center items-center  flex-col gap-3'>
        <h1 className='text-2xl font-semibold'>
            Casa non trovata {':('}
        </h1>
        <Link href='/' className='border-2 border-black p-2 rounded-2xl'>
        Remove all filters
        </Link>
    </div>
  )
}
