

export default function Login() {
    return (
        <section className="window-size flex flex-col justify-center items-center mt-4 bg-shark-200 dark:bg-darkBg rounded-2xl">
            <h1 className="text-7xl text-darkBg dark:text-white font-bold tracking-tighter mb-4">chappy.</h1>
            <form className="flex flex-col justify-center items-center w-1/4 mx-auto gap-2 text-white">
                <input type="text" className="input" placeholder="Username"/>
                <input type="password" className="input"  placeholder="Password"/>
                <p className="text-center">If you don't have and account you can create it <a className="text-accent" href="#">here</a>.</p>
                <button className="button">Login</button>
            </form>
        </section>
    )
}