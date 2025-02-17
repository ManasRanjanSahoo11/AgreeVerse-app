import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

export default function Signin() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [role, setRole] = useState('')

    //   const navigate = useNavigate()

    return (
        <>
            <div className="fixed h-full w-full bg-neutral-900"><div className="absolute inset-0 bg-fuchsia-400 bg-[size:20px_20px] opacity-20 blur-[100px]"></div></div>

            <section className="min-h-screen w-full absolute flex items-center justify-center px-3">
                <div className="w-full lg:w-1/3 py-10 shadow-xl rounded-lg p-6 dark:bg-gray-600">
                    <h3 className="text-3xl font-medium text-white mb-10 text-center">Hi, Welcome Back! 👋</h3>
        
                    <form className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-md font-medium text-white">
                                Your Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="name@gmail.com"
                                className=" bg-gray-700 text-white mt-2 w-full rounded-lg border-gray-300 px-2 py-3 text-md focus:ring-2 focus:ring-[#FF9119]/50 focus:outline-none"
                                required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block text-md font-medium text-white">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={passwordShown ? "text" : "password"}
                                    name="password"
                                    placeholder="********"
                                    className="mt-2 bg-gray-700 text-white w-full h-full rounded-lg border-gray-300 px-2 py-3 text-md shadow-sm focus:ring-2 focus:outline-none focus:ring-[#FF9119]/50 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordShown((prev) => !prev)}
                                    className="absolute inset-y-8 right-0 flex items-center pr-3"
                                >
                                    {passwordShown ? (
                                        <EyeIcon className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-md font-medium text-white">
                                Select Role *
                            </label>
                            <div className="relative">
                                <select
                                    id="role"
                                    name="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="mt-2 bg-gray-700 text-white w-full rounded-lg border-gray-300 px-2 py-3 text-md shadow-sm focus:ring-2 focus:outline-none focus:ring-[#FF9119]/50 appearance-none pr-10"
                                    required
                                >
                                    <option value="" disabled>Select your role</option>
                                    <option value="admin">Admin</option>
                                    <option value="coordinator">Coordinator</option>
                                    <option value="farmer">Farmer</option>
                                    <option value="user">User</option>
                                </select>

                                {/* Dropdown Icon */}
                                <div className="absolute inset-y-8 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full text-black font-medium py-2.5 rounded-lg focus:ring-blue-200 transition duration-300 ease-in-out bg-[#FF9119] hover:bg-transparent hover:border-2 hover:border-[#FF9119] border-2 border-[#FF9119] hover:bg-[#FF9119] hover:text-white focus:ring-2 focus:outline-none focus:ring-[#FF9119]/50"
                            onSubmit={() => { navigate('/admin') }}
                        >
                            Sign In
                        </button>

                        <div className="flex items-center">
                            <hr className="flex-grow border-gray-300" />
                            <span className="px-3 text-gray-500 text-sm">OR</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>

                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-2 border-2 border-gray-300 py-2.5 rounded-lg text-md text-white focus:ring-gray-200 hover:bg-[#FF9119] hover:text-black focus:ring-2 focus:outline-none focus:ring-[#FF9119]/50 font-medium px-6 transition duration-300 ease-in-out"
                        >
                            <img
                                src="https://www.material-tailwind.com/logos/logo-google.png"
                                alt="Google"
                                className="h-5 w-5"
                            />
                            Sign in with Google
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
}
