import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/edu/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Moon, Sun, Bell, Globe, Shield, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({ component: Settings });

function Settings() {
  const [dark, setDark] = useState(true);

  const toggleTheme = (v: boolean) => {
    setDark(v);
    document.documentElement.classList.toggle("light", !v);
  };

  return (
    <AppShell title="Settings" subtitle="Manage your account preferences.">
      <Card className="glass p-6">
        <div className="flex items-center gap-3">
          {dark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          <div className="flex-1">
            <div className="font-semibold">Appearance</div>
            <div className="text-xs text-muted-foreground">Toggle between dark and light theme.</div>
          </div>
          <Switch checked={dark} onCheckedChange={toggleTheme} />
        </div>
      </Card>

      <Card className="glass p-6">
        <div className="mb-4 flex items-center gap-2"><Bell className="h-5 w-5" /><h3 className="font-display text-lg font-semibold">Notifications</h3></div>
        <div className="space-y-4">
          {[
            ["Daily learning reminders", true],
            ["Streak alerts", true],
            ["Course recommendations", false],
            ["Marketing emails", false],
          ].map(([l, d]) => (
            <div key={l as string} className="flex items-center justify-between">
              <span className="text-sm">{l as string}</span>
              <Switch defaultChecked={d as boolean} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="glass p-6">
        <div className="mb-4 flex items-center gap-2"><Globe className="h-5 w-5" /><h3 className="font-display text-lg font-semibold">Language & Region</h3></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Language</Label>
            <Select defaultValue="en"><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="hi">हिन्दी</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Timezone</Label>
            <Select defaultValue="ist"><SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ist">IST (UTC+5:30)</SelectItem>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="pst">PST</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="glass p-6">
        <div className="mb-4 flex items-center gap-2"><Shield className="h-5 w-5" /><h3 className="font-display text-lg font-semibold">Privacy & Security</h3></div>
        <div className="space-y-4">
          <div><Label>Email</Label><Input defaultValue="alex@edumind.ai" className="mt-1.5" /></div>
          <div><Label>New password</Label><Input type="password" placeholder="••••••••" className="mt-1.5" /></div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Two-factor authentication</span>
            <Switch />
          </div>
          <Button onClick={()=>toast.success("Settings saved")} className="gradient-primary text-primary-foreground">Save changes</Button>
        </div>
      </Card>

      <Card className="glass border-destructive/30 p-6">
        <div className="mb-2 flex items-center gap-2 text-destructive"><Trash2 className="h-5 w-5" /><h3 className="font-display text-lg font-semibold">Danger zone</h3></div>
        <p className="text-sm text-muted-foreground">Permanently delete your account and all associated learning data.</p>
        <Button variant="destructive" className="mt-4">Delete account</Button>
      </Card>
    </AppShell>
  );
}
