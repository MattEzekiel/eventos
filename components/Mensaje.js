export default function Mensaje({ tipo, mensaje }) {

    return (
        <div className={`${tipo === false ? 'flex flex-col bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'} px-4 py-3 rounded relative`} role="alert">
            <b className="font-bold w-full block">{ tipo === false ? 'Error' : 'Éxito'}</b>
            <span className="block sm:inline">{mensaje}</span>
        </div>
    )
}