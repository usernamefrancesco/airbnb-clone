
'use client'
import { formDate } from '@/lib/utils'
import { DatabaseIcon } from 'lucide-react'
import React from 'react'
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'timeago-react'


export default function TimeAgoLol(date: any) {

  return (
    <>
        
        <TimeAgo 
        datetime ={date.date}
        />
    </>
  )
}
