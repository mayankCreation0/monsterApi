import React from 'react';
import { Link } from 'react-router-dom';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { signOut } from 'supertokens-auth-react/recipe/emailpassword';
import { Button } from "../components/ui/button";
import { useTheme } from '../Context/ThemeContext';
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
    const session = useSessionContext();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="bg-background border-b border-border">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="text-2xl font-bold">ImageUploader</Link>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" onClick={toggleTheme}>
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>
                        {session.loading ? (
                            <Button disabled>Loading...</Button>
                        ) : session.doesSessionExist ? (
                            <Button onClick={() => signOut()}>Sign Out</Button>
                        ) : (
                            <Link to="/auth">
                                <Button>Sign In</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;