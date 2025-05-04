import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LoginForm } from '@/components/login-form';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Chat Admin</h1>
          <nav>
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to access your dashboard</p>
          </div>
          
          <LoginForm />
          
          <div className="pt-4 text-center text-sm text-muted-foreground">
            <p>Demo access credentials:</p>
            <p>Email: admin@example.com | Password: password</p>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Chat Admin Dashboard
        </div>
      </footer>
    </div>
  );
}