'use client'
import { InputLabel, TextField, Button } from '@mui/material'
import styles from './Form.module.css';
import { prop } from './IForm';

export default function Form({uuid}:prop) {
    const submit = async (data:FormData) => {
        const phone = data.get('phone');
        const name = data.get('name');
        if (phone && name) {
            await fetch(
                'http://localhost:3001/order/create',
                {
                  method: 'POST',
                  mode: 'cors',
                  headers: {
                    'Access-Control-Allow-Origin': '<origin>',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name: name,
                    phone: phone,
                    uuid: uuid
                  }),
                },
            );
            return;
        }
        console.log('Микрохэндлинг ошибки, базовая валидация')
    }

    return (
    <form className={styles.form} action={submit}>
        <h3>Enter your data so we can accept your order</h3>
        <div className="input-group">
            <InputLabel shrink htmlFor="name">Name</InputLabel>
            <TextField style={{width: '100%'} } name='name' id="name" label="John" variant="outlined"/>
        </div>
        <div className="input-group">
            <InputLabel shrink htmlFor="phone">Cell number</InputLabel>
            <TextField style={{width: '100%'}} name='phone' id="phone" label="+1 (555) 123-4567" variant="outlined"/>
        </div>
        
        <Button variant="contained" type="submit">Send</Button>
    </form>
    )
}
