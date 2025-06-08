
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { passwordReset, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await passwordReset(email);
      // Toast notification is handled by AuthContext
      router.push("/login"); // Redirect to login after sending the email
    } catch (error) {
      // Error toast is handled by AuthContext
      console.error("Password reset attempt failed from form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = authLoading || isSubmitting;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="you@example.com" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Send Reset Link
      </Button>
      <div className="text-center text-sm">
        <Link href="/login" passHref>
          <Button variant="link" type="button" className="p-0 h-auto text-primary hover:text-accent" disabled={isLoading}>
            Back to Sign In
          </Button>
        </Link>
      </div>
    </form>
  );
}
