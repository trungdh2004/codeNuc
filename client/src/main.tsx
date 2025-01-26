import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { appConfig } from "./config/appConfig.ts";
import { AuthProvider } from "./context/AuthProvider.tsx";
import QueryProvider from "./context/QueryProvider.tsx";
import "./index.css";
import "./config/multilingual.ts";

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
