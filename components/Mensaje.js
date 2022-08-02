export default function Mensaje({ tipo, mensaje }) {

    return (
        <div className={`${tipo === false ? 'bg-red-100 border border-red-400 text-red-700' : 'bg-green-100 border border-green-400 text-green-700'} px-4 py-3 rounded relative`} role="alert">
            <strong className="font-bold">{ tipo === false ? 'Error' : 'Éxito'}</strong>
            <span className="block sm:inline">{mensaje}</span>
        </div>
    )
}