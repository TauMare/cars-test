'use client'

import Form from "@/components/form/Form";
import socket from "@/app/api/socket";
import { useEffect, useState } from "react";
import SecondForm from "@/components/secondForm/SecondForm";

export default function SocketWrapper({params}:{params:{slug:string}}) {
  const [form, setForm] = useState(false);

  useEffect(()=>{
    if (!form) {
      socket.connect();
      socket.emit('register', params.slug)
      socket.on('orderStatusUpdate', (data)=>{
        if (data.status === 'active') {
          socket.disconnect();
          setForm(true)
        }
      })
      const interval = setInterval(()=>{
        socket.emit('orderStatusRequest', {uuid: params.slug})
      }, 3000)
      return (()=>{
        socket.disconnect();
        if (interval) {clearInterval(interval);}
      })
    }
    
  }, [form, params.slug])

  return (
    <>
      {!form ? <Form uuid={params.slug}/> : <SecondForm uuid={params.slug}/>}
    </>
  )
}
