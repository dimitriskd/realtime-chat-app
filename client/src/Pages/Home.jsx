import Chat from "../Components/Chat Window/Chat"

export default function Home() {
    
    
    return (
        <main className="window-size mt-3 bg-shark-200 dark:bg-darkBg rounded-2xl flex">
            <section className="rounded-l-2xl w-2/6 h-full bg-shark-300 dark:bg-chatsBg">
                
            </section>
            <section className="w-full h-full border-l border-cod-gray-900">
                <Chat />
            </section>
        </main>
    )
}