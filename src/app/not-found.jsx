const NotFound = () => {
    return (
        <>
            <div className="grid h-screen place-content-center bg-gray-800 px-4">
                <div className="text-center">
                    <h1 className="text-9xl font-black text-color-secondary">4<span className="text-gray-200">0</span>4</h1>

                    <p className="text-2xl font-bold tracking-tight text-color-secondary sm:text-4xl">Uh-oh!</p>

                    <p className="mt-4 text-gray-200">We can't find that page.</p>

                    <a
                        href="/"
                        className="mt-6 inline-block rounded bg-color-secondary px-5 py-3 text-sm font-medium text-white hover:scale-110 duration-1000 outline-none"
                    >
                        Go Back Home
                    </a>
                </div>
            </div>
        </>
    )
}

export default NotFound