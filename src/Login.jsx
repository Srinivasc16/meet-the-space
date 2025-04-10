import './login.css';
import { auth, googleProvider } from './firebaseConfig.js';
import { signInWithPopup } from 'firebase/auth';

function Login() {
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            localStorage.setItem("userName", user.displayName || "Login");

            window.location.href = "/meet-the-space/kids";


        } catch (error) {
            console.error("Google Sign-In Error:", error.message);
        }
    };

    return (
        <div className="login-container">
            <form className="form" onSubmit={(e) => e.preventDefault()}>
                <h2>Login</h2>
                <p className="p line">Login With</p>
                <div className="flex-row">
                    <button type="button" className="btn google" onClick={handleGoogleLogin}>
                        <svg width="40px" height="30px" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                            <path fill="#4285F4" d="M255.878 133.451..."/>
                            <path fill="#34A853" d="M130.55 261.1c35.248 0..."/>
                            <path fill="#FBBC05" d="M56.281 156.37c-2.756..."/>
                            <path fill="#EB4335" d="M130.55 50.479c24.514 0..."/>
                        </svg>
                        Sign in with Google
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
