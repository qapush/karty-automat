import { errors } from "@/app/actions";

export default async function LogsPage() {

    const errorsData = await errors();

    return (
        <div>
            <h1 className='page-title'>Errors list</h1>
            <pre> 
                {errorsData}
            </pre>
        </div>
    );
}
 