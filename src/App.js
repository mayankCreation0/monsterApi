import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from "../src/components/ui/toaster";
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { ThemeProvider } from './Context/ThemeContext';
import ThirdParty, { Github, Google, Facebook, Apple } from "supertokens-auth-react/recipe/thirdparty";
import './global.css';
import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui';
import * as reactRouterDom from "react-router-dom";
import { ThirdPartyPreBuiltUI } from 'supertokens-auth-react/recipe/thirdparty/prebuiltui';

import EmailPasswordAuth from 'supertokens-auth-react/recipe/emailpassword';
import Session from 'supertokens-auth-react/recipe/session';

SuperTokens.init({
  appInfo: {
    appName: "ImageUploader",
    apiDomain: "https://monster-api-backend.vercel.app",
    websiteDomain: "https://monster-api-frontend.vercel.app",
    apiBasePath: "/auth",
    websiteBasePath: "/auth"
  },
  recipeList: [
    ThirdParty.init({
      signInAndUpFeature: {
        providers: [
          Github.init(),
          Google.init(),
          Facebook.init(),
          Apple.init(),
        ]
      }
    }),
    EmailPasswordAuth.init(),
    Session.init()
  ]
});

function App() {
  return (
    <SuperTokensWrapper>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [ThirdPartyPreBuiltUI,EmailPasswordPreBuiltUI])}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
            <Toaster />
          </div>
        </Router>
      </ThemeProvider>
    </SuperTokensWrapper>
  );
}

export default App;