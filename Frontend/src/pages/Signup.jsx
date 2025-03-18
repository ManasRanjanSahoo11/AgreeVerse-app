import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

export default function Signup() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [googleSignup, setGoogleSignup] = useState(false);

    const navigate = useNavigate();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        
        setShowRoleModal(true);
        setGoogleSignup(false);
    };

    const handleRoleSelection = async (selectedRole) => {
        setRole(selectedRole);
        setShowRoleModal(false);

        if (googleSignup) {
            // Redirect for Google OAuth with role
            window.location.href = `http://localhost:8080/auth/google?role=${selectedRole}`;
        } else {
            // Normal signup process
            const newUser = {
                username,
                email,
                phone,
                password,
                role: selectedRole,
            };
            console.log(newUser);
            
            try {
                const res = await axios.post(`http://localhost:8080/api/v1/${selectedRole}/signup`, newUser);
                if (res.data.success) {
                    console.log(res.data.message);
                    setTimeout(() => {
                        navigate('/signin');
                    }, 1000);
                }
            } catch (error) {
                console.error("Signup error:", error.response?.data || error.message);
            }
        }
    };

    return (
        <>
            <div className="fixed h-full w-full bg-neutral-900">
                <div className="absolute inset-0 bg-fuchsia-400 bg-[size:20px_20px] opacity-20 blur-[100px]"></div>
            </div>

            <section className="min-h-screen w-full absolute flex items-center justify-center px-3">
                <div className="w-full lg:w-1/3 py-10 shadow-xl rounded-lg p-6 dark:bg-gray-600">
                    <h3 className="text-3xl font-medium text-white mb-8 text-center">Create an account</h3>

                    <form className="space-y-2" method="POST" onSubmit={onSubmitHandler}>
                        <input id="username" type="text" name="username" placeholder="Enter Your Username"
                            className="bg-gray-700 text-white mt-2 w-full rounded-lg px-2 py-3 text-md focus:ring-2 focus:ring-[#FF9119]/50 focus:outline-none"
                            onChange={(e) => setUsername(e.target.value)} required />

                        <input id="email" type="email" name="email" placeholder="Enter Your Email"
                            className="bg-gray-700 text-white mt-2 w-full rounded-lg px-2 py-3 text-md focus:ring-2 focus:ring-[#FF9119]/50 focus:outline-none"
                            onChange={(e) => setEmail(e.target.value)} required />

                        <input id="phone" type="tel" name="phone" placeholder="Enter Your Phone Number"
                            className="bg-gray-700 text-white mt-2 w-full rounded-lg px-2 py-3 text-md focus:ring-2 focus:ring-[#FF9119]/50 focus:outline-none"
                            onChange={(e) => setPhone(e.target.value)} required />

                        <div className="relative">
                            <input id="password" type={passwordShown ? "text" : "password"} name="password" placeholder="Enter Your Password"
                                className="mt-2 bg-gray-700 text-white w-full h-full rounded-lg px-2 py-3 text-md focus:ring-2 focus:outline-none focus:ring-[#FF9119]/50 pr-10"
                                onChange={(e) => setPassword(e.target.value)} required />
                            <button type="button" onClick={() => setPasswordShown(!passwordShown)}
                                className="absolute inset-y-8 right-0 flex items-center pr-3">
                                {passwordShown ? <EyeIcon className="h-5 w-5 text-gray-500" /> : <EyeSlashIcon className="h-5 w-5 text-gray-500" />}
                            </button>
                        </div>

                        <button type="submit"
                            className="w-full text-black font-medium py-2.5 rounded-lg bg-[#FF9119] hover:bg-transparent hover:border-2 hover:border-[#FF9119] border-2 border-[#FF9119] hover:text-white focus:ring-2 focus:outline-none">
                            Sign Up
                        </button>

                        <div className="flex items-center">
                            <hr className="flex-grow border-gray-300" />
                            <span className="px-3 text-gray-500 text-sm">OR</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>

                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-2 border-2 border-gray-300 py-2.5 rounded-lg text-md text-white hover:cursor-pointer focus:ring-gray-200 hover:bg-[#FF9119] hover:text-black focus:ring-2 focus:outline-none font-medium px-6 transition duration-300 ease-in-out"
                            onClick={() => {
                                setGoogleSignup(true);  // Set Google login flag
                                setShowRoleModal(true); // Show role selection modal
                            }}
                        >
                            <img
                                src="https://www.material-tailwind.com/logos/logo-google.png"
                                alt="Google"
                                className="h-5 w-5"
                            />
                            Sign Up with Google
                        </button>

                    </form>
                </div>
            </section>

            {/* Role Selection Modal */}
            {showRoleModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center">
                    <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                        <h3 className="text-lg font-semibold mb-4">Select Your Role</h3>
                        <div className="grid grid-cols-2 gap-5">
                            <button onClick={() => handleRoleSelection("admin")}
                                className="py-2.5 px-5 hover:cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600">
                                Admin
                            </button>
                            <button onClick={() => handleRoleSelection("coordinator")}
                                className="py-2.5 px-5 hover:cursor-pointer bg-green-500 text-white rounded hover:bg-green-600">
                                Coordinator
                            </button>
                            <button onClick={() => handleRoleSelection("farmer")}
                                className="py-2.5 px-5 hover:cursor-pointer bg-yellow-500 text-white rounded hover:bg-yellow-600">
                                Farmer
                            </button>
                            <button onClick={() => handleRoleSelection("user")}
                                className="py-2.5 px-5 hover:cursor-pointer bg-red-500 text-white rounded hover:bg-red-600">
                                User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}