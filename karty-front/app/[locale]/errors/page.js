import { errors } from "@/app/actions";

export default async function LogsPage() {

    const errorsData = await errors();

    return (
        <div>
            <h1 className='page-title'>Logs</h1>
            <pre>
                {errorsData}
            </pre>
        </div>
    );
}
