import React from 'react'
import { CircleX } from 'lucide-react'
import Link from 'next/link'
export default function SearchReset() {
    const reset = () => {
        const form = document.querySelector("#formSearch") as HTMLFormElement;
        if (form) form.reset();
        
      };
  return (
    <button onClick={reset} type='reset'>
        <Link href={'/'}>
        <CircleX className="size-5"></CircleX>

        </Link>
        
    </button>
  )
}
