'use client'
import { InputLabel, TextField, Button } from '@mui/material'
import styles from '../form/Form.module.css';
import { prop } from '../form/IForm';

export default function SecondForm({uuid}:prop) {
    const submit = async (data:FormData) => {
        const details = data.get('details');
        if (details) {
            await fetch(
                'http://localhost:3001/order/addData',
                {
                  method: 'POST',
                  mode: 'cors',
                  headers: {
                    'Access-Control-Allow-Origin': '<origin>',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    car: details,
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
        <h3>It`s great you are with us! Tell us about your car below</h3>
        <div className="input-group">
            <InputLabel shrink htmlFor="name">Car details</InputLabel>
            <TextField style={{width: '100%'} } name='details' id="details" label="Subaru Forester WRX STI 2028" variant="outlined"/>
        </div>
        
        <Button variant="contained" type="submit">Send</Button>
    </form>
    )
}
