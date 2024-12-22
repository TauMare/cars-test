'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css';
import Button from '@mui/material/Button';
import { v7 } from 'uuid';

export default function page() {
    const router = useRouter()

    return (
    <div className={styles.page}>
        <Button variant="contained" onClick={()=> router.push(`/order/${v7()}`)}>Create order</Button>
    </div>
    )
}
