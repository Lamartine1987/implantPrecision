"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Simulate password reset request
    toast({
      title: "Password Reset Email Sent",
      description: "If an account exists for this email, you will receive reset instructions.",
    });
    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="you@example.com" required />
      </div>
      <Button type="submit" className="w-full">
        Send Reset Link
      </Button>
      <div className="text-center text-sm">
        <Link href="/login" passHref>
          <Button variant="link" type="button" className="p-0 h-auto text-primary hover:text-accent">
            Back to Sign In
          </Button>
        </Link>
      </div>
    </form>
  );
}
