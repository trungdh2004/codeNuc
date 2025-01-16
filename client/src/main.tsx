import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "./components/ui/sonner.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { appConfig } from "./config/appConfig.ts";
import { AuthProvider } from "./context/AuthProvider.tsx";
import QueryProvider from "./context/QueryProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<QueryProvider>
		<GoogleOAuthProvider clientId={appConfig.CLIENT_ID}>
			<AuthProvider>
				<App />
			</AuthProvider>
			<Toaster richColors />
		</GoogleOAuthProvider>
	</QueryProvider>,
);
