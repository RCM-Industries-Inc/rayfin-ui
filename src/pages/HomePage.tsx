import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AppShell } from '@/components/rcm/app-shell';

/** Minimal starter page that demonstrates the required shared app chrome. */
export function HomePage() {
  return (
    <AppShell title="Blank App" subtitle="RCM Rayfin starter">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Start building</CardTitle>
          <CardDescription>The shared shell, theme, and authentication are ready.</CardDescription>
        </CardHeader>
        <CardContent>
          Add app-specific routes and content here. Promote reusable patterns back to rayfin-ui.
        </CardContent>
      </Card>
    </AppShell>
  );
}
