"use client"

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ExamplePage() {
  useEffect(() => {
    // Load the widget script
    const script = document.createElement('script');
    script.src = '/widget.js';
    script.async = true;
    script.onload = () => {
      // Initialize the widget with custom options
      if (window.initChatWidget) {
        window.initChatWidget({
          title: 'Chat Support',
          subtitle: 'We typically reply within a few minutes',
          position: 'bottom-right',
          primaryColor: '#3B82F6',
          welcomeMessage: 'Hello! This is a demo of our embeddable chat widget. Feel free to try it out!',
        });
      }
    };
    document.body.appendChild(script);
    
    return () => {
      // Clean up
      document.body.removeChild(script);
      const widgetRoot = document.getElementById('chat-widget-root');
      if (widgetRoot) {
        document.body.removeChild(widgetRoot);
      }
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Example Website</h1>
          <nav className="flex gap-4">
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto py-12 px-4">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to Our Demo</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            This page demonstrates how the chat widget appears when embedded on a website.
            Try clicking the chat icon in the bottom right corner.
          </p>
        </section>
        
        <section className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-2">Easy Integration</h3>
            <p className="text-muted-foreground">
              Integrate our chat widget with just a simple script tag. No complex setup required.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
            <p className="text-muted-foreground">
              Intelligent responses powered by advanced AI models to help your customers instantly.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-2">Fully Customizable</h3>
            <p className="text-muted-foreground">
              Match your brand by customizing colors, texts, and positioning of the widget.
            </p>
          </div>
        </section>
        
        <section className="mb-12 bg-card p-8 rounded-lg border">
          <h2 className="text-2xl font-bold mb-4">How to Integrate</h2>
          <p className="mb-4">Add the following code to your website to embed the chat widget:</p>
          
          <div className="bg-muted p-4 rounded-md mb-4 overflow-x-auto">
            <pre className="text-sm">
{`<script>
  (function(w,d,s,o,f,js,fjs){
    w['ChatWidget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','cw','https://example.com/widget.js'));
  cw('init', {
    title: 'Chat Support',
    subtitle: 'We typically reply within a few minutes',
    position: 'bottom-right',
    primaryColor: '#3B82F6',
    welcomeMessage: 'Hello! How can I help you today?'
  });
</script>`}
            </pre>
          </div>
          
          <p className="text-muted-foreground">
            Place this code just before the closing &lt;/body&gt; tag of your HTML.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">View the Dashboard</h2>
          <p className="mb-6">
            Check out the admin dashboard to see all conversations and analytics.
          </p>
          <Link href="/dashboard">
            <Button size="lg">
              Go to Dashboard
            </Button>
          </Link>
        </section>
      </main>
      
      <footer className="bg-card border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} Chat Widget Demo
          </p>
        </div>
      </footer>
    </div>
  );
}