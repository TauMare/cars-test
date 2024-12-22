import styles from './page.module.css';
import { validate } from 'uuid';
import { notFound } from 'next/navigation';
import SocketWrapper from './SocketWrapper';


export default async function page({ params }: { params: Promise<{slug: string}> }) {
    const prop = await params;
    if (!validate(prop.slug)) {
        return notFound();
    };

    return (
    <div className={styles.page}>
        <main className={styles.main}>
            <SocketWrapper params={prop}/>
        </main>
    </div>
    )
}
