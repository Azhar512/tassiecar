import React, { Component, ErrorInfo, ReactNode } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Layout>
                    <div className="container-custom py-24 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
                            <AlertTriangle className="w-10 h-10 text-destructive" />
                        </div>
                        <h1 className="font-display text-4xl font-bold text-foreground mb-4">
                            Something went wrong
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-lg mb-10">
                            We apologize for the inconvenience. A professional error has occurred.
                            Please try refreshing the page or contact support if the problem persists.
                        </p>
                        <div className="flex gap-4">
                            <Button
                                variant="hero"
                                size="lg"
                                onClick={() => window.location.reload()}
                            >
                                <RefreshCcw className="w-4 h-4 mr-2" />
                                Refresh Page
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <a href="/">Go to Homepage</a>
                            </Button>
                        </div>
                    </div>
                </Layout>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
