"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, CreditCard, Bell, Shield, Palette, Zap, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PageHeader } from "@/components/shared/page-header";
import { StaggerContainer, StaggerItem } from "@/components/shared/motion";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const router = useRouter();
  const [deletePassword, setDeletePassword] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [open, setOpen] = useState(false);

  async function handleDeleteAccount() {
    setDeleteError("");
    setDeleting(true);

    const res = await fetch("/api/account/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: deletePassword }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setDeleteError(data?.error ?? "Failed to delete account. Please try again.");
      setDeleting(false);
      return;
    }

    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your account, subscription, and preferences."
      />

      <StaggerContainer className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <StaggerItem>
          <Card className="bg-card shadow-soft-md rounded-2xl border-0">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg">Account</CardTitle>
                  <CardDescription className="text-sm sm:text-base mt-0.5">Your profile and account details</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-5 px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="space-y-2">
                <label className="text-sm sm:text-base font-medium text-muted-foreground">Email</label>
                <div className="h-10 sm:h-12 rounded-xl border border-border bg-muted/30 px-3 sm:px-4 flex items-center text-sm sm:text-base text-muted-foreground">
                  Sign in to view
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm sm:text-base font-medium text-muted-foreground">Display Name</label>
                <div className="h-10 sm:h-12 rounded-xl border border-border bg-muted/30 px-3 sm:px-4 flex items-center text-sm sm:text-base text-muted-foreground">
                  Sign in to view
                </div>
              </div>
              <div className="flex items-center gap-2.5 text-sm sm:text-base text-muted-foreground">
                <Shield className="h-4 w-4" />
                Authentication powered by Supabase
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="bg-card shadow-soft-md rounded-2xl border-0">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg">Subscription</CardTitle>
                    <CardDescription className="text-sm sm:text-base mt-0.5">Your current plan and usage</CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs sm:text-base px-2 sm:px-3 py-0.5 sm:py-1">
                  Free
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-5 px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="rounded-xl border border-border bg-muted/20 p-3 sm:p-5 space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base text-muted-foreground">Listings</span>
                  <span className="text-sm sm:text-base font-medium">0 / 10</span>
                </div>
                <div className="h-2.5 rounded-full bg-border overflow-hidden">
                  <div className="h-full w-0 rounded-full bg-primary transition-all" />
                </div>
                <p className="text-xs sm:text-base text-muted-foreground">10 free listings per month</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3 sm:p-4">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                <p className="text-xs sm:text-base text-muted-foreground">
                  <span className="font-medium text-primary">Upgrade to Pro</span> for unlimited listings, competitor analysis, and priority support.
                </p>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="bg-card shadow-soft-md rounded-2xl border-0">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg">Notifications</CardTitle>
                  <CardDescription className="text-sm sm:text-base mt-0.5">Email and in-app notification preferences</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <p className="text-sm sm:text-base text-muted-foreground">
                Notification preferences coming soon.
              </p>
            </CardContent>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card className="bg-card shadow-soft-md rounded-2xl border-0">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Palette className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg">Preferences</CardTitle>
                  <CardDescription className="text-sm sm:text-base mt-0.5">Default platform, category, and display settings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-5 px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="space-y-2">
                <label className="text-sm sm:text-base font-medium text-muted-foreground">Default Platform</label>
                <div className="h-10 sm:h-12 rounded-xl border border-border bg-muted/30 px-3 sm:px-4 flex items-center text-sm sm:text-base text-muted-foreground">
                  Amazon India
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm sm:text-base font-medium text-muted-foreground">Default Category</label>
                <div className="h-10 sm:h-12 rounded-xl border border-border bg-muted/30 px-3 sm:px-4 flex items-center text-sm sm:text-base text-muted-foreground">
                  None selected
                </div>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
        <StaggerItem className="lg:col-span-2">
          <Card className="bg-card shadow-soft-md rounded-2xl border-0 border-red-200">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-red-50 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg text-red-600">Danger Zone</CardTitle>
                  <CardDescription className="text-sm sm:text-base mt-0.5">Irreversible actions on your account</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-red-200 bg-red-50/50 p-4">
                <div>
                  <p className="text-sm sm:text-base font-medium">Delete Account</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Permanently delete your account and all associated data. This cannot be undone.</p>
                </div>
                <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setDeletePassword(""); setDeleteError(""); } }}>
                  <DialogTrigger
                    render={
                      <Button
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 shrink-0"
                      />
                    }
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-red-600">Delete Account</DialogTitle>
                      <DialogDescription>
                        This will permanently delete your account, all your listings, keywords, and usage data. This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 py-2">
                      <p className="text-sm">
                        Enter your password to confirm account deletion:
                      </p>
                      <Input
                        type="password"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        placeholder="Enter your password"
                        className="text-sm"
                      />
                      {deleteError && (
                        <p className="text-sm text-red-600">{deleteError}</p>
                      )}
                    </div>
                    <DialogFooter>
                      <Button
                        variant="destructive"
                        disabled={!deletePassword || deleting}
                        onClick={handleDeleteAccount}
                      >
                        {deleting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          "Permanently Delete"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </StaggerItem>
      </StaggerContainer>
    </>
  );
}
