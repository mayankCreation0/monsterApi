import React from 'react';
import { SignInAndUp } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

const Login = () => {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-80px)]">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
                </CardHeader>
                <CardContent>
                    <SignInAndUp />
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;