"use client"

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { WidgetPreview } from '@/components/dashboard/widget-preview';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    general: {
      widgetTitle: 'Chat Support',
      widgetSubtitle: 'We typically reply within a few minutes',
      welcomeMessage: 'Hello! How can I help you today?',
      primaryColor: '#3B82F6',
      widgetPosition: 'bottom-right',
    },
    notifications: {
      emailNotifications: true,
      desktopNotifications: true,
      notifyOnNewConversation: true,
      notifyOnResponses: true,
    },
    security: {
      privateMode: false,
      enableDataCollection: true,
      storeConversationHistory: true,
    }
  });
  
  const [isSaving, setIsSaving] = useState(false);
  
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      general: {
        ...settings.general,
        [name]: value,
      },
    });
  };
  
  const handleToggleChange = (section: 'notifications' | 'security', name: string, checked: boolean) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [name]: checked,
      },
    });
  };
  
  const handlePositionChange = (position: string) => {
    setSettings({
      ...settings,
      general: {
        ...settings.general,
        widgetPosition: position,
      },
    });
  };
  
  const saveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: 'Settings saved',
        description: 'Your changes have been applied successfully.',
      });
    }, 1000);
  };
  
  const copyEmbedCode = () => {
    const embedCode = `<script>
  (function(w,d,s,o,f,js,fjs){
    w['ChatWidget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','cw','https://example.com/widget.js'));
  cw('init', {
    title: '${settings.general.widgetTitle}',
    subtitle: '${settings.general.widgetSubtitle}',
    position: '${settings.general.widgetPosition}',
    primaryColor: '${settings.general.primaryColor}',
    welcomeMessage: '${settings.general.welcomeMessage}'
  });
</script>`;
    
    navigator.clipboard.writeText(embedCode).then(() => {
      toast({
        title: 'Copied to clipboard',
        description: 'Embed code has been copied to your clipboard.',
      });
    });
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your chat widget and dashboard settings.
          </p>
        </div>
        
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">Widget Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security & Privacy</TabsTrigger>
            <TabsTrigger value="embed">Embed Code</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Widget Appearance</CardTitle>
                    <CardDescription>
                      Customize how your chat widget looks on your website.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="widgetTitle">Widget Title</Label>
                      <Input 
                        id="widgetTitle"
                        name="widgetTitle"
                        value={settings.general.widgetTitle}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="widgetSubtitle">Widget Subtitle</Label>
                      <Input 
                        id="widgetSubtitle"
                        name="widgetSubtitle"
                        value={settings.general.widgetSubtitle}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="welcomeMessage">Welcome Message</Label>
                      <Input 
                        id="welcomeMessage"
                        name="welcomeMessage"
                        value={settings.general.welcomeMessage}
                        onChange={handleGeneralChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex gap-2">
                        <div 
                          className="h-10 w-10 rounded-md border" 
                          style={{ backgroundColor: settings.general.primaryColor }}
                        />
                        <Input 
                          id="primaryColor"
                          name="primaryColor"
                          value={settings.general.primaryColor}
                          onChange={handleGeneralChange}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Widget Position</Label>
                      <div className="flex gap-4">
                        <div 
                          className={`border p-4 rounded-md cursor-pointer ${
                            settings.general.widgetPosition === 'bottom-right' 
                              ? 'border-primary bg-primary/10' 
                              : ''
                          }`}
                          onClick={() => handlePositionChange('bottom-right')}
                        >
                          <div className="h-16 w-24 bg-muted relative">
                            <div className="h-4 w-4 rounded-full bg-primary absolute bottom-2 right-2"></div>
                          </div>
                          <p className="text-center text-sm mt-2">Bottom Right</p>
                        </div>
                        
                        <div 
                          className={`border p-4 rounded-md cursor-pointer ${
                            settings.general.widgetPosition === 'bottom-left' 
                              ? 'border-primary bg-primary/10' 
                              : ''
                          }`}
                          onClick={() => handlePositionChange('bottom-left')}
                        >
                          <div className="h-16 w-24 bg-muted relative">
                            <div className="h-4 w-4 rounded-full bg-primary absolute bottom-2 left-2"></div>
                          </div>
                          <p className="text-center text-sm mt-2">Bottom Left</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Button 
                  onClick={saveSettings} 
                  className="w-full"
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving Changes...' : 'Save Changes'}
                </Button>
              </div>
              
              <div>
                <Card className="border-dashed">
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>
                      This is how your chat widget will appear to visitors.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center min-h-[400px]">
                    <WidgetPreview settings={settings.general} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <Switch
                    id="emailNotifications"
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => 
                      handleToggleChange('notifications', 'emailNotifications', checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="desktopNotifications">Desktop Notifications</Label>
                  <Switch
                    id="desktopNotifications"
                    checked={settings.notifications.desktopNotifications}
                    onCheckedChange={(checked) => 
                      handleToggleChange('notifications', 'desktopNotifications', checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="notifyOnNewConversation">Notify on New Conversations</Label>
                  <Switch
                    id="notifyOnNewConversation"
                    checked={settings.notifications.notifyOnNewConversation}
                    onCheckedChange={(checked) => 
                      handleToggleChange('notifications', 'notifyOnNewConversation', checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="notifyOnResponses">Notify on Responses</Label>
                  <Switch
                    id="notifyOnResponses"
                    checked={settings.notifications.notifyOnResponses}
                    onCheckedChange={(checked) => 
                      handleToggleChange('notifications', 'notifyOnResponses', checked)
                    }
                  />
                </div>
                
                <Button onClick={saveSettings} disabled={isSaving}>
                  {isSaving ? 'Saving Changes...' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security & Privacy Settings</CardTitle>
                <CardDescription>
                  Manage data collection and privacy settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="privateMode">Private Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Disable all data collection and tracking.
                    </p>
                  </div>
                  <Switch
                    id="privateMode"
                    checked={settings.security.privateMode}
                    onCheckedChange={(checked) => 
                      handleToggleChange('security', 'privateMode', checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="enableDataCollection">Enable Data Collection</Label>
                    <p className="text-sm text-muted-foreground">
                      Collect usage data to improve the service.
                    </p>
                  </div>
                  <Switch
                    id="enableDataCollection"
                    checked={settings.security.enableDataCollection}
                    onCheckedChange={(checked) => 
                      handleToggleChange('security', 'enableDataCollection', checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <div>
                    <Label htmlFor="storeConversationHistory">Store Conversation History</Label>
                    <p className="text-sm text-muted-foreground">
                      Keep a record of past conversations.
                    </p>
                  </div>
                  <Switch
                    id="storeConversationHistory"
                    checked={settings.security.storeConversationHistory}
                    onCheckedChange={(checked) => 
                      handleToggleChange('security', 'storeConversationHistory', checked)
                    }
                  />
                </div>
                
                <Button onClick={saveSettings} disabled={isSaving}>
                  {isSaving ? 'Saving Changes...' : 'Save Changes'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="embed">
            <Card>
              <CardHeader>
                <CardTitle>Embed Chat Widget</CardTitle>
                <CardDescription>
                  Copy the code below and paste it into your website's HTML.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md bg-muted p-4 relative">
                  <pre className="text-sm overflow-x-auto p-2 font-mono">
{`<script>
  (function(w,d,s,o,f,js,fjs){
    w['ChatWidget']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
  }(window,document,'script','cw','https://example.com/widget.js'));
  cw('init', {
    title: '${settings.general.widgetTitle}',
    subtitle: '${settings.general.widgetSubtitle}',
    position: '${settings.general.widgetPosition}',
    primaryColor: '${settings.general.primaryColor}',
    welcomeMessage: '${settings.general.welcomeMessage}'
  });
</script>`}
                  </pre>
                </div>
                
                <Button 
                  onClick={copyEmbedCode}
                  className="mt-4"
                  variant="outline"
                >
                  Copy Embed Code
                </Button>
                
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Integration Instructions</h3>
                  <ol className="list-decimal ml-5 space-y-2">
                    <li>Copy the code snippet above.</li>
                    <li>Paste it just before the closing <code>&lt;/body&gt;</code> tag of your website.</li>
                    <li>The chat widget will appear on your website automatically.</li>
                    <li>You can update the widget settings from this dashboard at any time.</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}