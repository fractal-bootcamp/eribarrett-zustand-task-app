import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

export function Welcome() {
    return (
        <main className="flex items-center justify-center pt-16 pb-4">
            <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
                <header className="flex flex-col items-center gap-9">
                    <div className="w-[500px] max-w-[100vw] p-4">
                        <img
                            src={logoLight}
                            alt="React Router"
                            className="block w-full dark:hidden"
                        />
                        <img
                            src={logoDark}
                            alt="React Router"
                            className="hidden w-full dark:block"
                        />
                    </div>
                </header>
                <div className="max-w-[300px] w-full space-y-6 px-4">
                    <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
                        <p className="leading-6 text-gray-700 dark:text-gray-200 text-center">
                            What&apos;s next?
                        </p>
                        <ul>
                            {resources.map(({ href, text, icon }) => (
                                <li key={href}>
                                    <a
                                        className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {icon}
                                        {text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </main>
    );
}

const resources = [
    {
        href: "https://reactrouter.com/docs",
        text: "React Router Docs",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M4 5L12 5M12 5C12 6.10457 12.8954 7 14 7C15.1046 7 16 6.10457 16 5C16 3.89543 15.1046 3 14 3C12.8954 3 12 3.89543 12 5ZM4 10H8M8 10C8 11.1046 8.89543 12 10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10ZM4 15H6M6 15C6 16.1046 6.89543 17 8 17C9.10457 17 10 16.1046 10 15C10 13.8954 9.10457 13 8 13C6.89543 13 6 13.8954 6 15Z" />
            </svg>
        ),
    },
    {
        href: "https://react.dev",
        text: "React Docs",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z" />
                <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" />
            </svg>
        ),
    },
]; 